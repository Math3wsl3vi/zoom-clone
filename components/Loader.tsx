import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex-center h-screen w-full'>
        <Image src='/icons/loading-circle.svg' 
        alt='loader'
        width={30}
        height={30}
        />
    </div>
  )
}

export default Loader