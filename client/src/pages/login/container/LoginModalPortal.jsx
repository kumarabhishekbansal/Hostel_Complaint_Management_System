import React from 'react'
import LoginForm from './LoginForm';

const Login = ({showmodals,Login,onclose}) => {

  if(!showmodals) return null;

  const handleclose=(e)=>{
    if(e.target.id==='wrapper') onclose();
  }
  return (
    <>
        <div className='absolute inset-0 backdrop-blur-sm flex justify-center items-center text-center bg-opacity-25' id='wrapper' onClick={handleclose}>
          <div className='md:w-[600px] w-[90%] mx-auto flex flex-col'>
          <button className='text-white text-xl place-self-end' onClick={()=>onclose()}>
            X
          </button>
          <LoginForm login={Login}/>
          </div>
            
        </div>
    </>
  )
}

export default Login