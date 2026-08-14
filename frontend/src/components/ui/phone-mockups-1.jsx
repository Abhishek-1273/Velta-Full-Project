import React from 'react'
import PhoneCarousel from './phone-mockups-1-utils/phone-carousel'

const images = [
  {
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786538474/Screenshot_20260812_174058_WhatsFlow.jpg_kjed9h.jpg',
    alt: 'WhatsFlow app',
  },
  {
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786538519/Screenshot_20260812_180225_Docket_14.jpg_nxm7zh.jpg',
    alt: 'Docket14 app',
  },
  {
    src: 'https://res.cloudinary.com/dqc1awrnc/image/upload/v1786538759/IMG-20260726-WA0025.jpg_1_uq78d1.jpg',
    alt: 'Me & Mine app',
  },
]

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={images} />
}
