import React, { useMemo, useState } from 'react';
import { PageId, FarmEvent, EventCategory } from '../types';
import { EVENTS, FARM_INFO } from '../data/farmData';
import { PageHeader } from '../components/PageHeader';
import { openWhatsApp, buildWhatsAppUrl, eventRsvpMessage } from '../lib/whatsapp';
import {
  CalendarDays, MapPin, Clock, Users, Ticket, ArrowRight, X, Check,
  CalendarPlus, Sparkles, CheckCircle, ExternalLink, MessageCircle
} from 'lucide-react';

interface EventsPageProps {
  setCurrentPage: (page: PageId) => void;
}

type TimeFilter = 'upcoming' | 'past' | 'all';

const CATEGORIES: (EventCategory | 'All')[] = [
  'All',
  'Open Farm Day',
  'Farmers Market',
  'Farm Tour',
  'Expo & Exhibition',
  'Community Outreach'
];

/** Parse an ISO date as local midnight so comparisons stay timezone-stable. */
const parseDate = (iso: string) => new Date(`${iso}T00:00:00`);

const startOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

/** An event stays "upcoming" through its final day. */
const isUpcoming = (evt: FarmEvent) =>
  parseDate(evt.endDate ?? evt.startDate) >= startOfToday();

const formatRange = (evt: FarmEvent) => {
  const start = parseDate(evt.startDate);
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  if (!evt.endDate) return start.toLocaleDateString('en-GB', opts);

  const end = parseDate(evt.endDate);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${start.getDate()} – ${end.toLocaleDateString('en-GB', opts)}`;
  }
  return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-GB', opts)}`;
};

const daysUntil = (iso: string) =>
  Math.round((parseDate(iso).getTime() - startOfToday().getTime()) / 86_400_000);

