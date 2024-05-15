export const PLAN = {
  BASIC: {
    id: 1,
    type: 'BASIC',
    price: 2500,
    maxLength: 500,
  },
  PREMIUM: {
    id: 2,
    type: 'PREMIUM',
    price: 5000,
    maxLength: 1000,
  },
  EVENT: {
    id: 3,
    type: 'EVENT',
    price: 1500,
  },
} as const;
