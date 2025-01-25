import React from 'react'
import { useTheme } from '../store/useTheme'
import { THEME } from '../constants'

const previewmsg = [
  {
    id: 1,
    content: 'Hello, how are you?',
    isSent: false
  },
  {
    id: 2,
    content: 'im doing great',
    isSent: true
  }
]
const Settings = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div className='h-screen w-full bg-zinc-700 p-10'>
      <div className='flex flex-col items-center  h-full w-full'>
        <h1 className='text-white text-xl uppercase'>Themes</h1>
        <div className='grid grid-cols-4 mt-10 place-items-center sm:grid-cols-6 md:grid-cols-8 gap-x-10 gap-y-5'>
          {THEME?.map((item) => (
            <div className='flex flex-col items-center gap-y-1 text-white bg-gray-900/20 rounded-lg cursor-default p-2 '>
              <button key={item} data-theme={item} className={`transition-all duration-100 ease-linear p-2  text-white rounded-xl flex items-center ${theme === item ? 'bg-base-200 ' : 'hover:bg-base-200/50'}`} onClick={() => setTheme(item)}>
                <div className='relative h-8 w-20 rounded-md overflow-hidden '>
                  <div className='absolute inset-0 grid grid-cols-4 gap-1 p-1 '>
                    <div className='bg-primary rounded '></div>
                    <div className='bg-secondary rounded '></div>
                    <div className='bg-accent rounded '></div>
                    <div className='bg-neutral rounded '></div>
                  </div>
                </div>
              </button>
              <h1>{item}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Settings