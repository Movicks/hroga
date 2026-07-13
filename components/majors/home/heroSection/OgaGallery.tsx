import Image from "next/image";

export default function OgaGallery() {
  return (
    <div className="relative flex h-[22rem] md:h-[28rem] w-full items-center justify-center top-[-1rem]">
        {/* Center Circle */}
        <div className="relative md:left-[-2rem] z-10 flex h-[10rem] md:h-[14rem] w-[14rem] items-center justify-center rounded-full rotate-[5deg] border-9 border-[#020D39] bg-white">
            {/* LEFT STACK */}
            <div className="absolute right-[46%] top-1/2 -translate-y-1/2 rotate-[-5deg]">
                <div className="flex flex-col gap-4 lg:gap-6">
                    {/* Image 1 */}
                    <div className="h-40 w-40 md:h-54 md:w-44 rounded-md border-2 border-white bg-white overflow-hidden">
                      <Image src='https://plus.unsplash.com/premium_photo-1675034812055-2d5dc0b9dbaa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXAlMjBibGFjayUyMHdvbWVufGVufDB8fDB8fHww' alt='OGA 1' width={100} height={100} className="w-full h-full bg-cover"/>
                    </div>
                    {/* Card */}
                    <div className="h-32 w-40 md:h-44 md:w-44 rounded-md bg-blue-400 shadow-lg">
                        <div className='h-full'>
                            <div className='w-full h-full rounded-[5px] bg-[#061977FF]/30 px-1 py-3 right-[2rem] top-[2rem] md:right-[5rem] md:top-[2rem] text-center'>
                                <div className='w-full h-full border-2 border-gray-300 rounded-md bg-primary/70 flex flex-col justify-center'>
                                    <span className='md:text-3xl font-serif text-gray-100'>OGA</span>
                                    <span className='text-gray-200 text-[15px] md:text-md'>EST. 1968.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT STACK */}
            <div className="absolute left-[47%] top-1/2 -translate-y-1/2 rotate-[-5deg]">
                <div className="flex flex-col gap-4 lg:gap-6 pt-29">
                    {/* Image 2 */}
                    <div className="h-32 w-40 md:h-45 md:w-44 rounded-md border-2 border-white bg-white overflow-hidden">
                      <Image src='https://plus.unsplash.com/premium_photo-1675034812055-2d5dc0b9dbaa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXAlMjBibGFjayUyMHdvbWVufGVufDB8fDB8fHww' alt='OGA 1' width={100} height={100} className="w-full h-full bg-cover"/>
                    </div>
                    {/* Image 3 */}
                    <div className="h-40 w-40 md:h-54 md:w-44 rounded-md border-2 border-white bg-white overflow-hidden">
                      <Image src='https://plus.unsplash.com/premium_photo-1675034812055-2d5dc0b9dbaa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXAlMjBibGFjayUyMHdvbWVufGVufDB8fDB8fHww' alt='OGA 1' width={100} height={100} className="w-full h-full bg-cover"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}