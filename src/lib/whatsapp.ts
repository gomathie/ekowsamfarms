import { FARM_INFO } from '../data/farmData';
import { CartItem } from '../types';

/**
 * Forms on this site have no backend — the site is static on Cloudflare Pages.
 * Instead each submission is turned into a pre-filled WhatsApp message, which
 * lands in the farm's normal inbox where they already answer customers.
 */

/** Ghana MSISDN: drop the national trunk "0" and prefix the country code. */
const WHATSAPP_NUMBER = `233${FARM_INFO.socials.whatsapp.replace(/^0+/, '')}`;

/** Plain chat link with no pre-filled message. */
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const buildWhatsAppUrl = (message: string) =>
  `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;

/**
 * Opens WhatsApp in a new tab. Must be called synchronously from a user
 * gesture (click/submit) or the browser will block it — callers should still
 * render a visible link as a fallback.
 */
export const openWhatsApp = (message: string) => {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
};

const line = (label: string, value?: string) =>
  value && value.trim() ? `${label}: ${value.trim()}\n` : '';

/** Produce request built from the basket. */
export const quoteRequestMessage = (args: {
  reference: string;
  name: string;
  phone: string;
  email: string;
  deliveryMethod: 'delivery' | 'pickup';
  address?: string;
  city?: string;
  region?: string;
  notes?: string;
  items: CartItem[];
}) => {
  const items = args.items
    .map((i) => `• ${i.quantity} × ${i.product.name} (${i.product.unit})`)
    .join('\n');

  const fulfilment =
    args.deliveryMethod === 'delivery'
      ? `Delivery to: ${[args.address, args.city, args.region].filter(Boolean).join(', ')}`
      : `Farm pickup at ${FARM_INFO.address}`;

  return (
    `*Quote Request — ${args.reference}*\n\n` +
    `*Items*\n${items}\n\n` +
    `*Contact*\n` +
    line('Name', args.name) +
    line('Phone', args.phone) +
    line('Email', args.email) +
    `\n${fulfilment}\n` +
    (args.notes?.trim() ? `\n*Notes*\n${args.notes.trim()}\n` : '') +
    `\nPlease send me your current prices for these quantities. Thank you.`
  );
};

/** General enquiry from the contact page. */
export const contactMessage = (args: {
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
}) =>
  `*Website Enquiry*\n\n` +
  line('Name', args.name) +
  line('Phone', args.phone) +
  line('Email', args.email) +
  line('Topic', args.topic) +
  `\n*Message*\n${args.message.trim()}`;

/** Workshop / masterclass registration. */
export const trainingMessage = (args: {
  workshopTitle: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  attendeeType: string;
}) =>
  `*Training Registration*\n\n` +
  `*Course*: ${args.workshopTitle}\n` +
  `*Date*: ${args.date}\n\n` +
  line('Name', args.name) +
  line('Phone', args.phone) +
  line('Email', args.email) +
  line('Attending as', args.attendeeType) +
  `\nPlease confirm my seat and let me know the course fee. Thank you.`;

/** Guided farm tour booking. */
export const farmTourMessage = (args: {
  name: string;
  phone: string;
  email: string;
  date: string;
  groupSize: string;
  groupType: string;
}) =>
  `*Farm Tour Request*\n\n` +
  line('Name', args.name) +
  line('Phone', args.phone) +
  line('Email', args.email) +
  line('Preferred date', args.date) +
  line('Group size', args.groupSize) +
  line('Group type', args.groupType) +
  `\nPlease confirm availability for a guided visit. Thank you.`;

/** Event RSVP. */
export const eventRsvpMessage = (args: {
  eventTitle: string;
  when: string;
  venue: string;
  name: string;
  phone: string;
  email: string;
  guests: string;
}) =>
  `*Event RSVP*\n\n` +
  `*Event*: ${args.eventTitle}\n` +
  `*When*: ${args.when}\n` +
  `*Where*: ${args.venue}\n\n` +
  line('Name', args.name) +
  line('Phone', args.phone) +
  line('Email', args.email) +
  line('Attendees', args.guests) +
  `\nPlease confirm my spot. Thank you.`;
