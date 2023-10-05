import React from 'react'
import BorderLine from '../../../helper/BorderLine'
import { benefitsdata } from '../../../helper/benefitscards/benefitdata'
import Card from "../../../components/cards/Card"
const Benefits = () => {
  // console.log(benefitsdata);
  return (
    <section className='container mx-auto flex flex-col mt-10 overflow-x-hidden justify-center items-center h-1/2'>
        <BorderLine header={"Our Benefits"}/>
        <div className='grid grid-cols-4 md:grid-cols-12 gap-x-9 mx-4 mt-[100px] md:mt-10 gap-y-9'>
        {benefitsdata && benefitsdata.map((item)=>(
          <Card heading={item.header} content={item.content}/>
        ))}
        </div>

    </section>
  )
}

export default Benefits