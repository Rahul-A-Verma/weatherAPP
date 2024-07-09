import React from 'react'

const ForeCast = ({
    weather:{
        description,
    },
    title,
    data,
}) => {
   
  return (
    <div className='flex flex-col my-10'>
        <div>
            <p className='text-xl mx-4 font-medium'>{title}</p>
        </div>
        <hr className='mx-3'/>

        <div className='flex justify-center mt-2 flex-wrap '>
            {data.map((d, index)=>(
                <div className='m-2 flex flex-col items-center
                bg-blue-300 rounded-lg px-6 py-2 transition duration-500 shadow-2xl
           hover:scale-105' key={index} >
                    <p >{d.title}</p>
                    <img src={d.icon} alt='Icon' className='w-12'/>
                    <h5 className='font-light'>{description}</h5>
                    <p >{`${d.temp.toFixed()}°`}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ForeCast