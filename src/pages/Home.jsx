import React from 'react'
import Hero from "../components/Hero.jsx"
import CategoryShowcase from "../components/CategoryShowcase.jsx"
import HotDeals from "../components/HotDeals.jsx"

// The landing page is just the three big blocks stacked together.

export default function Home() {
  return (
    <div className=''>
      
      <Hero />
      <CategoryShowcase />
      <HotDeals />

    </div>
  )
}
