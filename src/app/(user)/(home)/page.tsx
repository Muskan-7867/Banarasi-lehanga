import React from 'react'
import  Header  from '../../../components/user/home/components/Header'
import Navbar from '@/components/user/home/components/Navbar'
import SecondNavbar from '@/components/user/home/components/SecondNavbar'
import Banner from '@/components/user/home/components/Banner'
import Features from '@/components/user/home/components/Features'
import Products from '@/components/user/home/components/Products'

export default function Homepage() {
  return (
    <div className=' w-full min-h-screen flex flex-col'>
   <Header />
   <Navbar/>
   <SecondNavbar />
   <Banner />
   <Features />
   <Products />
    </div>
  )
}
