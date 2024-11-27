import { Order } from '../types';

export const orders: Order[] = [
  {
    id: 'A4',
    customerName: 'Ariel Hilkmat',
    customerInitials: 'AH',
    status: 'ready',
    time: '06:17 PM',
    items: [
      { name: 'Scrambled eggs with toast', quantity: 1, price: 16.99 },
      { name: 'Belgian Waffles', quantity: 2, price: 34.98 },
      { name: 'Classic Lemonade', quantity: 1, price: 12.49 }
    ],
    total: 67.34,
    additionalItems: 0
  },
  {
    id: 'B2',
    customerName: 'Denis Freeman',
    customerInitials: 'DF',
    status: 'in-progress',
    time: '06:18 PM',
    items: [
      { name: 'Classic Cheeseburger', quantity: 1, price: 10.99 },
      { name: 'Fish and Chips', quantity: 1, price: 15.99 },
      { name: 'Greek Gyro Plate', quantity: 1, price: 13.99 }
    ],
    total: 57.87,
    additionalItems: 0
  },
  {
    id: 'C2',
    customerName: 'Erwan Richard',
    customerInitials: 'ER',
    status: 'completed',
    time: '05:20 PM',
    items: [
      { name: 'Creamy Garlic Chicken', quantity: 1, price: 15.99 },
      { name: 'Greek Gyro Plate', quantity: 1, price: 13.99 },
      { name: 'Belgian Waffles', quantity: 1, price: 12.99 }
    ],
    total: 56.96,
    additionalItems: 3
  }
];