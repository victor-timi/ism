# Client Feedback — Events Feature (Scope Extension)

*Received: 2026-03-01*
*Status: Approved — implemented in M2 scope*

> Events was not included in the original proposal but existed on the previous site. Client requested it as a core pillar alongside Jobs, Housing, Deals, and Community.

---

## Navigation & Copy Updates

- [x] Add "Events" to Hub dropdown in top navigation: Jobs | Housing | Events | Deals | Community
- [x] Add "Events" to footer Browse column
- [x] Update homepage hero/value prop to include Events (e.g. "Jobs. Housing. Events. Student discounts. Community support across Australia.")

## Homepage — Upcoming Events Section

- [x] Add "Upcoming Events" preview section on homepage
- [x] Show 3 event cards (next upcoming by date)
- [x] Card fields: event image, title, date/time, city/suburb, category tag, short snippet
- [x] "View all events" button linking to Events hub page
- [x] Optional "Add to calendar" on each card

## Events Hub Page (`/hub/events`)

### Filters
- [x] City (Sydney / Melbourne / Brisbane / etc.)
- [x] Category (Networking, Cultural, Career, Social, University)
- [x] Date range toggle (This week / This month / All)

### Layout
- [x] 1 featured event at top (larger card)
- [x] Grid/list of event cards below

### Event Card Fields
- [x] Title
- [x] Date + time
- [x] Location (city + venue/suburb)
- [x] Category tag
- [x] Short snippet/description
- [x] CTA button: Register / RSVP (external link)

## Event Detail Page (`/hub/events/[slug]`)

- [x] Full description
- [x] Map/location link
- [x] Host/organiser info
- [x] Registration link
- [x] Share buttons (WhatsApp, Instagram, Facebook)

## Calendar & Reminders

- [x] "Add to Google Calendar / iCal" on event cards and/or detail page
- [x] "Save event" (bookmark) for logged-in users
- [ ] ~~Optional email reminder 24h before event~~ — deferred (depends on M2 email infrastructure)

## Admin / CMS (Sanity)

Event document fields:
- [x] Title
- [x] Image
- [x] Date and time
- [x] Location (city + venue/suburb)
- [x] Category (Networking, Cultural, Career, Social, University)
- [x] Cost / Free indicator
- [x] Registration URL
- [x] Featured flag (surfaces on homepage + top of Events page)
- [x] Full description (rich text)
- [x] Host/organiser info

## UX Notes

- Events should feel like a pillar, not a hidden link
- Mobile-first: filters must be easy to use on phone, cards should be tap-friendly
- CTA styling consistent with rest of site (single primary button style)
