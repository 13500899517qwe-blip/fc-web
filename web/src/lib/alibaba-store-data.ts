import productsData from '../../public/data/alibaba-products.json'

/** Scraped from http://fengchengcar.en.alibaba.com — store layout reference */
export const alibabaStore = {
  logoUrl: 'https://sc02.alicdn.com/kf/Hda4960d73f204d998fc0e588d855d303O.jpg',
  banners: [
    'https://s.alicdn.com/@sc02/kf/Hc533bcdbef854da6a792e8633c862c3dZ.jpg',
    'https://s.alicdn.com/@sc02/kf/H212cfd4435b7464b8ec7db1ef296e7a54.jpg',
    'https://s.alicdn.com/@sc02/kf/H67ddc8a8bc1e4c3eaf23e0dc5b3910738.jpg',
    'https://s.alicdn.com/@sc02/kf/Hac17dcfcf7b841cbb6d3aa18d14bcab0h.jpg',
    'https://s.alicdn.com/@sc02/kf/H97234f5a94224fadae1115cff4c2d6daq.jpg',
  ],
  companyVideoPoster: 'https://sc04.alicdn.com/kf/Hdb88bace5ccc42088a116de6e1fff4f6F/285374136/Hdb88bace5ccc42088a116de6e1fff4f6F.jpg',
  profileImages: [
    'https://sc04.alicdn.com/kf/H4b306c616b3546529bbd5b15dd34b9db3.jpg',
    'https://sc04.alicdn.com/kf/Hdf380accc7b84bdb91deb03464a3911cJ.jpg',
    'https://sc04.alicdn.com/kf/H027430db27a24dffb58a03c7202742f0H.jpg',
    'https://sc04.alicdn.com/kf/Hfa923634055f41eda6b25a94e30c55f79.jpg',
  ],
  metrics: {
    storeRating: '4.8/5',
    onTimeDelivery: '92.9%',
    responseTime: '≤4h',
    onlineRevenue: 'US$10,000+',
    floorspace: '23,575㎡',
  },
  badges: ['Custom Manufacturer', '1yr', 'SGS Verified', 'Trade Assurance'],
  services: [
    'Minor customization',
    'Drawing-based customization',
    'Quality control',
    'Raw material identification and traceability',
    'Finished product inspection',
  ],
  highlights: [
    '#7 fastest response time in Car Doors',
    'Sample-based customization',
    'Total floorspace (23,575㎡)',
    'Testing instruments (9)',
    'Finished product inspection',
  ],
  companyIntro:
    'Our products cover 98% of vehicle models. We offer a variety of cooperation formats, including OEM, ODM, and agency cooperation, and we also provide new product joint development services.',
  companyFacts: {
    founded: '2025',
    employees: '101-200',
    mainMarkets: 'North America, Western Europe, Mid East, Southeast Asia',
    mainProducts: 'Car Bumper, Car Body Kit, Car Hoods, Car Grille, Modified Lights',
    verification: 'Supplier Assessment · Onsite Check',
  },
  /** Top product groups from Alibaba store nav */
  productGroups: [
    { label: 'For Mitsubishi', brand: 'Mitsubishi' },
    { label: 'For Toyota', brand: 'Toyota' },
    { label: 'For Jeep', brand: 'Jeep' },
    { label: 'For Mazda', brand: 'Mazda' },
    { label: 'For Hyundai', brand: 'Hyundai' },
    { label: 'For Mercedes-Benz', brand: 'Mercedes-Benz' },
    { label: 'For Nissan', brand: 'Nissan' },
    { label: 'For Isuzu', brand: 'Isuzu' },
    { label: 'For Honda', brand: 'Honda' },
    { label: 'For Ford', brand: 'Ford' },
    { label: 'For BMW', brand: 'BMW' },
    { label: 'For Kia', brand: 'Kia' },
  ],
} as const

export const alibabaCompany = productsData.company

/** Product price hints scraped from Alibaba listings (USD range + MOQ) */
export const alibabaPriceHints: Record<string, { price: string; moq: string }> = {
  '1601777844941': { price: '$50-60', moq: 'Min. Order 5 pieces' },
  '1601770335214': { price: '$110-130', moq: 'Min. Order 1 piece' },
  '1601770277995': { price: '$100-120', moq: 'Min. Order 1 piece' },
  '1601777848553': { price: '$50-60', moq: 'Min. Order 10 pieces' },
  '1601783962423': { price: '$50-60', moq: 'Min. Order 1 piece' },
  '1601780046835': { price: '$70-90', moq: 'Min. Order 1 piece' },
  '1601780071807': { price: '$90-100', moq: 'Min. Order 1 piece' },
  '1601780104695': { price: '$70-80', moq: 'Min. Order 1 piece' },
}

export function getPriceHint(sku: string) {
  const id = sku.replace(/^ALI-/, '')
  return alibabaPriceHints[id] ?? { price: 'Contact for price', moq: 'Min. Order negotiable' }
}
