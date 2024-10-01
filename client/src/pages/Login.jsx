import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UseLogin from '../hooks/UseLogin'
import { Loader } from 'lucide-react'


const Login = () => {

    const [inputValue, setinputValue] = useState({
        username: '',
        password: ''
    })
    const { loading, login } = UseLogin()

    const handleOnchange = (e) => {
        const { name, value } = e.target
        setinputValue((prev) => ({
            ...prev,
            [name]: value
        }))

    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        await login(inputValue)


    }
 
    return (
        <div className='w-full h-screen   p-14 flex  justify-center items-center ' style={{ backgroundImage: 'url(bg2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className='h-96 min-w-96 bg-white-300 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20  flex flex-col justify-center items-center shadow-2xl shadow-black'>
                <h1 className='capitalize text-2xl font-semibold text-white pb-5' >Login <span className='text-info'>ChatApp</span></h1>
                <form className='flex flex-col ' onSubmit={handleOnSubmit}>
                    <div>

                        <label className='label p-2' ><span className='text-base label-text capitalize text-black font-medium'>
                            username</span></label>
                        <input type="text" placeholder="johndeo123" value={inputValue.username} onChange={handleOnchange} name='username' className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>

                        <label className='label p-2' ><span className='text-base label-text capitalize text-black font-medium'>
                            Password</span></label>
                        <input type="password" placeholder="password" value={inputValue.password} onChange={handleOnchange} name='password' className="input input-bordered w-full max-w-xs" />
                    </div>
                    <Link to='/signup' className='hover:underline hover:text-primary mt-2'>
                        Don't have an account?
                    </Link>
                    <div className='' type='submit'>
                        <button className="btn btn-sm btn-block btn-info mt-2" disabled={loading}>{loading ? <Loader className='animate-spin' /> : 'login'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login



//starter code 
{/* <div className='min-w-96 flex flex-col justify-center items-center rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 shadow-xl shadow-black/50  p-14 '>
<h1 className='capitalize text-2xl font-semibold text-neutral pb-5'>Login <span className='text-info'>ChatApp</span></h1>
<form className='flex flex-col '>
    <div>

        <label className='label p-2' ><span className='text-base label-text capitalize text-black font-medium'>
            username</span></label>
        <input type="text" placeholder="johndeo123" className="input input-bordered w-full max-w-xs" />
    </div>
    <div>

        <label className='label p-2' ><span className='text-base label-text capitalize text-black font-medium'>
            Password</span></label>
        <input type="text" placeholder="password" className="input input-bordered w-full max-w-xs" />
    </div>
    <a href="" className='hover:underline hover:text-primary mt-2'>
        Don't have an account?
    </a>
    <div className=''>
        <button className="btn btn-sm btn-block btn-info mt-2">Login</button>
    </div>
</form>
</div> */}