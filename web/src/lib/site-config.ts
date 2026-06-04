import { company } from './company'

export const siteConfig = {
  brandName: company.brandName,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || company.whatsappDefault || '',
}
