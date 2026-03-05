/**
 * Calendar link generators for events.
 */

interface CalendarEventInput {
  title: string;
  description?: string;
  location?: string;
  startDate: string; // ISO string
  endDate?: string; // ISO string
}

function toGoogleCalendarDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function generateGoogleCalendarUrl(event: CalendarEventInput): string {
  const start = toGoogleCalendarDate(event.startDate);
  const end = event.endDate
    ? toGoogleCalendarDate(event.endDate)
    : toGoogleCalendarDate(
        new Date(new Date(event.startDate).getTime() + 2 * 60 * 60 * 1000).toISOString(),
      );

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    ...(event.location && { location: event.location }),
    ...(event.description && { details: event.description }),
  });

  return `https://calendar.google.com/calendar/event?${params.toString()}`;
}

export function generateICalData(event: CalendarEventInput): string {
  const start = toGoogleCalendarDate(event.startDate);
  const end = event.endDate
    ? toGoogleCalendarDate(event.endDate)
    : toGoogleCalendarDate(
        new Date(new Date(event.startDate).getTime() + 2 * 60 * 60 * 1000).toISOString(),
      );

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ISM//Events//EN",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    ...(event.location ? [`LOCATION:${event.location}`] : []),
    ...(event.description ? [`DESCRIPTION:${event.description.slice(0, 500)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

export function downloadICalFile(event: CalendarEventInput) {
  const data = generateICalData(event);
  const blob = new Blob([data], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.title.replace(/[^a-zA-Z0-9]/g, "-")}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
