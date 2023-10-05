import React from 'react'

const Card = ({heading,content}) => {
  return (
    <>
        <div className="border border-slate-500 col-span-4 w-50 p-10 text-center hover:bg-green-300  hover:font-bold group rounded-lg transition-all relative">
            <h2 className='text-2xl text-center group-hover:hidden'>
                {heading}
            </h2>

            <p className='text-base opacity-0 group-hover:opacity-100 group-hover:text-2xl group-hover:text-pink-900 group-odd:text-justify group-even:text-left'>
                {content}
            </p>

            <div className='absolute border-4 border-red-400 m-0 text-center right-0 opacity-0 w-10 group-hover:opacity-100'>

            </div>
        </div>
    </>
  )
}

export default Card