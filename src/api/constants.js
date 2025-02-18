export const constants = {
  base: 'https://v2.api.noroff.dev',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  holidaze: {
    base: '/holidaze',
    bookings: '/bookings?_customer=true&_venue=true',
    venues: {
      rating: '/venues?_bookings=true&_customer=true&sort=rating',
      price: '/venues?_bookings=true&_customer=true&sort=price',
      new: '/venues?_bookings=true&_customer=true&sort=created',
    },
    profiles: '/profiles?_bookings=true&_venues=true',
  },
};
