'use client'

import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import CustomerTop from "@/app/components/navigation/customerTop"
import Side from "@/app/components/navigation/side"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import jwt from "jsonwebtoken"
import { PiGearFineFill } from "react-icons/pi";
import Auth from "@/app/hooks/auth"

export default function Profile () {

    const [user, setUser] = useState({
        name: '',
        email: '',
        contact_number: '',
        address: ''
    })
    const [passwords, setPasswords] = useState({
        password: '',
        new_password: '',
        password_confirmation: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const {update} = Auth()

    useEffect(()=>{
        if (typeof(window) !== 'undefined' && localStorage) {
            getUser()
        }
    }, [])

    function getUser() {
        const token = localStorage.getItem('user_token')
        const decoded = jwt.decode(token, {complete: true})
        setUser(decoded?.payload)
    }

    const handleUser = e => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handlePassword = e => {
        const {name, value} = e.target
        setPasswords({
            ...passwords,
            [name]: value
        })
    }

    const submitUserAccount = async () => {
        try {
            if (!passwords.password) {
                Swal.fire({
                    title: 'Error',
                    text: 'Please enter your Current Password to save the changes',
                    icon: 'error'
                })
            } else {
                setIsLoading(true)
                await csrf()
                await axios.post('/api/user/account/update', {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: passwords.password,
                    new_password: passwords.new_password,
                    password_confirmation: passwords.password_confirmation
                })
                .then(res=>{
                    setPasswords({
                        password: '',
                        new_password: '',
                        password_confirmation: ''
                    })
                    update(res.data.data, getUser)
                    Swal.fire(res.data.message)
                    setIsLoading(false)
                })
                .catch(err=>{
                    console.log(err)
                    Swal.fire(err.response.data.message)
                    setIsLoading(false)
                })
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const submitUserInfo = async () => {
        try {
            setIsLoading(true)
            await csrf()
            await axios.post('/api/user/information/update', user)
            .then(res=>{
                update(res.data.data, getUser)
                Swal.fire(res.data.message)
                setIsLoading(false)
            })
            .catch(err=>{
                console.log(err)
                Swal.fire(err.response.data.message)
                setIsLoading(false)
            })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <>
            {
                user?.role === 'admin' ?
                (
                    <>
                        <AdminTopNav />
                        <AdminNav />
                    </>
                )
                :
                (
                    <>
                        <CustomerTop />
                        <Side />
                    </>
                )
            }
            {
                isLoading && 
                <section className="w-full h-full relative z-50 bg-slate-900/90 flex justify-center items-center">
                    <PiGearFineFill className="text-white w-10 h-10 animate-spin" />
                </section>
            }
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <p className="text-3xl font-bold">Profile</p>
                <section className="flex gap-2">
                    <section className="w-full border border-slate-900 rounded-lg shadow-md p-6 mt-10 space-y-2">
                        <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                            <label className="text-xs font-bold">Name</label>
                            <input 
                                type="text"
                                className="w-full outline-none text-black"
                                name="name"
                                onChange={handleUser}
                                value={user?.name}
                            />
                        </div>
                        <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                            <label className="text-xs font-bold">Email</label>
                            <input 
                                type="text"
                                className="w-full outline-none text-black"
                                name="email"
                                onChange={handleUser}
                                value={user?.email}
                            />
                        </div>
                        <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                            <label className="text-xs font-bold">Current Password</label>
                            <input 
                                type="password"
                                className="w-full outline-none text-black"
                                name="password"
                                onChange={handlePassword}
                                value={passwords.password}
                            />
                        </div>
                        <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                            <label className="text-xs font-bold">New Password</label>
                            <input 
                                type="password"
                                className="w-full outline-none text-black"
                                name="new_password"
                                onChange={handlePassword}
                                value={passwords.new_password}
                            />
                        </div>
                        <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                            <label className="text-xs font-bold">Confirm Password</label>
                            <input 
                                type="password"
                                className="w-full outline-none text-black"
                                name="password_confirmation"
                                onChange={handlePassword}
                                value={passwords.password_confirmation}
                            />
                        </div>
                        <button
                            onClick={submitUserAccount}
                            className="w-full p-2 text-white bg-teal-400 hover:bg-teal-500 rounded-lg"
                        >
                            save
                        </button>
                    </section>
                    <section className="w-full border border-slate-900 rounded-lg shadow-md p-6 mt-10 space-y-2">
                        <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                            <label className="text-xs font-bold">Contact Number</label>
                            <input 
                                type="text"
                                className="w-full outline-none text-black"
                                name="contact_number"
                                onChange={handleUser}
                                value={user?.contact_number}
                            />
                        </div>
                        <div className="text-gray-600 focus-within:ring-2 ring-indigo-600 focus-within:text-indigo-600 py-1 px-3 rounded-lg focus-within:border-white border border-gray-400">
                            <label className="text-xs font-bold">Address</label>
                            <input 
                                type="text"
                                className="w-full outline-none text-black"
                                name="address"
                                onChange={handleUser}
                                value={user?.address}
                            />
                        </div>
                        <button
                            onClick={submitUserInfo}
                            className="w-full p-2 text-white bg-indigo-400 hover:bg-indigo-500 rounded-lg"
                        >
                            save
                        </button>
                    </section>
                </section>
            </main>
        </>
    )
}