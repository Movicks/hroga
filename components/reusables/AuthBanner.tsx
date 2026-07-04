// import React from 'react'

import ItalicTitle from "./ItalicTitle";
import SectionHeading from "./SectionHeading";

export default function AuthBanner() {
  return (
      <section className="max-w-5xl mx-auto w-full">
          <div className="w-full h-[11rem] md:h-[13rem] bg-primary rounded-2xl overflow-hidden">
            <div className='relative flex items-center justify-end h-[100%] w-full'>
              <div className='w-[25%] min-h-full flex items-start justify-end'>
                <div className=''>
                  <div className='w-[9rem] h-[9rem] md:w-[15rem] md:h-[15rem] bg-[#E3EFFC]/50 rounded-full top-[-3rem] right-[-3rem] md:top-[-6rem] md:right-[-3rem] absolute' />
                  <div className='absolute w-[6rem] h-[6rem] md:w-[9rem] md:h-[8.5rem] rounded-[5px] bg-[#061977FF]/60 px-1 py-2 right-[2rem] top-[2rem] md:right-[5rem] md:top-[2rem] text-center'>
                    <div className='w-full h-full border-2 border-gray-300 rounded-md bg-primary/40 flex flex-col justify-center'>
                      <span className='md:text-2xl font-serif text-[#061977FF]'>OGA</span>
                      <span className='text-gray-300 text-[10px] md:text-sm'>EST. 1968.</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* body contents */}
              <div className='absolute left-0 top-0 w-full h-full bg-blue-900/20 px-5 py-5 lg:px-15 lg:py-9'>
                <SectionHeading title="HOLY ROSARY OLD GIRLS ASSOCIATION" className="text-xs md:text-[15px] mb-0 md:mb-2 text-gray-300" />
                <h1 className="mb-2 text-[1.8rem] leading-[1] tracking-[-0.05em] text-white sm:text-[3.25rem] lg:text-[36px]">
                  Join the{" "}
                  <ItalicTitle
                    title="Sisterhood"
                    colorClass="text-[1.8rem] leading-[1] tracking-[-0.05em] text-[#061977FF] sm:text-[3.25rem] lg:text-[36px]"
                  />
                </h1>
                <p className='max-w-[37rem] text-xs md:text-[16px] text-gray-300 md:mt-4'>
                  Register to reconnect with your classmates, celebrate every milestone,
                  and be part of a community that lasts a lifetime.
                  Once a daugther of Holy Rosary, always a daugther.
                </p>
              </div>
            </div>
          </div>
    </section>
  )
}
