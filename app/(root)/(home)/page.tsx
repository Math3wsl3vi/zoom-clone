import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {

  const now = new Date();

  const time = now.toLocaleString('en-Us',{hour:'2-digit',minute:'2-digit'});
  const date = (new Intl.DateTimeFormat('en-Us',{dateStyle: 'full'})).format(now)
  return (
    <section className='flex size-full flex-col text-white gap-10'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full justify-between flex-col max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming meeting at: 10:00 AM</h2>
          <div className='flex flex-col ga-2'>
            <h1 className='lg:text-7xl font-extrabold text-4xl'>{time}</h1>
            <p className='text-lg text-sky-1 lg:text-4xl font-medium'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  )
}

export default Home