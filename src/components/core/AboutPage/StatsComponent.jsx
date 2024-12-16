import React from 'react'


const stats = [
  {
    count : "5K", label : "Active Students"
  },
  {
    count : "10+", label : "Mentors"
  },
  {
    count : "200+", label : "Courses"
  },
  {
    count : "50+", label : "Awards"
  }
]

const StatsComponent = () => {
  return (
    <section className='bg-richblack-700'>

      <div className='flex flex-col w-11/12 max-w-maxContent mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-4 text-center'>
            {
              stats.map((stat, index) => (
                <div key={index} className='py-10 flex flex-col' >
                  <h1 className='text-[30px] font-bold text-richblack-5'>{stat.count}</h1>
                  <h2 className='font-semibold text-[16px] text-richblack-500'>{stat.label}</h2>
                </div>
              ))
            }

        </div>
      </div>

    </section>
  )
}

export default StatsComponent