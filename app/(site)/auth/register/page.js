'use client'

import { useState } from "react"
import Link from "next/link"
import axios from "@/app/lib/axios"
import Auth from "@/app/hooks/auth"
import Swal from "sweetalert2"

export default function Register () {

    const [registrationForm, setRegistrationForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        contact_number: '',
        address: ''
    })
    const {authorize} = Auth()

    const submitRegistration = async (e) => {
        try {
            e.preventDefault()
            await axios.post('/api/user/register', registrationForm)
            .then(res=>{
                authorize(res.data.data)
            })
            .catch(err=>{
                console.log(err)
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleForm = e => {
        const {name, value} = e.target
        setRegistrationForm({
            ...registrationForm,
            [name]: value
        })
    }

    return (
        <main className="w-full h-full flex justify-center items-center">
            <form onSubmit={submitRegistration} className="w-full h-full flex justify-center items-center">
                <section className="w-1/3 p-6 space-y-2 bg-shadow-md">
                    <p className="text-3xl font-bold">Register</p>
                    <p className="text-sm">Already have an account? <Link href={'/auth/login'} className="text-indigo-600 hover:underline font-bold">Login</Link></p>
                    <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                        <label className="text-xs font-bold">Name</label>
                        <input 
                            type="text"
                            className="w-full outline-none text-black"
                            name="name"
                            onChange={handleForm}
                            value={registrationForm.name}
                        />
                    </div>
                    <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                        <label className="text-xs font-bold">Email</label>
                        <input 
                            type="text"
                            className="w-full outline-none text-black"
                            name="email"
                            onChange={handleForm}
                            value={registrationForm.email}
                        />
                    </div>
                    <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                        <label className="text-xs font-bold">Password</label>
                        <input 
                            type="password"
                            className="w-full outline-none text-black"
                            name="password"
                            onChange={handleForm}
                            value={registrationForm.password}
                        />
                    </div>
                    <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                        <label className="text-xs font-bold">Confirm Password</label>
                        <input 
                            type="password"
                            className="w-full outline-none text-black"
                            name="password_confirmation"
                            onChange={handleForm}
                            value={registrationForm.password_confirmation}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white"
                    >
                        register
                    </button>
                </section>
                <section className="w-1/3 p-6 space-y-2 bg-shadow-md">
                    <p className="text-xl text-gray-400 font-bold">Optional</p>
                    <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                        <label className="text-xs font-bold">Contact Number</label>
                        <input 
                            type="text"
                            className="w-full outline-none text-black"
                            name="contact_number"
                            onChange={handleForm}
                            value={registrationForm.contact_number}
                        />
                    </div>
                    <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                        <label className="text-xs font-bold">Address</label>
                        <input 
                            type="text"
                            className="w-full outline-none text-black"
                            name="address"
                            onChange={handleForm}
                            value={registrationForm.address}
                        />
                    </div>
                </section>
            </form>
        </main>
    )
}