import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className='flex size-full flex-col text-white gap-10'>
    <h1 className='text-3xl font-bold'>Upcoming</h1>
    <CallList type='upcoming'/>
</section>
  )
}

export default Upcoming