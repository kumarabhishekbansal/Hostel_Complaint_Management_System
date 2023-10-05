import React from 'react'
import Header from './Header'
import Footer from './Footer'
const MainLayout = ({children}) => {
  return (
    <>
        <Header />
        {children}
        <Footer />
    </>
  )
}

export default MainLayout