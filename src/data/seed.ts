import type { Product, Review, Coupon } from '@/types';

export const categories: { name: string; icon: string; image: string }[] = [
  { name: 'Indoor', icon: '🏠', image: 'indoor plant living room' },
  { name: 'Air Purifying', icon: '💨', image: 'air purifying plant' },
  { name: 'Succulents', icon: '🌵', image: 'succulent plant' },
  { name: 'Herbs', icon: '🌿', image: 'herb plant basil' },
  { name: 'Flowering', icon: '🌸', image: 'flowering plant' },
  { name: 'Pots & Planters', icon: '🪴', image: 'plant pot ceramic' },
];

export const products: Product[] = [
  // ==========================================
  // INDOOR PLANTS
  // ==========================================
  {
    id: 'p1',
    name: 'Monstera Deliciosa — Swiss Cheese Plant',
    description: 'The king of indoor statement plants. Famous for iconic perforated leaves, lush tropical foliage, and remarkable resilience.',
    category: 'Indoor',
    price: 499,
    mrp: 799,
    images: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Medium',
    petSafe: false,
    beginner: true,
    size: 'Large',
    stock: 45,
    rating: 4.8,
    reviewCount: 320,
    careGuide: {
    water: "Every 1–2 weeks",
    waterQuantity: "250–350 ml (approx. 1.5 cups)",
    waterSchedule: "Wait until top 2 inches of soil feel dry to the touch. Water thoroughly until it drains out.",
    light: "Medium to bright indirect",
    lightDetail: "Flourishes in bright filtered sunlight 4–6 feet from an East or North window. Avoid direct scorching sun.",
    humidity: "Average to high (50–70%)",
    temperature: "18°C – 32°C (AC friendly, avoid direct cold air drafts)",
    idealEnvironment: "Spacious living room, bedroom corner, or well-lit modern office",
    idealPlacement: [
        "Living Room",
        "Bedroom",
        "Office Lounge"
    ],
    difficulty: "Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Homeowners wanting a lush tropical statement",
            "Beginner to intermediate plant parents",
            "Filtered light living rooms"
        ],
        notGoodFor: [
            "Extremely compact spaces with no floor room",
            "Full scorching afternoon balcony sun",
            "Homes with pets that chew on leaves"
        ]
    }
},
    sellerId: 's1',
    tags: ['indoor', 'statement-plant', 'popular', 'beginner'],
  },
  {
    id: 'p2',
    name: 'Snake Plant — Sansevieria Laurentii',
    description: 'One of the toughest houseplants on earth. Tolerates low light, drought, and releases purified oxygen day and night.',
    category: 'Indoor',
    price: 299,
    mrp: 499,
    images: [
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Low',
    petSafe: false,
    beginner: true,
    size: 'Medium',
    stock: 65,
    rating: 4.7,
    reviewCount: 412,
    careGuide: {
    water: "Every 2–3 weeks",
    waterQuantity: "100–150 ml (approx. 1/2 cup)",
    waterSchedule: "Indestructible drought survivor. Let the soil completely dry out between waterings. When in doubt, do not water.",
    light: "Low to bright indirect",
    lightDetail: "Survives in dim fluorescent-lit offices as well as sunny balconies. Highly versatile.",
    humidity: "Low to average (30–50%)",
    temperature: "15°C – 35°C (Extremely tolerant of Indian summers & AC rooms)",
    idealEnvironment: "Bedroom nightstand, bathroom vanity, hallway, or corporate office desk",
    idealPlacement: [
        "Bedroom",
        "Office Desk",
        "Hallway",
        "Living Room"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Frequent travelers & forgetful waterers",
            "Dark rooms & apartments with minimal natural light",
            "Night-time oxygen seekers"
        ],
        notGoodFor: [
            "Gardeners who love watering daily (causes root rot)",
            "Wet or waterlogged soils"
        ]
    }
},
    sellerId: 's1',
    tags: ['indoor', 'air-purifying', 'low-light', 'beginner'],
  },
  {
    id: 'p3',
    name: 'Money Plant — Golden Pothos',
    description: 'Vibrant cascading vine with variegated heart-shaped leaves. Grows happily in soil or water vases and symbolizes prosperity.',
    category: 'Indoor',
    price: 199,
    mrp: 349,
    images: [
      'https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Low',
    petSafe: false,
    beginner: true,
    size: 'Small',
    stock: 85,
    rating: 4.9,
    reviewCount: 520,
    careGuide: {
    water: "Once a week",
    waterQuantity: "150–200 ml (approx. 1 cup)",
    waterSchedule: "Water when top 1 inch of soil feels dry. Drooping vines will signal thirst and revive within hours.",
    light: "Low to medium indirect",
    lightDetail: "Prefers gentle morning light or dappled shade. Grows in soil or hydroponically in glass water bottles.",
    humidity: "Average (40–60%)",
    temperature: "16°C – 32°C (Thrives in typical Indian room climate)",
    idealEnvironment: "Bookshelves, wall hanging hooks, study tables, or kitchen window sills",
    idealPlacement: [
        "Bookshelf",
        "Study Table",
        "Balcony Railing",
        "Living Room"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Absolute beginners & kids",
            "Trailing shelf aesthetics & vertical vines",
            "Vastu & positive energy believers"
        ],
        notGoodFor: [
            "Intense blazing noon sun (leaves scorch yellow)",
            "Chewing pets (mildly toxic if eaten)"
        ]
    }
},
    sellerId: 's1',
    tags: ['indoor', 'trailing', 'beginner', 'good-luck'],
  },
  {
    id: 'p4',
    name: 'ZZ Plant — Zamioculcas Zamiifolia',
    description: 'High-gloss deep green feather fronds that survive on minimal water and low light. Perfect for modern offices and bedrooms.',
    category: 'Indoor',
    price: 449,
    mrp: 699,
    images: [
      'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Low',
    petSafe: false,
    beginner: true,
    size: 'Medium',
    stock: 40,
    rating: 4.8,
    reviewCount: 230,
    careGuide: {
    water: "Every 2–3 weeks",
    waterQuantity: "100–150 ml (approx. 1/2 cup)",
    waterSchedule: "Stores water in potato-like underground rhizomes. Water sparingly; leaves stay glossy even if forgotten for a month.",
    light: "Low to medium indirect",
    lightDetail: "Tolerates low light, fluorescent office lighting, and windowless corners with ease.",
    humidity: "Low to average (30–50%)",
    temperature: "16°C – 34°C (Handles AC rooms seamlessly)",
    idealEnvironment: "Executive office desks, windowless conference rooms, bedroom dresser",
    idealPlacement: [
        "Office Desk",
        "Bedroom",
        "Dark Corner",
        "Living Room"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Busy executives & frequent flyers",
            "Low-light urban apartments",
            "Minimalist modern decor"
        ],
        notGoodFor: [
            "Over-watering enthusiasts",
            "Wet soggy pots without drainage"
        ]
    }
},
    sellerId: 's2',
    tags: ['indoor', 'low-light', 'drought-tolerant', 'indestructible'],
  },
  {
    id: 'p5',
    name: 'Fiddle Leaf Fig — Ficus Lyrata',
    description: 'Stunning architectural indoor tree featuring broad violin-shaped leaves. An interior designer favorite that elevates any corner.',
    category: 'Indoor',
    price: 699,
    mrp: 1199,
    images: [
      'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: false,
    beginner: false,
    size: 'Large',
    stock: 25,
    rating: 4.6,
    reviewCount: 180,
    careGuide: {
    water: "Every 7–10 days",
    waterQuantity: "300–400 ml (approx. 1.5–2 cups)",
    waterSchedule: "Check top 2 inches with your finger; water thoroughly only when dry, and let excess drain away.",
    light: "Bright indirect sunlight",
    lightDetail: "Demands 5–6 hours of consistent bright filtered sun near an East or South-facing window.",
    humidity: "High (50–65%)",
    temperature: "18°C – 30°C (Sensitive to sudden cold drafts or direct AC blast)",
    idealEnvironment: "Sunny architectural living room corner, foyer with high ceilings, well-lit balcony nook",
    idealPlacement: [
        "Living Room Window",
        "Sunny Foyer",
        "Covered Balcony"
    ],
    difficulty: "Moderate",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Interior design enthusiasts wanting a showpiece tree",
            "Homes with generous natural window light"
        ],
        notGoodFor: [
            "Dark, windowless apartments",
            "Moving frequently from spot to spot (drops leaves when moved)"
        ]
    }
},
    sellerId: 's2',
    tags: ['indoor', 'statement-plant', 'tree', 'architectural'],
  },
  {
    id: 'p6',
    name: 'Rubber Plant — Ficus Elastica Burgundy',
    description: 'Dramatic thick leather-textured leaves with burgundy-black sheen. Known for removing formaldehyde and adding sleek bold style.',
    category: 'Indoor',
    price: 499,
    mrp: 799,
    images: [
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Medium',
    petSafe: false,
    beginner: true,
    size: 'Large',
    stock: 35,
    rating: 4.7,
    reviewCount: 215,
    careGuide: {
    water: "Every 1–2 weeks",
    waterQuantity: "200–300 ml (approx. 1 cup)",
    waterSchedule: "Allow top half of the soil to dry out between waterings. Wipe leaves with damp cloth monthly for dust removal.",
    light: "Medium to bright indirect",
    lightDetail: "Loves bright diffused sunlight. Can take gentle morning sun which deepens its burgundy luster.",
    humidity: "Average (40–60%)",
    temperature: "18°C – 32°C (AC friendly when kept away from direct vents)",
    idealEnvironment: "Living room next to a window, home office study, stylish hallway",
    idealPlacement: [
        "Living Room",
        "Home Office",
        "Hallway"
    ],
    difficulty: "Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Designers wanting bold dark foliage accents",
            "Beginner plant lovers looking for low upkeep",
            "Air purifying spaces"
        ],
        notGoodFor: [
            "Dark dingy spaces without windows",
            "Waterlogged saucers"
        ]
    }
},
    sellerId: 's1',
    tags: ['indoor', 'bold-foliage', 'air-purifying', 'beginner'],
  },
  {
    id: 'p7',
    name: 'Calathea Orbifolia — Prayer Plant',
    description: 'Sought-after prayer plant with large round leaves patterned in silvery-green stripes. Safe for curious cats and dogs.',
    category: 'Indoor',
    price: 549,
    mrp: 899,
    images: [
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Medium',
    petSafe: true,
    beginner: false,
    size: 'Medium',
    stock: 28,
    rating: 4.5,
    reviewCount: 142,
    careGuide: {
    water: "When top soil is slightly dry",
    waterQuantity: "150–200 ml (filtered/RO water preferred)",
    waterSchedule: "Keep soil gently moist like a wrung-out sponge. Sensitive to harsh tap water chemicals (fluoride/chlorine).",
    light: "Medium indirect light",
    lightDetail: "Prefers dappled shade like rainforest floors. Direct sun will bleach and burn its decorative stripes.",
    humidity: "High (60–80%)",
    temperature: "18°C – 28°C (Prefers warm, humid environments)",
    idealEnvironment: "Well-lit bathroom, bedroom with humidifier, terrarium, shaded plant shelf",
    idealPlacement: [
        "Bedroom",
        "Bathroom Vanity",
        "Shaded Living Room"
    ],
    difficulty: "Attention Needed",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Pet & cat parents (100% non-toxic)",
            "Humid bathroom spaces",
            "Plant enthusiasts who enjoy misting"
        ],
        notGoodFor: [
            "Dry, arid, drafty AC rooms without humidity",
            "Direct sunlight"
        ]
    }
},
    sellerId: 's2',
    tags: ['indoor', 'pet-safe', 'patterned-leaves', 'rare'],
  },
  {
    id: 'p8',
    name: 'Boston Fern — Nephrolepis Exaltata',
    description: 'Cascading lush green feathery fronds. Naturally cleanses air and acts as a living humidifier, thriving in shaded balconies and bathrooms.',
    category: 'Indoor',
    price: 299,
    mrp: 499,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Medium',
    petSafe: true,
    beginner: false,
    size: 'Medium',
    stock: 38,
    rating: 4.4,
    reviewCount: 110,
    careGuide: {
    water: "Keep soil consistently moist",
    waterQuantity: "200–250 ml (every 2–3 days)",
    waterSchedule: "Moisture-loving fern. Water before soil completely dries. Enjoys frequent gentle misting on fronds.",
    light: "Filtered medium light",
    lightDetail: "Thrives in bright north light or dappled shade. Direct harsh rays will turn fronds crispy.",
    humidity: "High (60%+)",
    temperature: "16°C – 28°C",
    idealEnvironment: "Bright bathroom, shaded balcony ceiling hook, kitchen sink shelf",
    idealPlacement: [
        "Bathroom",
        "Shaded Balcony",
        "Hanging Hook"
    ],
    difficulty: "Moderate",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Hanging planters & cascading decor",
            "Safe for dogs and cats",
            "High humidity spaces"
        ],
        notGoodFor: [
            "Dry AC rooms without daily misting",
            "Forgotten watering schedules"
        ]
    }
},
    sellerId: 's1',
    tags: ['indoor', 'pet-safe', 'trailing', 'fern'],
  },

  // ==========================================
  // AIR PURIFYING PLANTS
  // ==========================================
  {
    id: 'p9',
    name: 'Areca Palm — Butterfly Palm',
    description: 'Feathery tropical palm fronds. Ranked among NASA top air purifiers for removing indoor xylene, toluene, and adding natural humidity.',
    category: 'Air Purifying',
    price: 599,
    mrp: 999,
    images: [
      'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Medium',
    petSafe: true,
    beginner: true,
    size: 'Large',
    stock: 50,
    rating: 4.7,
    reviewCount: 380,
    careGuide: {
    water: "Every 5–7 days",
    waterQuantity: "500–750 ml (approx. 2–3 cups for large pot)",
    waterSchedule: "Water when top 1–2 inches are dry. Ensure good drainage; avoid letting roots sit in standing pool of water.",
    light: "Bright indirect light",
    lightDetail: "Enjoys plenty of bright diffused light. Can tolerate 1–2 hours of soft morning sun.",
    humidity: "High (50–70%)",
    temperature: "18°C – 35°C (Thrives in Indian tropical climate)",
    idealEnvironment: "Living room next to balcony sliders, office receptions, bedroom reading corner",
    idealPlacement: [
        "Living Room",
        "Office Lounge",
        "Bedroom Corner"
    ],
    difficulty: "Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Homes needing natural air humidification",
            "Pet parents wanting a giant floor plant (100% pet-safe)",
            "Large empty corners"
        ],
        notGoodFor: [
            "Dark windowless rooms (tips turn brown)",
            "Extremely tight, cramped spots"
        ]
    }
},
    sellerId: 's1',
    tags: ['air-purifying', 'pet-safe', 'tropical', 'living-room'],
  },
  {
    id: 'p10',
    name: 'Peace Lily — Spathiphyllum Sensation',
    description: 'Glossy teardrop leaves with pristine porcelain white blooms. Highly effective at filtering airborne toxins and alerts you when thirsty.',
    category: 'Air Purifying',
    price: 399,
    mrp: 649,
    images: [
      'https://images.unsplash.com/photo-1428699190791-2c4f8b144d06?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Low',
    petSafe: false,
    beginner: true,
    size: 'Medium',
    stock: 55,
    rating: 4.6,
    reviewCount: 295,
    careGuide: {
    water: "Once a week when leaves slightly droop",
    waterQuantity: "200–300 ml (approx. 1 cup)",
    waterSchedule: "Tells you when it needs water by dramatically drooping; springs back up within 2 hours after a drink.",
    light: "Low to medium indirect",
    lightDetail: "Flourishes in soft shade or low ambient light. Direct sun scorches the white flower spathes.",
    humidity: "Average to high (50–70%)",
    temperature: "18°C – 30°C (Avoid temperature extremes under 15°C)",
    idealEnvironment: "Living room coffee table, bedroom dresser, office reception",
    idealPlacement: [
        "Living Room",
        "Bedroom",
        "Office Desk"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Beginners who want visual cues when to water",
            "Purifying indoor chemical toxins",
            "Flowering indoors without sun"
        ],
        notGoodFor: [
            "Households with nibbling pets (mildly toxic calcium oxalate crystals)",
            "Hot sunny balconies"
        ]
    }
},
    sellerId: 's2',
    tags: ['air-purifying', 'flowering', 'low-light', 'beginner'],
  },
  {
    id: 'p11',
    name: 'Spider Plant — Chlorophytum Comosum',
    description: 'Arching ribbons of variegated green-and-white foliage with baby plantlets. Safe for pets, easy to propagate, and fast growing.',
    category: 'Air Purifying',
    price: 199,
    mrp: 349,
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Medium',
    petSafe: true,
    beginner: true,
    size: 'Small',
    stock: 70,
    rating: 4.8,
    reviewCount: 310,
    careGuide: {
    water: "Every 7–10 days",
    waterQuantity: "150–200 ml (approx. 1 cup)",
    waterSchedule: "Tubular roots store moisture well. Water when top inch is dry; reduce frequency in monsoon.",
    light: "Medium indirect light",
    lightDetail: "Adapts to bright shade or gentle morning light. Avoid intense direct sunlight.",
    humidity: "Average (40–60%)",
    temperature: "15°C – 32°C (Handles varying Indian climates easily)",
    idealEnvironment: "Hanging balcony baskets, kitchen floating shelves, study desk, bathroom",
    idealPlacement: [
        "Hanging Basket",
        "Study Shelf",
        "Balcony",
        "Kitchen"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Pet lovers (completely safe for dogs & cats)",
            "Beginners wanting easy plant propagation from baby spiderettes",
            "Hanging decor"
        ],
        notGoodFor: [
            "Deep dark windowless rooms (loses variegation stripes)"
        ]
    }
},
    sellerId: 's1',
    tags: ['air-purifying', 'pet-safe', 'hanging', 'beginner'],
  },
  {
    id: 'p12',
    name: 'Aloe Vera — Barbadensis Miller',
    description: 'Classic medicinal succulent packed with soothing gel. Purifies indoor air and requires minimal attention under sunny conditions.',
    category: 'Air Purifying',
    price: 179,
    mrp: 299,
    images: [
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: false,
    beginner: true,
    size: 'Small',
    stock: 90,
    rating: 4.9,
    reviewCount: 460,
    careGuide: {
    water: "Every 2–3 weeks",
    waterQuantity: "100–150 ml (soak and dry method)",
    waterSchedule: "Drought specialist. Allow soil to dry completely to the bottom before watering. Never allow water to pool in leaf center.",
    light: "Bright direct to indirect",
    lightDetail: "Craves 4–6 hours of bright sunlight or strong ambient light on a sunny windowsill.",
    humidity: "Low (20–40%)",
    temperature: "15°C – 38°C (Loves Indian heat)",
    idealEnvironment: "Kitchen windowsill, sunny balcony ledge, terrace garden",
    idealPlacement: [
        "Kitchen Window",
        "Sunny Balcony",
        "Terrace"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Home skincare & burn relief remedies",
            "Sun-drenched windows and balconies",
            "Zero-maintenance plant parents"
        ],
        notGoodFor: [
            "Dark windowless rooms (becomes leggy and limp)",
            "Daily watering (causes stem rot)"
        ]
    }
},
    sellerId: 's1',
    tags: ['air-purifying', 'medicinal', 'drought-tolerant', 'skincare'],
  },
  {
    id: 'p13',
    name: 'Bamboo Palm — Chamaedorea Seifrizii',
    description: 'Cluster of slender bamboo-like canes topped with graceful tropical fronds. Exceptionally pet-safe and purifies benzene and carbon monoxide.',
    category: 'Air Purifying',
    price: 649,
    mrp: 1099,
    images: [
      'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Medium',
    petSafe: true,
    beginner: true,
    size: 'Large',
    stock: 22,
    rating: 4.5,
    reviewCount: 165,
    careGuide: {
    water: "Once a week",
    waterQuantity: "500–700 ml",
    waterSchedule: "Keep soil evenly moist. Ensure pot has drainage holes so roots never sit in standing water.",
    light: "Medium to bright shade",
    lightDetail: "Tolerates dimmer lighting better than most palms. Thrives in soft ambient shade.",
    humidity: "Average to high (50–70%)",
    temperature: "18°C – 32°C",
    idealEnvironment: "Living room, bedroom hallway, shaded balcony corner",
    idealPlacement: [
        "Living Room",
        "Bedroom",
        "Balcony Corner"
    ],
    difficulty: "Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Natural indoor air filtration",
            "Safe around pets and children",
            "Shaded apartments with limited direct sun"
        ],
        notGoodFor: [
            "Direct scorching midday sunlight",
            "Bone dry soil for extended weeks"
        ]
    }
},
    sellerId: 's2',
    tags: ['air-purifying', 'pet-safe', 'statement-plant', 'bamboo'],
  },
  {
    id: 'p14',
    name: 'Chinese Evergreen — Aglaonema Silver Bay',
    description: 'Broad silver-brushed leaves that illuminate dimmer spaces. Highly durable and filters airborne pollutants with ease.',
    category: 'Air Purifying',
    price: 449,
    mrp: 749,
    images: [
      'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Low',
    petSafe: false,
    beginner: true,
    size: 'Medium',
    stock: 35,
    rating: 4.7,
    reviewCount: 188,
    careGuide: {
    water: "Every 10–14 days",
    waterQuantity: "150–200 ml",
    waterSchedule: "Forgiving houseplant. Water when top 2 inches dry out; tolerates missed waterings without brown leaf drop.",
    light: "Low to medium indirect",
    lightDetail: "One of the best plants for low-light rooms and fluorescent office lighting.",
    humidity: "Average (40–60%)",
    temperature: "16°C – 32°C (Handles AC comfortably)",
    idealEnvironment: "Bedroom side table, executive office, hallway console table",
    idealPlacement: [
        "Bedroom",
        "Office Desk",
        "Living Room"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Low-light spaces and basements",
            "Newbie plant owners",
            "Air-conditioned bedrooms"
        ],
        notGoodFor: [
            "Full sun outdoor exposure (bleaches the silver patterns)"
        ]
    }
},
    sellerId: 's1',
    tags: ['air-purifying', 'variegated', 'low-light', 'beginner'],
  },

  // ==========================================
  // SUCCULENTS & CACTI
  // ==========================================
  {
    id: 'p15',
    name: 'Echeveria Elegans — Mexican Snowball',
    description: 'Symmetrical rosette of thick pale turquoise succulent petals with translucent edges. Compact and charming on sunny windowsills.',
    category: 'Succulents',
    price: 149,
    mrp: 249,
    images: [
      'https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: true,
    beginner: true,
    size: 'Small',
    stock: 120,
    rating: 4.8,
    reviewCount: 340,
    careGuide: {
    water: "Every 2–3 weeks, soak and dry",
    waterQuantity: "50–80 ml",
    waterSchedule: "Water only the soil around the base, never the rosette center. Wait until leaves feel slightly pliable.",
    light: "Bright direct sunlight",
    lightDetail: "Needs 5+ hours of direct sun to maintain its tight geometrical rosette and pastel colors.",
    humidity: "Low (dry air)",
    temperature: "15°C – 35°C",
    idealEnvironment: "Sunny windowsill, balcony rail planter, terrace garden table",
    idealPlacement: [
        "Sunny Windowsill",
        "Balcony Table",
        "Terrace"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Sunny apartments & balconies",
            "Desk planters with direct window light",
            "Pet safe households"
        ],
        notGoodFor: [
            "Dim rooms or dark offices (stretches out tall and pale)",
            "Frequent watering"
        ]
    }
},
    sellerId: 's2',
    tags: ['succulent', 'pet-safe', 'drought-tolerant', 'compact'],
  },
  {
    id: 'p16',
    name: 'Jade Plant — Crassula Ovata Money Tree',
    description: 'Fleshy jade-green coin leaves on woody miniature bonsai branches. Renowned in Feng Shui for bringing luck and financial prosperity.',
    category: 'Succulents',
    price: 229,
    mrp: 399,
    images: [
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: false,
    beginner: true,
    size: 'Small',
    stock: 80,
    rating: 4.7,
    reviewCount: 290,
    careGuide: {
    water: "Every 2–3 weeks",
    waterQuantity: "100–150 ml",
    waterSchedule: "Water when fleshy leaves slightly lose their plump firmness. Always let soil dry out thoroughly.",
    light: "Bright indirect to direct",
    lightDetail: "Enjoys 4+ hours of sun. Red tints appear on leaf edges with healthy sun exposure.",
    humidity: "Low to average (30–50%)",
    temperature: "15°C – 36°C (Extremely hardy)",
    idealEnvironment: "Front door entrance, study desk, sunny balcony, living room table",
    idealPlacement: [
        "Main Entrance",
        "Study Desk",
        "Balcony",
        "Living Room"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Vastu & Feng Shui prosperity placement at entrance",
            "Plant parents wanting a long-lived bonsai heirloom",
            "Drought tolerant care"
        ],
        notGoodFor: [
            "Chewing pets (toxic to dogs/cats)",
            "Heavy clay soil without drainage"
        ]
    }
},
    sellerId: 's1',
    tags: ['succulent', 'good-luck', 'drought-tolerant', 'bonsai-style'],
  },
  {
    id: 'p17',
    name: 'String of Pearls — Senecio Rowleyanus',
    description: 'Whimsical trailing succulent with cascading strings of plump emerald beads. A breathtaking showstopper in hanging pots.',
    category: 'Succulents',
    price: 349,
    mrp: 599,
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: false,
    beginner: false,
    size: 'Small',
    stock: 45,
    rating: 4.5,
    reviewCount: 175,
    careGuide: {
    water: "Bottom water every 2 weeks",
    waterQuantity: "80–120 ml",
    waterSchedule: "Water when epidermal windows on pearls narrow and pearls look slightly deflated. Bottom watering prevents crown rot.",
    light: "Bright indirect sunlight",
    lightDetail: "Place near a south or west window where the top of the pot receives bright light.",
    humidity: "Low (dry air)",
    temperature: "18°C – 30°C",
    idealEnvironment: "Hanging basket near sunny window, high floating shelf with top light",
    idealPlacement: [
        "Sunny Window",
        "Hanging Hook",
        "High Shelf"
    ],
    difficulty: "Moderate",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Plant collectors looking for rare aesthetics",
            "Bright sunny apartments with hanging hooks"
        ],
        notGoodFor: [
            "Dark rooms",
            "Overwatering or misting pearls directly (leads to mushy rot)"
        ]
    }
},
    sellerId: 's2',
    tags: ['succulent', 'hanging', 'cascading', 'rare'],
  },
  {
    id: 'p18',
    name: 'Haworthia Fasciata — Zebra Succulent',
    description: 'Upright dark green rosette adorned with striking embossed white pearl ridges. Highly resilient and safe around pets.',
    category: 'Succulents',
    price: 199,
    mrp: 349,
    images: [
      'https://images.unsplash.com/photo-1552447921-9e3e55235b84?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578347485613-3d9b213d5f93?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Medium',
    petSafe: true,
    beginner: true,
    size: 'Small',
    stock: 60,
    rating: 4.8,
    reviewCount: 220,
    careGuide: {
    water: "Every 2–3 weeks",
    waterQuantity: "60–100 ml",
    waterSchedule: "Water when soil is dry to the bottom. Very forgiving succulent that withstands dry spells.",
    light: "Medium to bright indirect",
    lightDetail: "Unlike most succulents, Haworthia thrives in bright indirect light and tolerates semi-shade.",
    humidity: "Low (30–45%)",
    temperature: "16°C – 32°C",
    idealEnvironment: "Office computer desk, bookshelf, bedroom nightstand",
    idealPlacement: [
        "Office Desk",
        "Bookshelf",
        "Bedroom"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Work desks and cubicles",
            "100% pet safe for cats and dogs",
            "Compact spaces"
        ],
        notGoodFor: [
            "Intense burning desert noon sun (turns leaves reddish brown)"
        ]
    }
},
    sellerId: 's1',
    tags: ['succulent', 'pet-safe', 'striped', 'compact'],
  },
  {
    id: 'p19',
    name: 'Golden Barrel Cactus — Echinocactus Grusonii',
    description: 'Sculptural spherical desert cactus with prominent ribs and radiating golden amber spines. A centerpiece of dry garden design.',
    category: 'Succulents',
    price: 279,
    mrp: 449,
    images: [
      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: false,
    beginner: true,
    size: 'Small',
    stock: 50,
    rating: 4.6,
    reviewCount: 130,
    careGuide: {
    water: "Once a month in summer, rarely in winter",
    waterQuantity: "50–100 ml",
    waterSchedule: "Needs almost zero water. Soak sparingly once a month during hot months; stop watering in monsoon/winter.",
    light: "Full direct sun 6+ hours",
    lightDetail: "Loves maximum blazing sunlight to produce vibrant golden spines.",
    humidity: "Very low (arid)",
    temperature: "15°C – 42°C (Desert champion)",
    idealEnvironment: "Hot outdoor balcony, terrace garden, rooftop cactus collection",
    idealPlacement: [
        "Terrace",
        "Sunny Balcony",
        "Outdoor Garden"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Scorching balconies where other plants burn",
            "Zero-maintenance gardening",
            "Sculptural desert vibes"
        ],
        notGoodFor: [
            "Homes with energetic pets or toddlers (sharp rigid spines)",
            "Indoor dark rooms"
        ]
    }
},
    sellerId: 's2',
    tags: ['cactus', 'desert', 'sun-lover', 'low-water'],
  },
  {
    id: 'p20',
    name: 'Mini Succulent Trio — Gift Garden Set',
    description: 'Set of 3 assorted hand-picked healthy succulents potted in contemporary mini ceramic planters. An ideal green gift.',
    category: 'Succulents',
    price: 399,
    mrp: 699,
    images: [
      'https://images.unsplash.com/photo-1484553255294-313b931acd27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1483794344563-d27a8d18014e?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: true,
    beginner: true,
    size: 'Small',
    stock: 75,
    rating: 4.9,
    reviewCount: 310,
    careGuide: {
    water: "Every 2 weeks",
    waterQuantity: "50 ml per small pot",
    waterSchedule: "Water around soil edge when soil is bone dry. Never leave standing water in decorative outer dishes.",
    light: "Bright direct to indirect",
    lightDetail: "Keep on a sunny windowsill or bright tabletop with good ambient airflow.",
    humidity: "Low",
    temperature: "16°C – 34°C",
    idealEnvironment: "Coffee table, work desk, sunny windowsill, gift display",
    idealPlacement: [
        "Coffee Table",
        "Office Desk",
        "Windowsill"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Housewarming & birthday gifts",
            "Desk decor & small apartment living",
            "Beginners starting their plant journey"
        ],
        notGoodFor: [
            "Windowless bathrooms",
            "Daily watering habits"
        ]
    }
},
    sellerId: 's1',
    tags: ['succulent', 'gift-set', 'desk-decor', 'beginner'],
  },

  // ==========================================
  // HERBS & EDIBLES
  // ==========================================
  {
    id: 'p21',
    name: 'Holy Basil — Krishna Tulsi',
    description: 'Revered medicinal herb with intoxicating clove-peppery scent. Boosts immunity, naturally repels mosquitoes, and purifies homes.',
    category: 'Herbs',
    price: 99,
    mrp: 179,
    images: [
      'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: true,
    beginner: true,
    size: 'Small',
    stock: 140,
    rating: 4.9,
    reviewCount: 560,
    careGuide: {
    water: "Daily or every alternate day",
    waterQuantity: "200–300 ml",
    waterSchedule: "Keep soil moist, especially during hot summer months. Water early morning before sunrise.",
    light: "Full bright sunlight 4+ hours",
    lightDetail: "Sacred plant requires direct natural sunlight to produce essential aromatic oils and healthy foliage.",
    humidity: "Average (40–65%)",
    temperature: "20°C – 38°C (Loves warm Indian climate, protect from chilly winter frost)",
    idealEnvironment: "Balcony, pooja room with window, terrace, sunny courtyard",
    idealPlacement: [
        "Balcony Mandir",
        "Terrace",
        "Sunny Courtyard",
        "Kitchen Garden"
    ],
    difficulty: "Easy",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Daily morning pooja and spiritual wellness",
            "Herbal teas, cough remedies & immunity boosting",
            "Repelling flies and mosquitoes"
        ],
        notGoodFor: [
            "Dark, closed indoor rooms with no sunlight",
            "Continuous AC environments"
        ]
    }
},
    sellerId: 's1',
    tags: ['herb', 'medicinal', 'aromatic', 'pooja', 'tea'],
  },
  {
    id: 'p22',
    name: 'Fresh Mint — Pudina',
    description: 'Invigorating aromatic culinary herb that multiplies fast. Fresh garden pickings for daily chutneys, refreshing teas, and mocktails.',
    category: 'Herbs',
    price: 99,
    mrp: 149,
    images: [
      'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Medium',
    petSafe: true,
    beginner: true,
    size: 'Small',
    stock: 150,
    rating: 4.8,
    reviewCount: 390,
    careGuide: {
    water: "Keep soil moist daily",
    waterQuantity: "150–250 ml daily",
    waterSchedule: "Loves water and damp soil. Check daily in summer; prune stem tips frequently to encourage bushy growth.",
    light: "Medium to bright indirect with morning sun",
    lightDetail: "Enjoys 3–4 hours of morning sun or bright indirect balcony light.",
    humidity: "Average to high",
    temperature: "15°C – 32°C",
    idealEnvironment: "Kitchen garden balcony, window box planter, sunny kitchen windowsill",
    idealPlacement: [
        "Kitchen Balcony",
        "Windowsill Planter",
        "Kitchen Counter"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Daily homemade chutneys, lemonades, and fresh teas",
            "Fast propagation and quick harvest",
            "Pet-safe herb gardening"
        ],
        notGoodFor: [
            "Neglected watering (wilts quickly when soil dries)",
            "Deep shade"
        ]
    }
},
    sellerId: 's1',
    tags: ['herb', 'edible', 'fast-growing', 'chutney', 'tea'],
  },
  {
    id: 'p23',
    name: 'Italian Sweet Basil — Genovese',
    description: 'Lush tender broad leaves with signature anise-peppery sweetness. Essential for authentic homemade pesto, pasta sauces, and pizzas.',
    category: 'Herbs',
    price: 129,
    mrp: 229,
    images: [
      'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: true,
    beginner: true,
    size: 'Small',
    stock: 90,
    rating: 4.7,
    reviewCount: 240,
    careGuide: {
    water: "Water when topsoil feels dry",
    waterQuantity: "200 ml every 1–2 days",
    waterSchedule: "Keep soil evenly moist. Pinch off flower buds as soon as they appear to keep leaves sweet and tender.",
    light: "Bright direct sunlight",
    lightDetail: "Requires 5+ hours of sunshine daily for best aroma and vigorous leaf growth.",
    humidity: "Average",
    temperature: "18°C – 34°C",
    idealEnvironment: "Sunny kitchen balcony, patio herb garden, sunny windowsill",
    idealPlacement: [
        "Sunny Balcony",
        "Kitchen Garden",
        "Patio"
    ],
    difficulty: "Easy",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Italian culinary lovers (homemade fresh pesto, pizzas, pastas)",
            "Sunny kitchen balconies",
            "Edible container gardening"
        ],
        notGoodFor: [
            "Low-light indoor rooms (stretches thin and weak)"
        ]
    }
},
    sellerId: 's2',
    tags: ['herb', 'edible', 'culinary', 'pesto', 'kitchen-garden'],
  },
  {
    id: 'p24',
    name: 'English Lavender — Munstead',
    description: 'Sweet soothing purple floral spikes with timeless calming scent. Loves dry, sunny balconies and repels moths naturally.',
    category: 'Herbs',
    price: 349,
    mrp: 599,
    images: [
      'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: true,
    beginner: false,
    size: 'Medium',
    stock: 35,
    rating: 4.4,
    reviewCount: 160,
    careGuide: {
    water: "Every 1–2 weeks, well-draining soil",
    waterQuantity: "150–200 ml",
    waterSchedule: "Prefers dry, rocky conditions. Let soil dry out completely. Excess water causes root rot.",
    light: "Full direct sun 6+ hours",
    lightDetail: "Needs intense full sun to develop its therapeutic fragrance and purple floral spikes.",
    humidity: "Low (dislikes humid, soggy air)",
    temperature: "15°C – 32°C",
    idealEnvironment: "Open sunny balcony, rooftop herb bed, outdoor terrace planter",
    idealPlacement: [
        "Balcony Railing",
        "Rooftop",
        "Sunny Terrace"
    ],
    difficulty: "Moderate",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Aromatherapy enthusiasts, calming bedtime scents",
            "Sun-drenched outdoor balconies",
            "Natural moth and insect repelling"
        ],
        notGoodFor: [
            "Humid indoor bathrooms",
            "Shaded apartments with no direct sun"
        ]
    }
},
    sellerId: 's2',
    tags: ['herb', 'fragrant', 'calming', 'purple-blooms', 'sun-loving'],
  },
  {
    id: 'p25',
    name: 'Curry Leaf Plant — Kadi Patta',
    description: 'Fresh organic aromatic curry leaf tree sapling. Indispensable for authentic Indian tadkas, sambars, and aromatic seasoning.',
    category: 'Herbs',
    price: 149,
    mrp: 249,
    images: [
      'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: true,
    beginner: true,
    size: 'Medium',
    stock: 110,
    rating: 4.9,
    reviewCount: 480,
    careGuide: {
    water: "Every 2 days",
    waterQuantity: "300–400 ml",
    waterSchedule: "Water thoroughly when top soil dries. Feed with buttermilk or sour curd diluted in water monthly for rich aroma.",
    light: "Bright direct sun 4+ hours",
    lightDetail: "Loves warm tropical sun. Young saplings appreciate soft morning sun, mature trees thrive in full sun.",
    humidity: "Average",
    temperature: "20°C – 38°C (Shield from harsh winter cold under 12°C)",
    idealEnvironment: "Balcony garden, terrace container, kitchen garden courtyard",
    idealPlacement: [
        "Balcony",
        "Terrace",
        "Kitchen Courtyard"
    ],
    difficulty: "Easy",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Every Indian kitchen cooking authentic curries and tadkas",
            "Long-lasting fragrant container tree",
            "Outdoor sunny balconies"
        ],
        notGoodFor: [
            "Indoor closed AC rooms (sheds leaves rapidly without sun)"
        ]
    }
},
    sellerId: 's1',
    tags: ['herb', 'edible', 'indian-cooking', 'fresh-spices'],
  },
  {
    id: 'p26',
    name: 'Culinary Rosemary — Salvia Rosmarinus',
    description: 'Resinous pine-scented evergreen needle leaves. Adds savory depth to roasted potatoes, breads, and oils while looking handsome on balconies.',
    category: 'Herbs',
    price: 179,
    mrp: 299,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: true,
    beginner: true,
    size: 'Medium',
    stock: 65,
    rating: 4.6,
    reviewCount: 195,
    careGuide: {
    water: "Allow soil to dry out between waterings",
    waterQuantity: "150–200 ml every 4–6 days",
    waterSchedule: "Tough Mediterranean shrub. Sensitive to overwatering; allow soil to dry completely before watering again.",
    light: "Full sun 6+ hours",
    lightDetail: "Thrives in blazing sunlight and warm fresh air on an open balcony.",
    humidity: "Low to average",
    temperature: "15°C – 35°C",
    idealEnvironment: "Open balcony, sunny kitchen garden box, terrace container",
    idealPlacement: [
        "Balcony Railing",
        "Kitchen Garden",
        "Terrace"
    ],
    difficulty: "Easy",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Culinary roasting, tea brewing & hair rinse tonics",
            "Sunny and dry balconies",
            "Low-water herb gardening"
        ],
        notGoodFor: [
            "Low-light indoor rooms (suffers from powdery mildew without air & sun)"
        ]
    }
},
    sellerId: 's2',
    tags: ['herb', 'edible', 'woody-aromatic', 'drought-tolerant'],
  },

  // ==========================================
  // FLOWERING PLANTS
  // ==========================================
  {
    id: 'p27',
    name: 'Hibiscus — Red Gudhal Shoe Flower',
    description: 'Showstopping scarlet ruffled petals with prominent golden anthers. Blooms generously throughout the warm months in bright sunlight.',
    category: 'Flowering',
    price: 249,
    mrp: 449,
    images: [
      'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: true,
    beginner: true,
    size: 'Medium',
    stock: 75,
    rating: 4.7,
    reviewCount: 310,
    careGuide: {
    water: "Every 2 days",
    waterQuantity: "300–500 ml",
    waterSchedule: "Thirsty bloomer. Keep soil moist in peak summer; water in the morning to fuel all-day flowering.",
    light: "Direct full sunlight 5+ hours",
    lightDetail: "Demands generous direct sun to produce continuous crimson blooms.",
    humidity: "Average",
    temperature: "18°C – 36°C",
    idealEnvironment: "Balcony garden, terrace planter, sunny front yard",
    idealPlacement: [
        "Balcony Garden",
        "Terrace",
        "Front Porch"
    ],
    difficulty: "Easy",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Balcony gardeners wanting vibrant flowers every week",
            "Daily pooja flower offering (Ganesh & Durga pooja)",
            "Attracting butterflies and sunbirds"
        ],
        notGoodFor: [
            "Indoor spaces without direct sunlight (will drop buds before opening)"
        ]
    }
},
    sellerId: 's1',
    tags: ['flowering', 'balcony', 'daily-blooms', 'sun-loving', 'pooja'],
  },
  {
    id: 'p28',
    name: 'Arabian Jasmine — Mogra / Sambac',
    description: 'Pure snow-white floral stars with legendary sweet evening perfume. Prized for traditional gajras, garlands, and sacred rituals.',
    category: 'Flowering',
    price: 299,
    mrp: 499,
    images: [
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: true,
    beginner: false,
    size: 'Medium',
    stock: 60,
    rating: 4.8,
    reviewCount: 390,
    careGuide: {
    water: "Keep soil moist but not soggy",
    waterQuantity: "250–350 ml every 1–2 days",
    waterSchedule: "Water regularly during spring and summer blooming season. Prune branches after each flowering flush.",
    light: "Direct sunlight 4–6 hours",
    lightDetail: "Direct sun is essential for developing its intensely sweet floral nectar scent.",
    humidity: "Average",
    temperature: "20°C – 38°C (Loves warm Indian weather)",
    idealEnvironment: "Balcony railing, terrace pot, sunny verandah",
    idealPlacement: [
        "Balcony Railing",
        "Terrace",
        "Verandah"
    ],
    difficulty: "Moderate",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Lovers of natural evening fragrance and aroma",
            "Traditional gajras and poojas",
            "Sunny outdoor balconies"
        ],
        notGoodFor: [
            "Dark indoor rooms",
            "Waterlogged pots with poor drainage"
        ]
    }
},
    sellerId: 's2',
    tags: ['flowering', 'intense-fragrance', 'traditional', 'balcony'],
  },
  {
    id: 'p29',
    name: 'Indian Damask Rose — Desi Gulab',
    description: 'Classic deeply fragrant pink blossoms used for rosewater and syrups. Fills your garden or balcony with unforgettable nostalgic perfume.',
    category: 'Flowering',
    price: 249,
    mrp: 399,
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: true,
    beginner: false,
    size: 'Medium',
    stock: 55,
    rating: 4.6,
    reviewCount: 270,
    careGuide: {
    water: "Every 2 days in morning",
    waterQuantity: "300–400 ml",
    waterSchedule: "Water at soil level early morning; avoid splashing water on leaves to prevent fungal blackspot.",
    light: "Full morning sunlight 6 hours",
    lightDetail: "Enjoys cool morning sun and bright afternoon light for prolific flowering.",
    humidity: "Average",
    temperature: "16°C – 32°C",
    idealEnvironment: "Terrace garden, sunny balcony, outdoor flower bed",
    idealPlacement: [
        "Terrace Garden",
        "Sunny Balcony",
        "Outdoor Flower Bed"
    ],
    difficulty: "Moderate",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Classic rose fragrance lovers",
            "Traditional rosewater making & fresh floral bouquets",
            "Sunny garden balconies"
        ],
        notGoodFor: [
            "Indoor living rooms",
            "Shaded balconies without direct sunlight"
        ]
    }
},
    sellerId: 's1',
    tags: ['flowering', 'fragrant', 'traditional', 'garden'],
  },
  {
    id: 'p30',
    name: 'French Marigold — Genda Flowers',
    description: 'Cheerful golden-orange blooms that symbolize festive joy. Naturally wards off garden nematodes and thrives easily in planters.',
    category: 'Flowering',
    price: 99,
    mrp: 179,
    images: [
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: true,
    beginner: true,
    size: 'Small',
    stock: 130,
    rating: 4.7,
    reviewCount: 320,
    careGuide: {
    water: "Every 2–3 days",
    waterQuantity: "200–300 ml",
    waterSchedule: "Water when top inch is dry. Deadhead spent flowers regularly to stimulate new buds.",
    light: "Direct full sunlight",
    lightDetail: "Basks in bright, uninterrupted sun. Thrives through sunny autumns and winters.",
    humidity: "Average",
    temperature: "15°C – 35°C",
    idealEnvironment: "Balcony railing boxes, terrace flower rows, festival entryway",
    idealPlacement: [
        "Balcony Railing",
        "Terrace Flower Bed",
        "Main Entrance"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Festive Diwali & pooja decorations",
            "Natural vegetable pest repellent (drives away garden bugs)",
            "Beginner flower growers"
        ],
        notGoodFor: [
            "Indoor dim rooms (stems collapse without sun)"
        ]
    }
},
    sellerId: 's2',
    tags: ['flowering', 'festive', 'pest-repellent', 'bright-orange'],
  },
  {
    id: 'p31',
    name: 'Phalaenopsis Moth Orchid — Exotic Blossom',
    description: 'Elegant arching spray of long-lasting white and violet blooms. Potted in breathable orchid bark for luxurious indoor tabletops.',
    category: 'Flowering',
    price: 799,
    mrp: 1299,
    images: [
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Medium',
    petSafe: true,
    beginner: false,
    size: 'Medium',
    stock: 20,
    rating: 4.8,
    reviewCount: 155,
    careGuide: {
    water: "Run under water once a week, let drain completely",
    waterQuantity: "100–150 ml or ice cube method",
    waterSchedule: "Never let roots sit in water. Water bark thoroughly once a week and let all excess drain freely.",
    light: "Bright filtered indirect light",
    lightDetail: "Prefers soft eastern light. Never place in scorching direct sun which scorches delicate leaves.",
    humidity: "High (55–75%)",
    temperature: "18°C – 28°C (Comfortable in AC living rooms)",
    idealEnvironment: "Dining table centerpiece, luxury bathroom vanity, living room credenza",
    idealPlacement: [
        "Dining Table",
        "Living Room Credenza",
        "Bathroom Vanity"
    ],
    difficulty: "Moderate",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Luxury indoor floral centerpieces (blooms last 2–3 months)",
            "Pet safe households",
            "Gift giving for milestones"
        ],
        notGoodFor: [
            "Regular garden potting soil (roots need specialty pine bark/moss)",
            "Direct outdoor sun"
        ]
    }
},
    sellerId: 's2',
    tags: ['flowering', 'exotic', 'luxury-gift', 'long-lasting'],
  },
  {
    id: 'p32',
    name: 'Bougainvillea — Magenta Paper Flower',
    description: 'Electrifying magenta bracts cascading like vibrant paper ribbons. Thrives on scorching sun and dry soil, exploding with flowers.',
    category: 'Flowering',
    price: 229,
    mrp: 399,
    images: [
      'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: true,
    beginner: true,
    size: 'Large',
    stock: 45,
    rating: 4.6,
    reviewCount: 210,
    careGuide: {
    water: "Every 4–5 days, tolerates drought",
    waterQuantity: "250–350 ml",
    waterSchedule: "Thrives on slight neglect. Stressing with slightly less water triggers massive bursts of magenta flowers.",
    light: "Full blazing sun 6+ hours",
    lightDetail: "The more intense the sunlight, the more dazzling the magenta floral show.",
    humidity: "Low to average",
    temperature: "18°C – 42°C (Loves scorching Indian heatwaves)",
    idealEnvironment: "Balcony grill climber, terrace perimeter, sunny boundary wall",
    idealPlacement: [
        "Balcony Grill",
        "Terrace Boundary",
        "Sunny Verandah"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: false,
    suitability: {
        goodFor: [
            "Extreme heat and sunny balconies where other plants perish",
            "Vibrant cascading privacy screens",
            "Forgetful waterers"
        ],
        notGoodFor: [
            "Indoor living rooms",
            "Overwatering (produces green leaves but zero flowers)"
        ]
    }
},
    sellerId: 's1',
    tags: ['flowering', 'drought-tolerant', 'full-sun', 'climber'],
  },

  // ==========================================
  // POTS, PLANTERS & CARE
  // ==========================================
  {
    id: 'p33',
    name: 'Handcrafted Terracotta Pot — 8 Inch with Saucer',
    description: 'Traditional porous baked red earthenware pot with drainage hole and matched saucer. Provides superior root aeration and prevents root rot.',
    category: 'Pots & Planters',
    price: 199,
    mrp: 349,
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Low',
    petSafe: true,
    beginner: true,
    size: 'Small',
    stock: 160,
    rating: 4.8,
    reviewCount: 310,
    careGuide: {
    water: "N/A — Planter with Drainage",
    waterQuantity: "Breathable porous baked red earthenware clay pot",
    waterSchedule: "Allows soil to breathe and naturally wicks away excess moisture to prevent root rot.",
    light: "Any light",
    lightDetail: "Suitable for indoor desks, shaded shelves, or outdoor balconies.",
    humidity: "All humidity levels",
    temperature: "Weather resistant",
    idealEnvironment: "Balcony, living room, study desk, terrace garden",
    idealPlacement: [
        "Balcony",
        "Living Room",
        "Study Desk"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Plants prone to root rot like Snake Plant, Jade, Succulents & Pothos",
            "Organic earthy terracotta aesthetics",
            "Long term root health"
        ],
        notGoodFor: [
            "Plants needing constant swampy soil if you forget to water often"
        ]
    }
},
    sellerId: 's1',
    tags: ['pots', 'terracotta', 'breathable', 'drainage-hole'],
  },
  {
    id: 'p34',
    name: 'Nordic Matte Ceramic Planter — 6 Inch with Bamboo Tray',
    description: 'Clean cylindrical ceramic planter with smooth matte finish and warm natural bamboo drip tray. Elevates desktops, counters, and consoles.',
    category: 'Pots & Planters',
    price: 399,
    mrp: 699,
    images: [
      'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Low',
    petSafe: true,
    beginner: true,
    size: 'Small',
    stock: 90,
    rating: 4.9,
    reviewCount: 245,
    careGuide: {
    water: "N/A — Planter with Bamboo Tray",
    waterQuantity: "Glazed premium ceramic with matching bamboo saucer",
    waterSchedule: "Protects furniture and desks from water runoff while keeping roots clean.",
    light: "Any light",
    lightDetail: "Ideal for indoor interior styling on desks, dining tables, and credenzas.",
    humidity: "All humidity levels",
    temperature: "Indoor climate",
    idealEnvironment: "Office desk, living room coffee table, bedside table",
    idealPlacement: [
        "Office Desk",
        "Coffee Table",
        "Bedside Table"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Contemporary modern home decor",
            "Protecting wooden furniture from water leaks",
            "Desk plants (ZZ, Snake, Mini Succulents)"
        ],
        notGoodFor: [
            "Heavy outdoor impact"
        ]
    }
},
    sellerId: 's2',
    tags: ['pots', 'ceramic', 'minimalist', 'indoor-decor'],
  },
  {
    id: 'p35',
    name: 'Vintage Long-Spout Watering Can — 1.8L Brass Spout',
    description: 'Galvanized powder-coated watering can with precision narrow neck. Directs water straight to roots without splashing delicate foliage.',
    category: 'Pots & Planters',
    price: 449,
    mrp: 799,
    images: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Low',
    petSafe: true,
    beginner: true,
    size: 'Medium',
    stock: 70,
    rating: 4.8,
    reviewCount: 185,
    careGuide: {
    water: "N/A — Ergonomic 1.8L Watering Tool",
    waterQuantity: "Precision long-reach brass spout",
    waterSchedule: "Delivers water precisely to the root zone without splashing delicate leaves or causing fungal spots.",
    light: "N/A",
    lightDetail: "Gardening accessory for indoor and balcony plant care.",
    humidity: "Rust-resistant powder coating",
    temperature: "All seasons",
    idealEnvironment: "Balcony garden, indoor houseplant collection",
    idealPlacement: [
        "Balcony Shelf",
        "Plant Stand",
        "Garden Tool Box"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Dense foliage plants (Monstera, Fiddle Leaf, Ferns) where pots are hard to reach",
            "Mess-free indoor plant watering",
            "Aesthetic vintage garden shelf decor"
        ],
        notGoodFor: [
            "Commercial agricultural fields"
        ]
    }
},
    sellerId: 's1',
    tags: ['care', 'watering-can', 'ergonomic', 'rust-proof'],
  },
  {
    id: 'p36',
    name: 'Ficus Ginseng Bonsai Tree — Ceramic Glazed Dish',
    description: 'Artfully trained miniature tree with exposed sculptural thick bulbous roots and dense glossy canopy. A living work of zen art.',
    category: 'Pots & Planters',
    price: 749,
    mrp: 1299,
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Bright',
    petSafe: false,
    beginner: false,
    size: 'Medium',
    stock: 25,
    rating: 4.9,
    reviewCount: 220,
    careGuide: {
    water: "When topsoil feels slightly dry",
    waterQuantity: "150–200 ml every 4–7 days",
    waterSchedule: "Check soil moisture regularly. Water thoroughly until liquid drains into ceramic dish, then empty tray.",
    light: "Bright indirect light",
    lightDetail: "Flourishes in abundant bright indirect sunlight. Can enjoy 1 hour of gentle morning sun.",
    humidity: "Average to high (50–65%)",
    temperature: "18°C – 32°C (AC friendly, avoid placing in direct cold AC wind)",
    idealEnvironment: "Living room centerpiece, executive desk, peaceful meditation corner",
    idealPlacement: [
        "Executive Desk",
        "Living Room Table",
        "Meditation Corner"
    ],
    difficulty: "Moderate",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Zen art and living bonsai appreciation",
            "Statement office desk centerpiece",
            "Mindful pruning and shaping hobby"
        ],
        notGoodFor: [
            "Dark windowless rooms",
            "Homes with cats that chew leaves"
        ]
    }
},
    sellerId: 's1',
    tags: ['bonsai', 'living-art', 'statement', 'zen'],
  },
  {
    id: 'p37',
    name: 'Smart Self-Watering Planter — 7 Inch with Water Indicator',
    description: 'Sub-irrigation reservoir pot with float meter. Keeps plant roots optimally hydrated for 10–14 days without overwatering anxiety.',
    category: 'Pots & Planters',
    price: 349,
    mrp: 599,
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Low',
    petSafe: true,
    beginner: true,
    size: 'Medium',
    stock: 85,
    rating: 4.7,
    reviewCount: 160,
    careGuide: {
    water: "Refill reservoir when float indicator drops to min",
    waterQuantity: "700 ml sub-irrigation reservoir",
    waterSchedule: "Capillary wick action draws moisture as the plant needs it for 10–14 days. Perfect for vacations.",
    light: "Any light",
    lightDetail: "Suitable for any indoor or covered balcony location.",
    humidity: "All humidity levels",
    temperature: "All indoor temperatures",
    idealEnvironment: "Living room, office desk, bedroom, traveler home",
    idealPlacement: [
        "Office Desk",
        "Living Room",
        "Bedroom"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Frequent travelers & vacationers (keeps plants hydrated 10+ days)",
            "Preventing both over-watering and under-watering",
            "Office plants"
        ],
        notGoodFor: [
            "Plants that need bone-dry desert conditions (like Cacti)"
        ]
    }
},
    sellerId: 's2',
    tags: ['pots', 'self-watering', 'vacation-proof', 'sub-irrigation'],
  },
  {
    id: 'p38',
    name: 'Boho Macrame Cotton Hanging Planter — 40 Inch',
    description: 'Hand-braided natural unbleached cotton cord with wooden accent beads. Comfortably holds pots from 5 to 8 inches for vertical garden charm.',
    category: 'Pots & Planters',
    price: 249,
    mrp: 449,
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    ],
    light: 'Low',
    petSafe: true,
    beginner: true,
    size: 'Small',
    stock: 95,
    rating: 4.6,
    reviewCount: 140,
    careGuide: {
    water: "N/A — Hanging Cotton Plant Holder",
    waterQuantity: "100% natural unbleached braided cotton rope",
    waterSchedule: "Elevates pots off floor and saves space while creating lush vertical indoor gardens.",
    light: "Any light",
    lightDetail: "Hang near bright windows, balcony ceiling hooks, or curtain rods.",
    humidity: "Average",
    temperature: "Indoor and covered outdoor",
    idealEnvironment: "Sunny window alcove, balcony ceiling, boho living room corner",
    idealPlacement: [
        "Window Hook",
        "Balcony Ceiling",
        "Living Room Corner"
    ],
    difficulty: "Very Easy",
    airConditionedSafe: true,
    suitability: {
        goodFor: [
            "Trailing vines (Money Plant, String of Pearls, Boston Fern, Spider Plant)",
            "Keeping plants out of reach of curious cats and toddlers",
            "Small apartments needing vertical space saving"
        ],
        notGoodFor: [
            "Giant heavy floor planters above 8 inches"
        ]
    }
},
    sellerId: 's1',
    tags: ['pots', 'hanging', 'macrame', 'boho-decor'],
  },
];

