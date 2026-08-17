import React, { useEffect, useState, useMemo } from 'react';
import { PageId, FarmEvent } from '../types';
import { EVENTS } from '../data/farmData';
import { X, CalendarDays, MapPin, Clock, Ticket, ArrowRight, ExternalLink } from 'lucide-react';

interface EventAnnouncementModalProps {
  setCurrentPage: (page: PageId) => void;
}

/** Bump this when a new campaign should re-prompt visitors who dismissed the last one. */
const DISMISS_KEY = 'esf:event-announcement:v1';
const SHOW_DELAY_MS = 1500;

const parseDate = (iso: string) => new Date(`${iso}T00:00:00`);

const startOfToday = () => {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
};

const formatRange = (evt: FarmEvent) => {
  const start = parseDate(evt.startDate);
  const opts: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
  if (!evt.endDate) return start.toLocaleDateString('en-GB', opts);
  const end = parseDate(evt.endDate);
  return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-GB', opts)}`;
};

/**
 * One-time announcement for the soonest upcoming event. Dismissal is remembered
 * in localStorage so returning visitors are not nagged.
 */
export const EventAnnouncementModal: React.FC<EventAnnouncementModalProps> = ({ setCurrentPage }) => {
  const [visible, setVisible] = useState(false);

  const nextEvent = useMemo(() => {
    const today = startOfToday();
    return EVENTS
      .filter((e) => parseDate(e.endDate ?? e.startDate) >= today)
      .sort((a, b) => a.startDate.localeCompare(b.startDate))[0];
  }, []);

  useEffect(() => {
    if (!nextEvent) return;

    // Private-mode browsers can throw on storage access; a failure here should
    // never stop the page rendering, so fall through to showing the modal.
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === nextEvent.id;
    } catch {
      dismissed = false;
    }
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [nextEvent]);

  const dismiss = () => {
    setVisible(false);
    try {
      if (nextEvent) window.localStorage.setItem(DISMISS_KEY, nextEvent.id);
    } catch {
      /* Storage unavailable — the modal simply reappears next visit. */
    }
  };

  // Close on Escape, and lock background scroll while open.
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!visible || !nextEvent) return null;

  const daysAway = Math.round(
    (parseDate(nextEvent.startDate).getTime() - startOfToday().getTime()) / 86_400_000
  );

  const goToEvents = () => {
    dismiss();
    setCurrentPage('events');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 font-sans"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-announcement-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          aria-label="Close announcement"
          className="absolute right-3 top-3 z-10 p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900/80 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Poster image */}
        <div className="relative h-44 bg-slate-100">
          <img
            src={nextEvent.image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-3 left-5 right-5">
            <span className="inline-block bg-accent-700 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-1.5">
              {daysAway <= 0 ? 'Happening now' : daysAway === 1 ? 'Tomorrow' : `In ${daysAway} days`}
            </span>
            <h2 id="event-announcement-title" className="text-white text-xl font-black font-serif leading-tight">
              {nextEvent.title}
            </h2>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            {nextEvent.summary}
          </p>

          <div className="grid grid-cols-1 gap-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 text-slate-700">
              <CalendarDays className="w-4 h-4 text-brand-600 shrink-0" />
              <span className="font-semibold">{formatRange(nextEvent)}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-brand-600 shrink-0" />
              <span>{nextEvent.time}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
              <span>{nextEvent.venue}, {nextEvent.city}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Ticket className="w-4 h-4 text-brand-600 shrink-0" />
              <span className="font-bold text-accent-800">
                {nextEvent.spotsRemaining > 0
                  ? `${nextEvent.spotsRemaining} spots remaining`
                  : 'Waitlist open'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {nextEvent.externalUrl ? (
              <a
                href={nextEvent.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismiss}
                className="w-full bg-accent-700 hover:bg-accent-800 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>RSVP Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                onClick={goToEvents}
                className="w-full bg-accent-700 hover:bg-accent-800 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>Reserve Your Spot</span>
              </button>
            )}

            <button
              onClick={goToEvents}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>See All Farm Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={dismiss}
              className="w-full text-slate-500 hover:text-slate-700 font-semibold py-1 text-[11px] transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
