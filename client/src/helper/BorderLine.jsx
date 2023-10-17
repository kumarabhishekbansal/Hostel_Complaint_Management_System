import React from 'react'

const BorderLine = ({header}) => {
  return (
    <>
        <div className='grid grid-cols-12 text-center gap-x-9 gap-y-9'>
            <div className='col-span-5 border-b-8 border-y-black w-100'/>
            <div className={`col-span-2 text-center text-2xl mt-2 gap-2 relative translate-y-5 ${header==="Your Services"?"text-white":"text-center"}`}>
            {header}
            </div>
            <div className='col-span-5 border-b-8 border-y-black w-100'/>
        </div>
    </>
  )
}

export default BorderLine