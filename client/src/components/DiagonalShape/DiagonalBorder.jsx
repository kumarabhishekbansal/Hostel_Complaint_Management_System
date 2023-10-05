import React from 'react'

const DiagonalBorder = ({header}) => {
  return (
    <>
        <div className='grid grid-cols-12 text-center gap-x-2 w-full group'>
            <div className='col-span-5 border-b-8 border-y-black w-full'/>
            <div className='col-span-2 text-center md:text-2xl  border-4 border-black p-4 relative translate-y-5 md:-rotate-12 bg-dark-soft text-slate-200 group-hover:rotate-0 transition ease-in-out delay-150'>
                {header}
            </div>
            <div className='col-span-5 border-b-8 border-y-black w-full'/>
        </div>
    </>
  )
}

export default DiagonalBorder;