'use client'

import Footer from "@/app/components/footer"
import Top from "@/app/components/navigation/top"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import { IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";

export default function Contact () {

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
        <>
            <Top />
            <main className="absolute w-full h-full top-0 right-0 space-y-2">
                <section className="w-full h-full flex justify-center items-center">
                    <div className="w-full md:w-2/5 rounded-lg bg-white shadow-md space-y-3 p-6 border border-slate-900">
                        <p className="text-2xl font-bold border-b border-slate-900">Contact Information</p>
                        <div>
                            <p className="font-bold flex gap-2 items-center"><IoIosMail /> Email</p>
                            <email>{user?.email}</email>
                        </div>
                        <div>
                            <p className="font-bold flex gap-2 items-center"><FaPhone />Contact Number</p>
                            <p>{user?.contact_number}</p>
                        </div>
                        <div>
                            <p className="font-bold flex gap-2 items-center"><GrMapLocation />Location</p>
                            <address>{user?.address}</address>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    )
}