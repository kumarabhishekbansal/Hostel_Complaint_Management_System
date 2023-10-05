import React from 'react'
const Cards = ({header,content,children}) => {
  return (
    <>
        <div className="flex gap-4 ">
            <div className="md:text-3xl text-xl rounded-full border-2 p-4 bg-slate-50">
                {children}
            </div>
            <div className="flex flex-col">
                    <h2 className='text-xl font-bold'>{header}</h2>
                    <p className='text-base text-dark-hard'>{content}</p>
            </div>
        </div>
    </>
  )
}

export default Cards