export const hotels = [
  {
    id: 'saffron-boutique-hotel',

    title: 'Saffron Boutique Hotel',

    destination: 'Yogyakarta',
    area: 'Prawirotaman',
    country: 'Indonesia',

    rating: 4.3,

    description:
      'A relaxed boutique stay in one of Yogyakarta’s most walkable neighborhoods.',

    neighborhood:
      'Surrounded by independent cafés, restaurants, galleries, and small local shops around Prawirotaman.',

    nearby: [
      {
        name: 'Prawirotaman cafés',
        type: 'Food & cafés',
        distance: '2 min walk',
      },
      {
        name: 'Taman Sari',
        type: 'Culture & sights',
        distance: '10 min drive',
      },
      {
        name: 'Kraton Yogyakarta',
        type: 'Culture & sights',
        distance: '12 min drive',
      },
    ],

    pricing: {
      base: 55,
      taxes: 9,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Walkable',
      'Food & cafés',
      'Local neighborhood',
      'Quiet & relaxing',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
      {
        id: 'pool',
        label: 'Swimming pool',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'bicycle-rental',
        label: 'Bicycle rental',
      },
      {
        id: 'front-desk',
        label: '24-hour front desk',
      },
    ],

    profileFit: {
      budget: '$50–100',

      vibes: [
        'Quiet & relaxing',
        'Local & authentic',
      ],

      nearby: [
        'Food & cafés',
        'Culture & sights',
      ],

      area: [
        'Walkable',
        'Local neighborhood',
      ],
    },
  },

  {
    id: 'lotus-city-inn',

    title: 'Lotus City Inn',

    destination: 'Yogyakarta',
    area: 'Malioboro',
    country: 'Indonesia',

    rating: 3.9,

    description:
      'A simple and affordable city stay for travelers who want shopping, street food, and attractions close by.',

    neighborhood:
      'Located around the lively Malioboro district with shops, traditional markets, street food, cafés, and easy transport connections.',

    nearby: [
      {
        name: 'Malioboro Street',
        type: 'Shopping',
        distance: '3 min walk',
      },
      {
        name: 'Beringharjo Market',
        type: 'Shopping',
        distance: '7 min walk',
      },
      {
        name: 'Kraton Yogyakarta',
        type: 'Culture & sights',
        distance: '10 min drive',
      },
    ],

    pricing: {
      base: 28,
      taxes: 4,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Central location',
      'Food & cafés',
      'Shopping',
      'Close to attractions',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'front-desk',
        label: '24-hour front desk',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'airport-transfer',
        label: 'Airport transfer',
      },
      {
        id: 'laundry',
        label: 'Laundry service',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
    ],

    profileFit: {
      budget: 'Under $50',

      vibes: [
        'Lively & social',
        'Simple & practical',
      ],

      nearby: [
        'Food & cafés',
        'Shopping',
        'Culture & sights',
      ],

      area: [
        'Central location',
        'Close to attractions',
      ],
    },
  },

  {
    id: 'heritage-stay',

    title: 'Heritage Stay',

    destination: 'Yogyakarta',
    area: 'Kotagede',
    country: 'Indonesia',

    rating: 4.6,

    description:
      'A character-filled stay combining modern comfort with the historic atmosphere of old Kotagede.',

    neighborhood:
      'Set in a quieter historic neighborhood known for traditional Javanese houses, silver workshops, narrow lanes, and local eateries.',

    nearby: [
      {
        name: 'Kotagede Heritage Area',
        type: 'Culture & sights',
        distance: '4 min walk',
      },
      {
        name: 'Kotagede Silver Workshops',
        type: 'Arts & crafts',
        distance: '6 min walk',
      },
      {
        name: 'Pasar Kotagede',
        type: 'Shopping',
        distance: '8 min walk',
      },
    ],

    pricing: {
      base: 50,
      taxes: 7,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Quiet & relaxing',
      'Local neighborhood',
      'Culture & sights',
      'Heritage',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'pool',
        label: 'Swimming pool',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'bicycle-rental',
        label: 'Bicycle rental',
      },
      {
        id: 'front-desk',
        label: '24-hour front desk',
      },
    ],

    profileFit: {
      budget: '$50–100',

      vibes: [
        'Quiet & relaxing',
        'Local & authentic',
      ],

      nearby: [
        'Culture & sights',
        'Arts & crafts',
      ],

      area: [
        'Local neighborhood',
        'Quiet area',
      ],
    },
  },

  {
    id: 'merapi-garden-hotel',

    title: 'Merapi Garden Hotel',

    destination: 'Yogyakarta',
    area: 'Kaliurang',
    country: 'Indonesia',

    rating: 4.5,

    description:
      'A peaceful garden retreat offering cooler mountain air, greenery, and a slower pace away from central Yogyakarta.',

    neighborhood:
      'Located in the scenic Kaliurang area near the slopes of Mount Merapi, surrounded by gardens, forested hills, and nature attractions.',

    nearby: [
      {
        name: 'Kaliurang Nature Park',
        type: 'Nature',
        distance: '6 min drive',
      },
      {
        name: 'Ullen Sentalu Museum',
        type: 'Culture & sights',
        distance: '10 min drive',
      },
      {
        name: 'Merapi Lava Tour',
        type: 'Nature',
        distance: '15 min drive',
      },
    ],

    pricing: {
      base: 65,
      taxes: 10,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Mountain escape',
      'Quiet & relaxing',
      'Nature',
      'Family friendly',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'pool',
        label: 'Swimming pool',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
      {
        id: 'front-desk',
        label: '24-hour front desk',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
    ],

    profileFit: {
      budget: '$50–100',

      vibes: [
        'Quiet & relaxing',
        'Nature & outdoors',
      ],

      nearby: [
        'Nature',
        'Culture & sights',
      ],

      area: [
        'Quiet area',
        'Scenic location',
      ],
    },
  },

  {
    id: 'prambanan-view-resort',

    title: 'Prambanan View Resort',

    destination: 'Yogyakarta',
    area: 'Prambanan',
    country: 'Indonesia',

    rating: 4.4,

    description:
      'A relaxed resort stay surrounded by open landscapes with convenient access to the ancient temples of Prambanan.',

    neighborhood:
      'A quieter area east of Yogyakarta, ideal for travelers looking for cultural attractions, countryside scenery, and peaceful evenings.',

    nearby: [
      {
        name: 'Prambanan Temple',
        type: 'Culture & sights',
        distance: '8 min drive',
      },
      {
        name: 'Ratu Boko',
        type: 'Culture & sights',
        distance: '15 min drive',
      },
      {
        name: 'Plaosan Temple',
        type: 'Culture & sights',
        distance: '12 min drive',
      },
    ],

    pricing: {
      base: 95,
      taxes: 15,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Culture & sights',
      'Scenic views',
      'Quiet & relaxing',
      'Romantic',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'pool',
        label: 'Swimming pool',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
      {
        id: 'airport-transfer',
        label: 'Airport transfer',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
    ],

    profileFit: {
      budget: '$50–100',

      vibes: [
        'Quiet & relaxing',
        'Romantic',
      ],

      nearby: [
        'Culture & sights',
        'Nature',
      ],

      area: [
        'Scenic location',
        'Quiet area',
      ],
    },
  },

  {
    id: 'batik-house-yogyakarta',

    title: 'Batik House Yogyakarta',

    destination: 'Yogyakarta',
    area: 'Mantrijeron',
    country: 'Indonesia',

    rating: 4.7,

    description:
      'A charming boutique stay inspired by traditional Javanese design, batik culture, and the relaxed character of southern Yogyakarta.',

    neighborhood:
      'A residential yet lively neighborhood with local warungs, cafés, art spaces, traditional houses, and easy access to cultural landmarks.',

    nearby: [
      {
        name: 'Prawirotaman',
        type: 'Food & cafés',
        distance: '7 min drive',
      },
      {
        name: 'Taman Sari',
        type: 'Culture & sights',
        distance: '8 min drive',
      },
      {
        name: 'Alun-Alun Kidul',
        type: 'Culture & sights',
        distance: '9 min drive',
      },
    ],

    pricing: {
      base: 58,
      taxes: 9,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Local & authentic',
      'Heritage',
      'Food & cafés',
      'Boutique',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'bicycle-rental',
        label: 'Bicycle rental',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
      {
        id: 'front-desk',
        label: '24-hour front desk',
      },
    ],

    profileFit: {
      budget: '$50–100',

      vibes: [
        'Local & authentic',
        'Quiet & relaxing',
      ],

      nearby: [
        'Food & cafés',
        'Culture & sights',
      ],

      area: [
        'Local neighborhood',
        'Walkable',
      ],
    },
  },

  {
    id: 'urban-nest-jogja',

    title: 'Urban Nest Jogja',

    destination: 'Yogyakarta',
    area: 'Sleman',
    country: 'Indonesia',

    rating: 4.1,

    description:
      'A modern and comfortable city stay designed for travelers who value convenience, reliable amenities, and easy access around northern Yogyakarta.',

    neighborhood:
      'Located in the lively Sleman area with cafés, restaurants, universities, shopping spots, and convenient road access around the city.',

    nearby: [
      {
        name: 'Jogja City Mall',
        type: 'Shopping',
        distance: '8 min drive',
      },
      {
        name: 'UGM area',
        type: 'Local neighborhood',
        distance: '10 min drive',
      },
      {
        name: 'Hartono Mall',
        type: 'Shopping',
        distance: '12 min drive',
      },
    ],

    pricing: {
      base: 42,
      taxes: 7,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Modern',
      'Comfortable',
      'Food & cafés',
      'Business friendly',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'gym',
        label: 'Gym',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
      {
        id: 'front-desk',
        label: '24-hour front desk',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'laundry',
        label: 'Laundry service',
      },
    ],

    profileFit: {
      budget: 'Under $50',

      vibes: [
        'Modern & comfortable',
      ],

      nearby: [
        'Food & cafés',
        'Shopping',
      ],

      area: [
        'Convenient location',
      ],
    },
  },

  {
    id: 'royal-kraton-hotel',

    title: 'Royal Kraton Hotel',

    destination: 'Yogyakarta',
    area: 'Kraton',
    country: 'Indonesia',

    rating: 4.8,

    description:
      'An elegant stay close to Yogyakarta’s royal heritage, combining refined comfort with easy access to historic landmarks.',

    neighborhood:
      'Set around the historic Kraton district, surrounded by traditional architecture, museums, cultural landmarks, and local food streets.',

    nearby: [
      {
        name: 'Kraton Yogyakarta',
        type: 'Culture & sights',
        distance: '5 min walk',
      },
      {
        name: 'Taman Sari',
        type: 'Culture & sights',
        distance: '8 min drive',
      },
      {
        name: 'Malioboro Street',
        type: 'Shopping',
        distance: '12 min drive',
      },
    ],

    pricing: {
      base: 125,
      taxes: 20,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Luxury',
      'Culture & sights',
      'Heritage',
      'Romantic',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'pool',
        label: 'Swimming pool',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'spa',
        label: 'Spa',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'gym',
        label: 'Gym',
      },
      {
        id: 'airport-transfer',
        label: 'Airport transfer',
      },
      {
        id: 'front-desk',
        label: '24-hour front desk',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
    ],

    profileFit: {
      budget: '$100–150',

      vibes: [
        'Luxury',
        'Romantic',
      ],

      nearby: [
        'Culture & sights',
        'Food & cafés',
      ],

      area: [
        'Central location',
        'Walkable',
      ],
    },
  },

  {
    id: 'royal-borobudur-lodge',

    title: 'Royal Borobudur Lodge',

    destination: 'Yogyakarta',
    area: 'Borobudur',
    country: 'Indonesia',

    rating: 4.9,

    description:
      'A premium countryside retreat offering an upscale experience near Borobudur and the cultural landscapes of Central Java.',

    neighborhood:
      'Surrounded by rural villages, tropical greenery, rice fields, and historic attractions, making it ideal for a peaceful cultural escape.',

    nearby: [
      {
        name: 'Borobudur Temple',
        type: 'Culture & sights',
        distance: '10 min drive',
      },
      {
        name: 'Punthuk Setumbu',
        type: 'Scenic views',
        distance: '15 min drive',
      },
      {
        name: 'Mendut Temple',
        type: 'Culture & sights',
        distance: '12 min drive',
      },
    ],

    pricing: {
      base: 150,
      taxes: 27,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Luxury',
      'Culture & sights',
      'Scenic views',
      'Romantic',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'pool',
        label: 'Swimming pool',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'spa',
        label: 'Spa',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'gym',
        label: 'Gym',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'airport-transfer',
        label: 'Airport transfer',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
    ],

    profileFit: {
      budget: '$100–150',

      vibes: [
        'Luxury',
        'Romantic',
      ],

      nearby: [
        'Culture & sights',
        'Nature',
      ],

      area: [
        'Scenic location',
        'Quiet area',
      ],
    },
  },

  {
    id: 'prawirotaman-garden-stay',

    title: 'Prawirotaman Garden Stay',

    destination: 'Yogyakarta',
    area: 'Prawirotaman',
    country: 'Indonesia',

    rating: 4.4,

    description:
      'A cozy garden stay in the heart of Prawirotaman, surrounded by cafés, restaurants, and local art spaces.',

    neighborhood:
      'A relaxed and walkable neighborhood filled with independent cafés, restaurants, galleries, and small local businesses.',

    nearby: [
      {
        name: 'Prawirotaman cafés',
        type: 'Food & cafés',
        distance: '3 min walk',
      },
      {
        name: 'Taman Sari',
        type: 'Culture & sights',
        distance: '10 min drive',
      },
      {
        name: 'Alun-Alun Kidul',
        type: 'Culture & sights',
        distance: '8 min drive',
      },
    ],

    pricing: {
      base: 48,
      taxes: 8,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Walkable',
      'Food & cafés',
      'Local neighborhood',
      'Garden',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
      {
        id: 'bicycle-rental',
        label: 'Bicycle rental',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
    ],

    profileFit: {
      budget: 'Under $50',

      vibes: [
        'Quiet & relaxing',
        'Local & authentic',
      ],

      nearby: [
        'Food & cafés',
        'Culture & sights',
      ],

      area: [
        'Walkable',
        'Local neighborhood',
      ],
    },
  },

  {
    id: 'merapi-hills-retreat',

    title: 'Merapi Hills Retreat',

    destination: 'Yogyakarta',
    area: 'Kaliurang',
    country: 'Indonesia',

    rating: 4.6,

    description:
      'A peaceful mountain retreat surrounded by pine trees, fresh air, and views toward Mount Merapi.',

    neighborhood:
      'Located in the cooler highlands of Kaliurang, close to nature attractions, museums, hiking routes, and Merapi experiences.',

    nearby: [
      {
        name: 'Kaliurang Nature Park',
        type: 'Nature',
        distance: '5 min drive',
      },
      {
        name: 'Ullen Sentalu Museum',
        type: 'Culture & sights',
        distance: '9 min drive',
      },
      {
        name: 'Merapi Lava Tour',
        type: 'Nature',
        distance: '15 min drive',
      },
    ],

    pricing: {
      base: 72,
      taxes: 11,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Mountain escape',
      'Nature',
      'Quiet & relaxing',
      'Scenic views',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'pool',
        label: 'Swimming pool',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
    ],

    profileFit: {
      budget: '$50–100',

      vibes: [
        'Quiet & relaxing',
        'Nature & outdoors',
      ],

      nearby: [
        'Nature',
        'Culture & sights',
      ],

      area: [
        'Quiet area',
        'Scenic location',
      ],
    },
  },

  {
    id: 'kaliurang-forest-lodge',

    title: 'Kaliurang Forest Lodge',

    destination: 'Yogyakarta',
    area: 'Kaliurang',
    country: 'Indonesia',

    rating: 4.2,

    description:
      'A laid-back forest lodge for travelers looking to slow down and enjoy the cooler side of Yogyakarta.',

    neighborhood:
      'Surrounded by greenery and forested hills in Kaliurang, with easy access to outdoor attractions and mountain activities.',

    nearby: [
      {
        name: 'Kaliurang Nature Park',
        type: 'Nature',
        distance: '7 min drive',
      },
      {
        name: 'Merapi Lava Tour',
        type: 'Nature',
        distance: '14 min drive',
      },
      {
        name: 'Ullen Sentalu Museum',
        type: 'Culture & sights',
        distance: '11 min drive',
      },
    ],

    pricing: {
      base: 45,
      taxes: 7,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Nature',
      'Mountain escape',
      'Budget friendly',
      'Quiet & relaxing',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
    ],

    profileFit: {
      budget: 'Under $50',

      vibes: [
        'Quiet & relaxing',
        'Nature & outdoors',
      ],

      nearby: [
        'Nature',
        'Culture & sights',
      ],

      area: [
        'Quiet area',
        'Scenic location',
      ],
    },
  },

  {
    id: 'gunung-kidul-beach-retreat',

    title: 'Gunung Kidul Beach Retreat',

    destination: 'Yogyakarta',
    area: 'Gunung Kidul',
    country: 'Indonesia',

    rating: 4.5,

    description:
      'A relaxed coastal escape for travelers who want easy access to the beaches and dramatic landscapes of Gunung Kidul.',

    neighborhood:
      'Surrounded by tropical hills, beaches, cliffs, and small coastal villages along the southern coast of Yogyakarta.',

    nearby: [
      {
        name: 'Indrayanti Beach',
        type: 'Beach',
        distance: '8 min drive',
      },
      {
        name: 'Drini Beach',
        type: 'Beach',
        distance: '12 min drive',
      },
      {
        name: 'Nglambor Beach',
        type: 'Beach',
        distance: '20 min drive',
      },
    ],

    pricing: {
      base: 62,
      taxes: 10,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Beach',
      'Nature',
      'Adventure',
      'Scenic views',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
    ],

    profileFit: {
      budget: '$50–100',

      vibes: [
        'Nature & outdoors',
        'Adventure',
      ],

      nearby: [
        'Nature',
        'Beach',
      ],

      area: [
        'Scenic location',
        'Quiet area',
      ],
    },
  },

  {
    id: 'south-coast-eco-lodge',

    title: 'South Coast Eco Lodge',

    destination: 'Yogyakarta',
    area: 'Gunung Kidul',
    country: 'Indonesia',

    rating: 4.3,

    description:
      'A simple eco-friendly stay surrounded by coastal nature, perfect for beach hopping and outdoor adventures.',

    neighborhood:
      'Set in a quieter coastal area with access to beaches, caves, cliffs, and scenic viewpoints across Gunung Kidul.',

    nearby: [
      {
        name: 'Ngobaran Beach',
        type: 'Beach',
        distance: '10 min drive',
      },
      {
        name: 'Ngrenehan Beach',
        type: 'Beach',
        distance: '12 min drive',
      },
      {
        name: 'Timang Beach',
        type: 'Adventure',
        distance: '25 min drive',
      },
    ],

    pricing: {
      base: 44,
      taxes: 7,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Beach',
      'Eco-friendly',
      'Adventure',
      'Budget friendly',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
    ],

    profileFit: {
      budget: 'Under $50',

      vibes: [
        'Nature & outdoors',
        'Adventure',
      ],

      nearby: [
        'Beach',
        'Nature',
      ],

      area: [
        'Quiet area',
        'Scenic location',
      ],
    },
  },

  {
    id: 'gunung-kidul-cliff-villa',

    title: 'Gunung Kidul Cliff Villa',

    destination: 'Yogyakarta',
    area: 'Gunung Kidul',
    country: 'Indonesia',

    rating: 4.7,

    description:
      'A scenic coastal villa offering a more private stay with dramatic ocean views and easy access to southern beaches.',

    neighborhood:
      'Located near the cliffs and beaches of southern Gunung Kidul, ideal for couples, photographers, and adventure seekers.',

    nearby: [
      {
        name: 'Timang Beach',
        type: 'Adventure',
        distance: '10 min drive',
      },
      {
        name: 'Jogan Beach',
        type: 'Beach',
        distance: '15 min drive',
      },
      {
        name: 'Siung Beach',
        type: 'Beach',
        distance: '18 min drive',
      },
    ],

    pricing: {
      base: 88,
      taxes: 14,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Beach',
      'Scenic views',
      'Romantic',
      'Adventure',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'pool',
        label: 'Swimming pool',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
    ],

    profileFit: {
      budget: '$50–100',

      vibes: [
        'Romantic',
        'Nature & outdoors',
      ],

      nearby: [
        'Beach',
        'Nature',
      ],

      area: [
        'Scenic location',
        'Quiet area',
      ],
    },
  },

  {
    id: 'kotagede-javanese-house',

    title: 'Kotagede Javanese House',

    destination: 'Yogyakarta',
    area: 'Kotagede',
    country: 'Indonesia',

    rating: 4.5,

    description:
      'A traditional-style guesthouse offering an intimate stay surrounded by the historic character of Kotagede.',

    neighborhood:
      'Located among traditional Javanese houses, silver workshops, markets, and quiet heritage lanes.',

    nearby: [
      {
        name: 'Kotagede Heritage Area',
        type: 'Culture & sights',
        distance: '3 min walk',
      },
      {
        name: 'Kotagede Silver Workshops',
        type: 'Arts & crafts',
        distance: '5 min walk',
      },
      {
        name: 'Pasar Kotagede',
        type: 'Shopping',
        distance: '7 min walk',
      },
    ],

    pricing: {
      base: 46,
      taxes: 7,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Heritage',
      'Local & authentic',
      'Quiet & relaxing',
      'Arts & crafts',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'bicycle-rental',
        label: 'Bicycle rental',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
    ],

    profileFit: {
      budget: 'Under $50',

      vibes: [
        'Local & authentic',
        'Quiet & relaxing',
      ],

      nearby: [
        'Culture & sights',
        'Arts & crafts',
      ],

      area: [
        'Local neighborhood',
        'Quiet area',
      ],
    },
  },

  {
    id: 'kotagede-heritage-villa',

    title: 'Kotagede Heritage Villa',

    destination: 'Yogyakarta',
    area: 'Kotagede',
    country: 'Indonesia',

    rating: 4.8,

    description:
      'A stylish heritage villa blending traditional Javanese character with modern comfort.',

    neighborhood:
      'A peaceful historic neighborhood close to silver workshops, traditional markets, heritage buildings, and local food spots.',

    nearby: [
      {
        name: 'Kotagede Heritage Area',
        type: 'Culture & sights',
        distance: '5 min walk',
      },
      {
        name: 'Kotagede Silver Workshops',
        type: 'Arts & crafts',
        distance: '7 min walk',
      },
      {
        name: 'Pasar Kotagede',
        type: 'Shopping',
        distance: '9 min walk',
      },
    ],

    pricing: {
      base: 78,
      taxes: 12,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Heritage',
      'Boutique',
      'Romantic',
      'Local & authentic',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'pool',
        label: 'Swimming pool',
      },
      {
        id: 'garden',
        label: 'Garden',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
      {
        id: 'bicycle-rental',
        label: 'Bicycle rental',
      },
    ],

    profileFit: {
      budget: '$50–100',

      vibes: [
        'Romantic',
        'Local & authentic',
      ],

      nearby: [
        'Culture & sights',
        'Arts & crafts',
      ],

      area: [
        'Local neighborhood',
        'Quiet area',
      ],
    },
  },

  {
    id: 'malioboro-heritage-inn',

    title: 'Malioboro Heritage Inn',

    destination: 'Yogyakarta',
    area: 'Malioboro',
    country: 'Indonesia',

    rating: 4.2,

    description:
      'A comfortable city hotel for travelers who want to explore Malioboro, traditional markets, and Yogyakarta’s cultural center.',

    neighborhood:
      'Located within easy reach of Malioboro Street, Beringharjo Market, local food stalls, and major cultural attractions.',

    nearby: [
      {
        name: 'Malioboro Street',
        type: 'Shopping',
        distance: '4 min walk',
      },
      {
        name: 'Beringharjo Market',
        type: 'Shopping',
        distance: '6 min walk',
      },
      {
        name: 'Kraton Yogyakarta',
        type: 'Culture & sights',
        distance: '10 min drive',
      },
    ],

    pricing: {
      base: 52,
      taxes: 8,
      currency: 'USD',
    },

    image:
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=900&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
    ],

    tags: [
      'Central location',
      'Shopping',
      'Food & cafés',
      'Culture & sights',
    ],

    amenities: [
      {
        id: 'wifi',
        label: 'Free Wi-Fi',
      },
      {
        id: 'breakfast',
        label: 'Breakfast',
      },
      {
        id: 'restaurant',
        label: 'Restaurant',
      },
      {
        id: 'air-conditioning',
        label: 'Air conditioning',
      },
      {
        id: 'front-desk',
        label: '24-hour front desk',
      },
      {
        id: 'parking',
        label: 'Free parking',
      },
    ],

    profileFit: {
      budget: '$50–100',

      vibes: [
        'Lively & social',
        'Simple & practical',
      ],

      nearby: [
        'Food & cafés',
        'Shopping',
        'Culture & sights',
      ],

      area: [
        'Central location',
        'Walkable',
      ],
    },
  },


];
