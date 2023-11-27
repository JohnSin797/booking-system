'use client'

import CustomerTop from "@/app/components/navigation/customerTop"
import Side from "@/app/components/navigation/side"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import { VscSettingsGear } from "react-icons/vsc"
import jwt from "jsonwebtoken"
import DateFrame from "@/app/components/dateFrame"
import PackageRating from "@/app/components/packageRating"
import StarRate from "@/app/components/starRate"
import Link from "next/link"
import DateTimeFrame from "@/app/components/datetimeFrame"

export default function Bookings () {

    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({})

    useEffect(()=>{
        if (typeof(window) !== 'undefined' && localStorage) {
            const token = localStorage.getItem('user_token')
            const decoded = jwt.decode(token, {complete: true})
            setUser(decoded?.payload)
            const getData = async () => {
                try {
                    setIsLoading(true)
                    await csrf()
                    await axios.post('/api/booking/show', {user_id: decoded.payload.id})
                    .then(res=>{
                        console.log(res)
                        setBookings(res.data.data)
                        setIsLoading(false)
                    })
                    .catch(err=>{
                        console.log(err)
                        setIsLoading(false)
                    })
                } catch (error) {
                    console.log(error)
                    setIsLoading(false)
                }
            }
            getData()
        }
    }, [])

    return (
        <>
            <CustomerTop />
            <Side />
            <main className="absolute w-full md:w-4/5 top-24 right-0 p-6">
                <p className="text-3xl font-bold">Booking</p>
                <section className="w-full border border-slate-900 rounded-lg shadow-md p-6 mt-8">
                    <div className=""></div>
                    {
                        isLoading ? 
                        <div className="relative w-full h-96 text-white">
                            <div className="absolute w-full h-full bg-slate-900 flex justify-center items-center">
                                <VscSettingsGear className="w-5 h-5 animate-spin" />
                            </div>
                        </div>
                        :
                        <div className="w-full h-96 overflow-scroll">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th>Package</th>
                                        <th>Product Details</th>
                                        <th>Scheduled</th>
                                        <th>Status</th>
                                        <th>Rate/Feedback</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bookings.map((item,id)=>{
                                            return (
                                                <tr key={id} className="border border-slate-900">
                                                    <td className="font-bold text-blue-400 border border-slate-900 p-2">{item?.package?.name}</td>
                                                    <td className="border border-slate-900 p-2">
                                                        {
                                                            item?.package?.package_item.map((pack,idx)=>{
                                                                return (
                                                                    <p key={idx}>
                                                                        <span className="text-gray-400">Product: </span>
                                                                        <span className="text-teal-400">{pack?.product?.name}</span>
                                                                    </p>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                    <td className="border border-slate-900 p-2">
                                                        <p className="flex items-center text-cyan-400 gap-2 text-sm">
                                                            <span className="text-gray-400">Date Scheduled: </span>
                                                            <DateTimeFrame dateStr={item?.order_date} />
                                                        </p>
                                                        <div className="flex items-center text-cyan-400 gap-2 text-sm">
                                                            <span className="text-gray-400">Location:</span>
                                                            <address>{item?.location}</address>
                                                        </div>
                                                        <p className="flex items-center text-cyan-400 gap-2 text-sm">
                                                            <span className="text-gray-400">Message:</span>
                                                            <span>{item?.message}</span>
                                                        </p>
                                                    </td>
                                                    <td className=" border border-slate-900 p-2">{item?.status?.toUpperCase()}</td>
                                                    <td className=" border border-slate-900 p-2">
                                                        <PackageRating details={item.package} status={item?.status !== 'confirmed'} />
                                                    </td>
                                                    <td className=" border border-slate-900 p-2 space-y-2">
                                                        <button
                                                            className="w-full p-2 rounded-lg bg-teal-400 text-white"
                                                        >
                                                            view
                                                        </button>
                                                        {
                                                            item?.status === 'confirmed' ?
                                                            <Link
                                                                href={'/rating-feedback/'+item?.package?.id}
                                                                disabled={true}
                                                                className="block text-center w-full p-2 rounded-lg bg-indigo-400 text-white"
                                                            >
                                                                write feedback
                                                            </Link>
                                                            :
                                                            <p className="block text-center w-full p-2 rounded-lg bg-gray-400 cursor-default text-white">write feedback</p>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </section>
            </main>
        </>
    )
}