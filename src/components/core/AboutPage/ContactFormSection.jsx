import React from 'react'
import ContactUsForm from '../../core/ContactPage/ContactUsForm'


const ContactFormSection = ({text, desc}) => {
  return (
    <div className='mx-auto'>
        <h1 className='text-center text-4xl font-semibold text-richblack-5'>
            {text}
        </h1>

        <p className='mx-auto text-center text-richblack-300 mt-3'>
            {desc}
        </p>
        
        <div className='mt-12 mx-auto'>
            <ContactUsForm/>
        </div>

    </div>
  )
}

export default ContactFormSection