export const reviews: Review[] = [
  { id: 'r1', productId: 'p1', userName: 'Ananya Sharma', rating: 5, comment: 'Arrived in immaculate condition with gorgeous fenestrated leaves. Already putting out a new leaf!', date: '2026-08-15' },
  { id: 'r2', productId: 'p1', userName: 'Rohit Verma', rating: 5, comment: 'Packaging was top notch! The root ball was moist and healthy. Living room looks like a jungle.', date: '2026-08-10' },
  { id: 'r3', productId: 'p2', userName: 'Priya Iyer', rating: 5, comment: 'The most forgiving plant ever. Forgot it for 3 weeks during vacation and it looks pristine.', date: '2026-08-20' },
  { id: 'r4', productId: 'p3', userName: 'Deepak Nair', rating: 5, comment: 'Golden leaves are so bright and vibrant. Vines are already trailing down my bookshelf.', date: '2026-08-18' },
  { id: 'r5', productId: 'p4', userName: 'Kavita Sen', rating: 5, comment: 'Glossy dark green leaves, looks almost artificial because it stays so perfect. Love it!', date: '2026-08-12' },
  { id: 'r6', productId: 'p9', userName: 'Vikram Mehta', rating: 5, comment: 'Magnificent palm! Big, bushy, and our air feels perceptibly fresher. Pet-safe too.', date: '2026-08-22' },
  { id: 'r7', productId: 'p10', userName: 'Sneha Patel', rating: 5, comment: 'The white blooms are breathtaking. Easy care and alerts you if it needs water.', date: '2026-08-14' },
  { id: 'r8', productId: 'p15', userName: 'Aditya Rao', rating: 5, comment: 'Beautiful geometrical rosette in delicate blue-green pastel tones. Thriving on windowsill.', date: '2026-08-25' },
  { id: 'r9', productId: 'p21', userName: 'Geeta Joshi', rating: 5, comment: 'Very sacred and aromatic Krishna Tulsi. Healthy root system and fresh leaves for tea daily.', date: '2026-08-28' },
  { id: 'r10', productId: 'p27', userName: 'Meera Deshmukh', rating: 5, comment: 'Red Gudhal started flowering within 4 days of arrival! Vibrant red petals.', date: '2026-08-26' },
  { id: 'r11', productId: 'p28', userName: 'Sunil Gupta', rating: 5, comment: 'The Mogra fragrance in the evening fills our entire balcony. Divine quality.', date: '2026-08-27' },
  { id: 'r12', productId: 'p33', userName: 'Pooja Reddy', rating: 5, comment: 'High grade porous clay pot with great drainage. Plants love natural terracotta.', date: '2026-08-21' },
  { id: 'r13', productId: 'p36', userName: 'Arjun Das', rating: 5, comment: 'The bonsai root structure is sculptural and gorgeous. Adds instant serenity to my work desk.', date: '2026-08-29' },
];

export const coupons: Coupon[] = [
  { code: 'WELCOME10', type: 'percent', value: 10, description: '10% off your entire order' },
  { code: 'FREESHIP', type: 'shipping', value: 0, description: 'Free delivery on your order' },
  { code: 'GREEN20', type: 'percent', value: 20, minOrder: 999, description: '20% off on orders above ₹999' },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}
