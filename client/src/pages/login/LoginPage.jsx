import React from 'react'
import Login from './container/LoginModalPortal'

const LoginPage = ({isvisible,login,onclose}) => {
  // console.log("LoginPage : ",{login});
  return (
    <section className='container mx-auto flex flex-col justify-center items-center'>
        <Login showmodals={isvisible} Login={login} onclose={onclose}/>
    </section>
  )
}

export default LoginPage