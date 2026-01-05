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
    <div className='h-screen w-full bg-gray-50 p-10 flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center  h-full w-full max-w-4xl'>
        <h1 className='text-gray-900 text-3xl font-bold tracking-tight mb-2 uppercase'>Theme Selection</h1>
        <p className="text-gray-500 mb-10 text-center">Customize your experience</p>
        <div className='grid grid-cols-2 mt-2 place-items-center sm:grid-cols-4 md:grid-cols-6 gap-6 w-full'>
          {THEME?.map((item) => (
            <div className='flex flex-col items-center gap-y-3 text-gray-900 bg-white border border-gray-200 rounded-xl p-4 w-full transition-all hover:scale-105 hover:shadow-lg'>
              <button key={item} data-theme={item} className={`transition-all duration-200 ease-out p-2 w-full text-gray-900 rounded-lg flex items-center justify-center ${theme === item ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`} onClick={() => setTheme(item)}>
                <div className='relative h-10 w-full rounded overflow-hidden '>
                  <div className='absolute inset-0 grid grid-cols-4 gap-1 p-1 '>
                    <div className='bg-primary rounded-sm '></div>
                    <div className='bg-secondary rounded-sm '></div>
                    <div className='bg-accent rounded-sm '></div>
                    <div className='bg-neutral rounded-sm '></div>
                  </div>
                </div>
              </button>
              <h1 className="capitalize font-medium text-sm">{item}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Settings