export type ProjectCategory = 'Ongoing' | 'Upcoming' | 'Handed Over' | 'Ready';
export type ProjectType = 'Residential' | 'Commercial';

export interface ProjectSpec {
  orientation: string;
  frontRoad: string;
  landSize: string;
  apartmentSize: string;
  towers: string;
  numberOfApartments: string;
  numberOfParking: string;
  numberOfFloors: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  region: string;
  category: ProjectCategory;
  type: ProjectType;
  overview: string;
  progressPercent: number;
  specs: ProjectSpec;
  thumbnail: string;
  gallery: string[];
}

export const projectsMock: Project[] = [
  {
    id: '1',
    slug: 'tripax-portia',
    title: 'TRIPAX PORTIA',
    subtitle: 'Signature Architectural Masterpiece',
    location: 'Plot 20, Road 1, Gulshan 1, Dhaka',
    region: 'Gulshan 1',
    category: 'Ongoing',
    type: 'Residential',
    overview: 'A premium architectural creation rising in the heart of Gulshan. TRIPAX PORTIA offers an unbeatable neighborhood where luxury meets natural elements, providing an exclusive lifestyle for the connoisseurs of fine living.',
    progressPercent: 45,
    specs: {
      orientation: 'South Facing',
      frontRoad: '40 Feet',
      landSize: '90 Katha',
      apartmentSize: '2230 – 3000 SQFT (Approx.)',
      towers: '4',
      numberOfApartments: '144',
      numberOfParking: '220',
      numberOfFloors: 'B2+B1+G+13',
    },
    thumbnail: '/images/projects/exterior.png',
    gallery: [
      '/images/projects/exterior.png',
      '/images/projects/interior.png',
      '/images/projects/exterior.png',
      '/images/projects/interior.png'
    ]
  },
  {
    id: '2',
    slug: 'tripax-verona',
    title: 'TRIPAX VERONA',
    subtitle: 'Refined Living in the Heart of Banani',
    location: 'Banani Model Town, Dhaka',
    region: 'Banani',
    category: 'Ongoing',
    type: 'Residential',
    overview: 'TRIPAX VERONA stands as a beacon of refined living, where the elegance of Mediterranean-inspired design and the innovation of modern architecture come together to create a space that feels both aspirational and welcoming.',
    progressPercent: 60,
    specs: {
      orientation: 'North Facing',
      frontRoad: '30 Feet',
      landSize: '40 Katha',
      apartmentSize: '1800 – 2200 SQFT (Approx.)',
      towers: '2',
      numberOfApartments: '64',
      numberOfParking: '80',
      numberOfFloors: 'B1+G+9',
    },
    thumbnail: '/images/projects/interior.png',
    gallery: [
      '/images/projects/interior.png',
      '/images/projects/exterior.png'
    ]
  },
  {
    id: '3',
    slug: 'tripax-desdemona',
    title: 'TRIPAX DESDEMONA',
    subtitle: 'Commercial Excellence & Beyond',
    location: 'Baridhara Diplomatic Zone, Dhaka',
    region: 'Baridhara',
    category: 'Upcoming',
    type: 'Commercial',
    overview: 'A state-of-the-art commercial hub designed to inspire innovation and facilitate ultimate business success in Baridhara. TRIPAX DESDEMONA represents the pinnacle of executive workspace design.',
    progressPercent: 0,
    specs: {
      orientation: 'East-West',
      frontRoad: '60 Feet',
      landSize: '120 Katha',
      apartmentSize: '500 – 5000 SQFT (Open Plan)',
      towers: '1',
      numberOfApartments: 'N/A',
      numberOfParking: '400',
      numberOfFloors: 'B3+G+25',
    },
    thumbnail: '/images/projects/exterior.png',
    gallery: [
      '/images/projects/exterior.png',
      '/images/projects/interior.png'
    ]
  },
  {
    id: '4',
    slug: 'tripax-othello',
    title: 'TRIPAX OTHELLO',
    subtitle: 'Naturally Welcoming Urban Sanctuaries',
    location: 'Uttara Sector 13, Dhaka',
    region: 'Uttara',
    category: 'Ready',
    type: 'Residential',
    overview: 'Homes where modern design meets everyday living, offering spaces that are bright and naturally welcoming. TRIPAX OTHELLO is defined by its spacious layouts and connectivity to the best of Uttara.',
    progressPercent: 100,
    specs: {
      orientation: 'South Facing',
      frontRoad: '40 Feet',
      landSize: '60 Katha',
      apartmentSize: '2000 – 2500 SQFT',
      towers: '2',
      numberOfApartments: '80',
      numberOfParking: '100',
      numberOfFloors: 'B1+G+10',
    },
    thumbnail: '/images/projects/interior.png',
    gallery: [
      '/images/projects/interior.png',
      '/images/projects/exterior.png'
    ]
  }
];
