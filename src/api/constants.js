export const constants = {
  base: 'https://v2.api.noroff.dev',
  auth: {
    login: '/auth/login?_holidaze=true',
    register: '/auth/register',
  },
  holidaze: {
    base: '/holidaze',
    bookings: '/bookings?_venue=true',
    venues: {
      rating: '/venues?_bookings=true&_customer=true&sort=rating',
      price: '/venues?_bookings=true&_customer=true&sort=price',
      new: '/venues?_bookings=true&_customer=true&sort=created',
      clear: '/venues',
    },
    profiles: '/profiles/',
    profilesQuery: '?_bookings=true&_venues=true',
  },
};
