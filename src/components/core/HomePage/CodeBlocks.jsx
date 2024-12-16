import React from 'react'
import CTAButton from "./Button"
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position, heading, subheading, 
      ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
    }) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>

      {/* Section-1 -> PARAGRAPHS */}

      <div className='w-[50%] flec flex-col gap-8'>
        
        {heading}

        <div className='text-richblack-300 font-bold'>
          {subheading}
        </div>

        <div className='flex gap-7 mt-7'>
          <CTAButton active ={ctabtn1.active} 
          linkto={ctabtn1.linkto}>
              <div className='flex gap-2 items-center'>
                {ctabtn1.btnText}
                <FaArrowRight/>
              </div>
          </CTAButton>

          <CTAButton active ={ctabtn2.active} linkto={ctabtn2.linkto}>
              
                {ctabtn2.btnText}
                
          </CTAButton>

        </div>

      </div>

      {/* Section-2 -> ANIMATIONS */}
      <div className='h-fit flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] border relative z-0'>
        
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
           <TypeAnimation
              sequence = {[codeblock, 2000, ""]}
              repeat = {Infinity}
              cursor = {true}
              omitDeletionAnimation = {true}
              style = {
                {
                  whiteSpace : "pre-line", //This property controls how white spaces and newlines are handled within the text content of the element.
                  display : "block" 
                  //block means that the element will be rendered as a block-level element, meaning:--->
                  // It will take up the full width of its container (by default).
                  // It will be stacked vertically with any other block-level elements.
                  // Any other content after it will be placed on a new line
                }
              }
           />
        </div>

        <div className={`z-[-1] absolute`}
        style={backgroundGradient}
        ></div>

      </div>

    </div>
  )
}

export default CodeBlocks