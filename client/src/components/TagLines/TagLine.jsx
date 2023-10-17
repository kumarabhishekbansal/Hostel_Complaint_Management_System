import React from 'react'

const TagLine = ({heading}) => {
  return (
    <h2 className='text-3xl text-center text-dark-soft mt-5 font-bold uppercase border-b-4 border-b-slate-500 lg:w-1/4 md:w-1/2 w-full mx-auto p-4'>{heading}</h2>
  )
}

export default TagLine