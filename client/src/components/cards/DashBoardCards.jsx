import React from 'react'
import { Link } from 'react-router-dom'

const DashBoardCards = ({image,alt,content,link,linkcontent,icon}) => {
  return (
    <div className='flex flex-col gap-y-6 w-1/2 md:w-1/3 lg:w-1/4 justify-center items-center  p-3 bg-blue-500 shadow-lg shadow-blue-500/50 mb-4'>
        <div className='w-full bg-cover'>
            <img src={image} alt={alt} className='w-full h-64 object-cover rounded-md'/>
        </div>
        <div>
            <h2>
                {content}
            </h2>
        </div>
        <div className='text-white relative border-4 border-green-400 w-full md:w-1/2 text-center p-3 rounded-full'>
            <Link to={link}>
            {linkcontent}
            </Link>
            <div className="absolute top-4 left-4">{icon}</div>
        </div>
    </div>
  )
}

export default DashBoardCards