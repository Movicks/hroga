import React from 'react'
// import GetInTouchSection from '../contact_us/page'
import GetToKnowUs from '@/components/majors/aboutUsPageContents/GetToKnowUs'
import HomeTopbar from '@/components/topbars/HomeTopbar'
import CoreValues from '@/components/majors/aboutUsPageContents/CoreValues'
import PresidentSection from '@/components/majors/aboutUsPageContents/PresidentSection'

export default function AboutUs() {
  return (
      <div className='bg-gradient-to-r from-white to-[#fdf2ef]/80'>
          <HomeTopbar />
        <div className='py-22 lg:py-28 space-y-1 md:space-y-15 bg-gradient-to-r from-[#efe9f5]/70 to-[#f7f7f7]/70'> 
              <GetToKnowUs />
              <CoreValues />
              <PresidentSection/>
        </div>
      </div>
  )
}
