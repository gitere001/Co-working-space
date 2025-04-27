

export const currentUser = {
  id: '1',
  name: 'James',
  email: 'james@example.com'
};

export const mockBookings = [
  {
    id: '1',
    workspaceId: '1',
    workspaceName: 'Private Office',
    startDate: '2025-05-01',
    endDate: '2025-05-31',
    status: 'confirmed',
  },
  {
    id: '2',
    workspaceId: '2',
    workspaceName: 'Hot Desk',
    startDate: '2025-05-15',
    endDate: '2025-05-16',
    status: 'pending',
  }
];

export const mockWorkspaces = [
  {
    id: '1',
    name: 'Private Office',
    price: 'Kes 40000',
    description: 'Best for teams needing privacy and collaboration space.',
    features: [
      '24/7 access',
      'Private, lockable office',
      'All amenities included',
      'Unlimited meeting room access',
      'Business address & mail handling',
      'Dedicated phone line',
      'Customizable space options',
    ],
    popular: false,
    billingPeriod: 'monthly',
    imageUrl: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg'
  },
  {
    id: '2',
    name: 'Hot Desk',
    price: 'Kes 15000',
    description: 'Perfect for freelancers and remote workers.',
    features: [
      'Access during business hours',
      'First-come, first-served desk space',
      'Wi-Fi & printing',
      'Access to common areas',
      'Coffee & refreshments',
    ],
    popular: true,
    billingPeriod: 'monthly',
    imageUrl: 'https://images.pexels.com/photos/7654040/pexels-photo-7654040.jpeg'
  },
  {
    id: '3',
    name: 'Dedicated Desk',
    price: 'Kes 25000',
    description: 'Ideal for regular workers who need consistent space.',
    features: [
      '24/7 access',
      'Your own desk, always reserved',
      'Storage locker',
      'All amenities included',
      'Business address',
      '10 hours meeting room credits',
    ],
    popular: false,
    billingPeriod: 'monthly',
    imageUrl: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg'
  }
];