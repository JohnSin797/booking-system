'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { csrf } from "../hooks/csrf"
import axios from "../lib/axios"

export default function Footer () {

    const [user, setUser] = useState({})

    useEffect(()=>{
        const getData = async () => {
            try {
                await csrf()
                await axios.get('/api/user/info')
                .then(res=>{
                    setUser(res.data.data)
                })
                .catch(err=>{
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <footer className="bg-slate-800 text-white p-6 px-20 space-y-6">
            <section className="w-full flex justify-between">
                <div className="w-1/2">
                    <Image 
                        src={'/icons/logoico1.ico'}
                        alt="image"
                        width={100}
                        height={100}
                    />
                    <p>We provide the best booking for the most affordable prices</p>
                </div>
                <div className="w-1/3 space-y-2">
                    <p className="text-xl font-bold">Contact Us</p>
                    <div>
                        <p>ADDRESS</p>
                        <address>{user?.address}</address>
                    </div>
                    <div>
                        <p>PHONE NUMBER</p>
                        <p>{user?.contact_number}</p>
                    </div>
                    <div>
                        <p>EMAIL</p>
                        <email>{user?.email}</email>
                    </div>
                </div>
            </section>
            <p className="text-center">A&F Gift Shop @ 2023 All Rights Reserved</p>
        </footer>
    )
}