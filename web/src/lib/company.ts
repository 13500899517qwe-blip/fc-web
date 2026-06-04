/** Company facts from http://fengchengcar.en.alibaba.com */
export const company = {
  legalName: 'Changzhou Fengcheng Import And Export Co., Ltd.',
  legalNameZh: '常州丰成进出口有限公司',
  brandName: 'Fengcheng Auto Parts',
  brandShort: 'Fengcheng',
  tagline: 'Custom auto body parts & modified lights for global B2B buyers',
  alibabaStoreUrl: 'http://fengchengcar.en.alibaba.com',
  location: 'Jiangsu Province, China',
  businessType: 'Custom Manufacturer',
  floorspace: '23,575㎡',
  storeRating: '4.8/5',
  onTimeDelivery: '92.9%',
  responseTime: '≤4h',
  mainCategories: 'Car Bumper, Car Body Kit, Car Hoods, Car Grille, Modified Lights',
  aboutEn: `Changzhou Fengcheng Import and Export Co., Ltd. is a custom manufacturer of aftermarket auto body parts and modified lighting. Our product range covers bumpers, body kits, hoods, grilles, fenders, doors, tailgates, headlights, and tail lights for major vehicle brands including Toyota, Jeep, Hyundai, Nissan, Isuzu, Mercedes-Benz, and more.

We support OEM, ODM, and agency cooperation, with minor customization, drawing-based customization, finished product inspection, and raw material traceability. Our Alibaba store rating is 4.8/5 with 92.9% on-time delivery.`,
  contactEmail: process.env.INQUIRY_TO_EMAIL || 'Contact via inquiry form',
  whatsappDefault: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
} as const
