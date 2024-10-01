
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UseSignUp from '../hooks/UseSignUp.js'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'


const Signup = () => {
    const [InputValue, setInputValue] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmpassword: "",
        gender: ""
    })

    const { Loading, signUp } = UseSignUp()

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }
    const handleOnsubmit = async (e) => {
        e.preventDefault();
        const data = await signUp(InputValue);
        if (data) {
            setInputValue('')

        }
        return;

    };
    return (
        <div className='w-full h-screen p-14 flex  justify-center items-center ' style={{ backgroundImage: 'url(bg2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <div className='min-h-96 min-w-96  bg-white-300 py-8 rounded-3xl bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-20  flex flex-col justify-center items-center shadow-2xl shadow-black '>
                <h1 className='capitalize text-2xl font-semibold text-white pb-5'>Signup <span className='text-info'>ChatApp</span></h1>
                <form className='flex flex-col ' onSubmit={handleOnsubmit}>
                    <div>
                        <label className='label p-2' ><span className='text-base label-text capitalize text-zinc-300 font-medium'>
                            fullname</span></label>
                        <input type="text" placeholder="john deo" value={InputValue.fullname} onChange={handleOnchange} name='fullname' className="input input-md input-bordered w-full max-w-xs" />
                    </div>

                    <div>

                        <label className='label p-2' ><span className='text-base label-text capitalize text-zinc-300 font-medium'>
                            username</span></label>
                        <input type="text" placeholder="johndeo123" value={InputValue.username} onChange={handleOnchange} name='username' className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className='mt-2'>
                        <label className='label p-2'>
                            <span className='text-base label-text capitalize text-zinc-300 font-medium'>gender</span>
                        </label>
                        <div className='flex items-center gap-x-4' >
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={InputValue.gender === 'male'}
                                onChange={handleOnchange}
                                className="radio radio-primary"
                            />
                            <span className='text-zinc-300'>male</span>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={InputValue.gender === 'female'}
                                onChange={handleOnchange}
                                className="radio radio-primary"
                            />
                            <span className='text-zinc-300'>female</span>
                        </div>
                    </div>
                    <div>

                        <label className='label p-2 mt-2' ><span className='text-base label-text capitalize text-zinc-300 font-medium'>
                            password</span></label>
                        <input type="password" placeholder="password" value={InputValue.password} onChange={handleOnchange} name='password' className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>

                        <label className='label p-2 mt-2' ><span className='text-base label-text capitalize text-zinc-300 font-medium'>
                            confirm password</span></label>
                        <input type="password" placeholder="password" value={InputValue.confirmpassword} onChange={handleOnchange} name='confirmpassword' className="input input-bordered w-full max-w-xs" />
                    </div>

                    <Link to='/login' className='hover:underline hover:text-primary mt-2'>
                        Don't have an account?
                    </Link>

                    <div className='' >
                        <button className="btn btn-sm btn-block btn-info mt-2" type='submit' disabled={Loading}>{Loading ? <Loader className='animate-spin' /> : 'signup'}</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup