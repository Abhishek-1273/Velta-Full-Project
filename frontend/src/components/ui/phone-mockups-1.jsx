import React from 'react'
import PhoneCarousel from './phone-mockups-1-utils/phone-carousel'

const images = [
  {
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1792917662/admin_whatsFlow_long.jpg_injgph.jpg',
    alt: 'WhatsFlow app',
  },
  {
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1786538519/Screenshot_20260812_180225_Docket_14.jpg_nxm7zh.jpg',
    alt: 'Docket14 app',
  },
  {
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/f_auto,q_auto/v1792863186/homepage_dlafct.png',
    alt: 'KIN Property Management app',
  },
]

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={images} />
}