/** Google Calendar wants YYYYMMDD, with an exclusive end date. */
const googleCalendarUrl = (evt: FarmEvent) => {
  const stamp = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const end = parseDate(evt.endDate ?? evt.startDate);
  end.setDate(end.getDate() + 1);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${evt.title} — ${FARM_INFO.name}`,
    dates: `${stamp(parseDate(evt.startDate))}/${stamp(end)}`,
    details: `${evt.summary}\n\nTime: ${evt.time}\nEnquiries: ${FARM_INFO.phones[0]}`,
    location: `${evt.venue}, ${evt.city}, Ghana`
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const EventsPage: React.FC<EventsPageProps> = ({ setCurrentPage }) => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('upcoming');
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | 'All'>('All');
  const [selectedEvent, setSelectedEvent] = useState<FarmEvent | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '1'
  });

  const upcomingEvents = useMemo(
    () =>
      EVENTS.filter(isUpcoming).sort(
        (a, b) => parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime()
      ),
    []
  );

  const nextEvent = upcomingEvents[0];

  const visibleEvents = useMemo(() => {
    const byTime = EVENTS.filter((evt) => {
      if (timeFilter === 'upcoming') return isUpcoming(evt);
      if (timeFilter === 'past') return !isUpcoming(evt);
      return true;
    });

    const byCategory =
      categoryFilter === 'All'
        ? byTime
        : byTime.filter((evt) => evt.category === categoryFilter);

    return byCategory.sort((a, b) => {
      const diff = parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime();
      // Past events read best newest-first; upcoming ones soonest-first.
      return timeFilter === 'past' ? -diff : diff;
    });
  }, [timeFilter, categoryFilter]);

  const openEvent = (evt: FarmEvent) => {
    setSelectedEvent(evt);
    setRsvpSuccess(false);
  };

  const rsvpMessage = () =>
    selectedEvent
      ? eventRsvpMessage({
          eventTitle: selectedEvent.title,
          when: `${formatRange(selectedEvent)}, ${selectedEvent.time}`,
          venue: `${selectedEvent.venue}, ${selectedEvent.city}`,
          name: rsvpForm.name,
          phone: rsvpForm.phone,
          email: rsvpForm.email,
          guests: rsvpForm.guests
        })
      : '';

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(rsvpMessage());
    setRsvpSuccess(true);
  };

  return (
    <div className="space-y-12 pb-16 font-sans">
      <PageHeader
        eyebrow="What's Happening On The Farm"
        title="Farm Events & Open Days"
        description="Open farm days, farm-gate markets, investor tours, and community outreach across Kasoa and Greater Accra. Come see where your eggs and poultry actually come from."
        image="/images/farm-hens-feeding.webp"
      />

      {/* Next Event Spotlight */}
      {nextEvent && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-full min-h-[280px] bg-slate-100">
              <img
                src={nextEvent.image}
                alt={nextEvent.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 bg-accent-700 text-white text-[11px] font-black px-2.5 py-1 rounded shadow-xs uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Next Up
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-brand-100 text-brand-900 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider border border-brand-200">
                  {nextEvent.category}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {daysUntil(nextEvent.startDate) <= 0
                    ? 'Happening now'
                    : `In ${daysUntil(nextEvent.startDate)} day${daysUntil(nextEvent.startDate) === 1 ? '' : 's'}`}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif leading-tight">
                {nextEvent.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {nextEvent.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700">
                  <CalendarDays className="w-4 h-4 text-brand-600 shrink-0" />
                  <span className="font-semibold">{formatRange(nextEvent)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>{nextEvent.time}</span>
                </div>
                <div className="sm:col-span-2 flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                  <span className="truncate">{nextEvent.venue}, {nextEvent.city}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                {nextEvent.externalUrl ? (
                  <a
                    href={nextEvent.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>RSVP on the Official Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => openEvent(nextEvent)}
                    className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Reserve Your Spot</span>
                  </button>
                )}
                <a
                  href={googleCalendarUrl(nextEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>Add to Calendar</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters + Event Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-700 uppercase tracking-widest bg-brand-100 px-3 py-1 rounded-full border border-brand-200">
            EVENT CALENDAR
          </span>
          <h2 className="text-3xl font-black text-slate-900 font-serif">
            Browse the Full Schedule
          </h2>
        </div>

        {/* Time filter */}
        <div className="flex justify-center">
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {([
              { id: 'upcoming', label: `Upcoming (${EVENTS.filter(isUpcoming).length})` },
              { id: 'past', label: 'Past Events' },
              { id: 'all', label: 'All' }
            ] as { id: TimeFilter; label: string }[]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTimeFilter(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-bold transition-colors ${
                  timeFilter === tab.id
                    ? 'bg-brand-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-brand-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                categoryFilter === cat
                  ? 'bg-accent-700 text-white border-accent-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-accent-600 hover:text-accent-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {visibleEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
            <CalendarDays className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No events match this filter yet.</p>
            <p className="text-xs text-slate-500">
              Try another category, or{' '}
              <button
                onClick={() => setCurrentPage('contact')}
                className="text-brand-700 font-bold underline underline-offset-2 hover:text-brand-800"
              >
                get in touch
              </button>{' '}
              to be notified about the next one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleEvents.map((evt) => {
              const past = !isUpcoming(evt);
              const soldOut = !past && evt.spotsRemaining === 0;
              const start = parseDate(evt.startDate);

              return (
                <div
                  key={evt.id}
                  className={`bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group ${
                    past ? 'opacity-90' : ''
                  }`}
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                          past ? 'grayscale' : ''
                        }`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                      {/* Date block */}
                      <div className="absolute top-3 left-3 bg-white rounded-xl shadow-md overflow-hidden text-center w-14">
                        <div className="bg-brand-800 text-white text-[9px] font-black uppercase tracking-wider py-0.5">
                          {start.toLocaleDateString('en-GB', { month: 'short' })}
                        </div>
                        <div className="text-lg font-black text-slate-900 leading-tight py-0.5">
                          {start.getDate()}
                        </div>
                      </div>

                      <span className="absolute top-3 right-3 bg-brand-900/90 text-brand-100 text-[10px] font-bold px-2 py-1 rounded border border-brand-700 uppercase tracking-wider">
                        {evt.category}
                      </span>

                      {past && (
                        <span className="absolute bottom-3 left-3 bg-slate-900/85 text-slate-200 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          Past Event
                        </span>
                      )}
                      {soldOut && (
                        <span className="absolute bottom-3 left-3 bg-brand-700 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          Fully Booked
                        </span>
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-700 transition-colors font-serif leading-snug">
                        {evt.title}
                      </h3>

                      <div className="space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                          <span>{formatRange(evt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                          <span className="truncate">{evt.venue}, {evt.city}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {evt.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-3">
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-sm font-black text-brand-800">
                        {evt.externalUrl ? 'Official site' : 'RSVP to attend'}
                      </span>
                      {!past && (
                        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-brand-600" />
                          {evt.spotsRemaining > 0 ? `${evt.spotsRemaining} spots left` : 'Waitlist only'}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => openEvent(evt)}
                      className={`w-full font-bold py-2.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5 ${
                        past
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-slate-100 hover:bg-brand-600 text-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{past ? 'View Recap' : evt.externalUrl ? 'View Details' : 'View Details & RSVP'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Host / enquiry CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-950 rounded-2xl p-8 sm:p-10 text-center space-y-3 border border-brand-900">
          <h3 className="text-2xl font-black text-white font-serif">
            Want to bring a group to the farm?
          </h3>
          <p className="text-brand-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            We host school groups, church associations, cooperatives, and corporate teams on scheduled private tours outside our public calendar. Tell us your dates and group size.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-accent-700 hover:bg-accent-800 text-white font-black px-6 py-3 rounded-full text-xs transition-transform hover:scale-105 shadow-lg"
            >
              Request a Private Tour
            </button>
            <button
              onClick={() => setCurrentPage('training')}
              className="bg-brand-900 hover:bg-brand-800 text-white font-bold px-6 py-3 rounded-full text-xs transition-colors border border-brand-800"
            >
              See Training Masterclasses
            </button>
          </div>
        </div>
      </section>

      {/* Event Detail / RSVP Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative my-8">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-4 top-4 z-10 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {rsvpSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent-100 text-accent-700 mx-auto flex items-center justify-center">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-serif">One last step</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  WhatsApp should have opened with your RSVP for{' '}
                  <strong>{rsvpForm.guests}</strong> spot{rsvpForm.guests === '1' ? '' : 's'} at{' '}
                  <strong>{selectedEvent.title}</strong>. Press send there to confirm.
                </p>
                <a
                  href={buildWhatsAppUrl(rsvpMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent-700 hover:bg-accent-800 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Didn't open? Tap here</span>
                </a>
                <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-left text-xs space-y-1">
                  <p className="font-bold text-brand-900">On the day:</p>
                  <p className="text-brand-800">
                    • We'll confirm on <strong>{rsvpForm.phone}</strong> and send directions.
                  </p>
                  <p className="text-brand-800">• Arrive 15 minutes early — the gate opens at {selectedEvent.time.split(' - ')[0]}.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <a
                    href={googleCalendarUrl(selectedEvent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>Add to Calendar</span>
                  </a>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Close &amp; Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="relative h-44 bg-slate-100">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                    <span className="bg-accent-700 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {selectedEvent.category}
                    </span>
                    <h3 className="text-xl font-bold font-serif leading-tight">{selectedEvent.title}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <CalendarDays className="w-4 h-4 text-brand-600 shrink-0" />
                      <span className="font-semibold">{formatRange(selectedEvent)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-1.5 text-slate-700">
                      <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>{selectedEvent.venue}, {selectedEvent.city}</span>
                    </div>
                    {isUpcoming(selectedEvent) && (
                      <div className="sm:col-span-2 flex items-center gap-1.5 text-slate-700">
                        <Users className="w-4 h-4 text-brand-600 shrink-0" />
                        <span className="font-bold text-brand-800">
                          {selectedEvent.spotsRemaining > 0
                            ? `${selectedEvent.spotsRemaining} spots remaining`
                            : 'Fully booked — waitlist open'}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{selectedEvent.summary}</p>

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-xs uppercase text-slate-800 tracking-wider">
                      {isUpcoming(selectedEvent) ? "What's On:" : 'Event Highlights:'}
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {selectedEvent.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-accent-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {isUpcoming(selectedEvent) && selectedEvent.externalUrl ? (
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        This event has its own site with the full line-up and ticket RSVP.
                      </p>
                      <a
                        href={selectedEvent.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>RSVP at {selectedEvent.externalUrl.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={googleCalendarUrl(selectedEvent)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                      >
                        <CalendarPlus className="w-4 h-4" />
                        <span>Add to Calendar</span>
                      </a>
                    </div>
                  ) : isUpcoming(selectedEvent) ? (
                    <form onSubmit={handleRsvpSubmit} className="space-y-3 text-xs pt-2 border-t border-slate-100">
                      <h4 className="font-bold text-xs uppercase text-slate-800 tracking-wider pt-2">
                        {selectedEvent.spotsRemaining > 0 ? 'Reserve Your Spot' : 'Join the Waitlist'}
                      </h4>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Abena Serwaa"
                          value={rsvpForm.name}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="024 XXX XXXX"
                          value={rsvpForm.phone}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="abena@gmail.com"
                          value={rsvpForm.email}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Number of Attendees</label>
                        <select
                          value={rsvpForm.guests}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-xs"
                        >
                          {['1', '2', '3', '4', '5+'].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === '1' ? 'person' : 'people'}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-accent-700 hover:bg-accent-800 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>
                          {selectedEvent.spotsRemaining > 0 ? 'RSVP on WhatsApp' : 'Join Waitlist on WhatsApp'}
                        </span>
                      </button>
                      <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                        Opens WhatsApp with your details ready — just press send.
                      </p>
                    </form>
                  ) : (
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <p className="text-xs text-slate-500 italic">
                        This event has already taken place. Browse the upcoming schedule or view photos in our gallery.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedEvent(null);
                          setCurrentPage('gallery');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full bg-slate-100 hover:bg-brand-600 text-slate-800 hover:text-white font-bold py-3 rounded-xl text-xs transition-colors"
                      >
                        View Farm Gallery
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
