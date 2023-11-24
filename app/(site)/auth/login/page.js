'use client';

import Link from "next/link";
import { Suspense, useState } from "react";
import Loading from "../../../loading";
import axios from "@/app/lib/axios";
import Swal from "sweetalert2";
import { csrf } from "@/app/hooks/csrf";
import Auth from "@/app/hooks/auth";

export default function Login () {

    const [userForm, setUserForm] = useState({
        email: '',
        password: ''
    })

    const {authorize} = Auth()

    const submitLogin = async (e) => {
        try {
            e.preventDefault()
            await csrf()
            await axios.post('/api/user/login', userForm)
            .then(res=>{
                authorize(res.data.data)
            })
            .catch(err=>{
                Swal.fire(err.response.data.message)
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleForm = e => {
        const {name, value} = e.target
        setUserForm({
            ...userForm,
            [name]: value
        })
    }

    return (
        <main className="w-full h-full relative">
            {/* <Suspense fallback={<Loading />}> */}
                <form onSubmit={submitLogin} className="w-full h-full flex justify-center items-center">
                    <section className="w-full md:w-1/3 p-6 space-y-2 bg-shadow-md">
                        <p className="text-3xl font-bold">Login</p>
                        <p className="text-sm">Don't have an account? <Link href={'/auth/register'} className="text-indigo-600 hover:underline font-bold">Register</Link></p>
                        <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                            <label className="text-xs font-bold">Email</label>
                            <input 
                                type="text"
                                className="w-full outline-none text-black"
                                name="email"
                                onChange={handleForm}
                                value={userForm.email}
                                required
                            />
                        </div>
                        <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                            <label className="text-xs font-bold">Password</label>
                            <input 
                                type="password"
                                className="w-full outline-none text-black"
                                name="password"
                                onChange={handleForm}
                                value={userForm.password}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-3 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white"
                        >
                            login
                        </button>
                    </section>
                </form>
            {/* </Suspense> */}
        </main>
    )
}