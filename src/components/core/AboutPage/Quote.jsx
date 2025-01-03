import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-xl md:text-4xl font-semibold py-5 pb-20 mx-auto text-white text-center'>
      <span className='text-richblack-600 text-3xl font-bold '>"</span>  We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={" combines technology "}/>, <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>expertise</span>, and community to create an 
        <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold'> unparalleled educational experience.</span> <span className='text-richblack-600 text-3xl font-bold '>"</span>
    </div>
  )
}

export default Quote