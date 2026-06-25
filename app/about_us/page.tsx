import React from 'react'
// import GetInTouchSection from '../contact_us/page'
import GetToKnowUs from '@/components/majors/aboutUsPageContents/GetToKnowUs'
import HomeTopbar from '@/components/topbars/HomeTopbar'
import CoreValues from '@/components/majors/aboutUsPageContents/CoreValues'

export default function AboutUs() {
  return (
      <div className='bg-gradient-to-r from-white to-[#fdf2ef]/80'>
          <HomeTopbar />
        <div className='py-22 lg:py-28 px-4 lg:px-[6rem] xl:px-[12.5rem] space-y-15'> 
              <GetToKnowUs />
              <CoreValues />
        </div>
      </div>
  )
}
