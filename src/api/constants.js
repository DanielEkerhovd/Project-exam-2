export const constants = {
  base: "https://v2.api.noroff.dev",
  holidaze: {
    base: "/holidaze",
    bookings: "/bookings?_customer=true&_venue=true",
    venues: "/venues?_bookings=true&_customer=true&sort=rating",
    profiles: "/profiles?_bookings=true&_venues=true",
  },
};
