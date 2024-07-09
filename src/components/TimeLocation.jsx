import React from 'react'

const TimeLocation = ({
  weather:{formattedToLocalTime, name, country}
}) => {
  return (
    <div className='flex flex-col items-center gap-5 mt-5'>
        <div className='text-lg font-light'>
            <p>
                {formattedToLocalTime}
            </p>
        </div>
        <div className='text-xl font-medium'>
            <p>{`${name}, ${country}`}</p>
        </div>
    </div>
  )
}

export default TimeLocation