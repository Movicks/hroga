// import React from 'react'
interface loadingProps {
    loadTitle: string
}

export default function Loader({loadTitle}: loadingProps) {
  return (
    <section className="h-screen px-4 py-14 lg:px-[5rem] xl:px-[13rem] flex flex-col items-center justify-center gap-4">
        <div className="loading-spinner !w-[5rem] h-[3rem]"/>
        <div className="text-center text-gray-500 text-xl">{loadTitle}...</div>
    </section>
  )
}
