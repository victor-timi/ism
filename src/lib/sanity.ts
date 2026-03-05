/**
 * Re-exports Sanity utilities for use within src/.
 * The actual Sanity config lives at /sanity/ (outside src/).
 */
export { client } from "../../sanity/lib/client";
export { urlFor } from "../../sanity/lib/image";
export {
  upcomingEventsQuery,
  featuredEventQuery,
  eventBySlugQuery,
  allEventsQuery,
  homepageEventsQuery,
  relatedEventsQuery,
} from "../../sanity/lib/queries";
