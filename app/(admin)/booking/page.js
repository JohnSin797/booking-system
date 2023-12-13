'use client';

import DateFrame from "@/app/components/dateFrame";
import DateTimeFrame from "@/app/components/datetimeFrame";
import AdminNav from "@/app/components/navigation/adminNav";
import AdminTopNav from "@/app/components/navigation/adminTopNav";
import { csrf } from "@/app/hooks/csrf";
import axios from "@/app/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";

export default function Booking () {

    const [booking, setBooking] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const getData = async () => {
        try {
            setIsLoading(true)
            await csrf()
            await axios.get('/api/booking/index')
            .then(res=>{
                console.log(res)
                setBooking(res.data.data)
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

    useEffect(()=>{
        getData()
    }, [])

    const confirmBooking = id => {
        Swal.fire({
            title: 'Continue?',
            text: 'Are you sure you want to confirm this booking?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                submitConfirmBooking(id)
            }
        })
    }

    const submitConfirmBooking = async (id) => {
        try {
            await csrf()
            await axios.post('/api/booking/update', {id: id, status: 'confirmed'})
            .then(res=>{
                getData()
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err)
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const cancelBooking = id => {
        Swal.fire({
            title: 'Continue?',
            text: 'Are you sure you want to cancel this booking?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                submitCancelBooking(id)
            }
        })
    }

    const submitCancelBooking = async (id) => {
        try {
            await csrf()
            await axios.post('/api/booking/update', {id: id, status: 'cancelled'})
            .then(res=>{
                getData()
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err)
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <AdminTopNav />
            <AdminNav />
            <main className="absolute w-full md:w-4/5 top-24 right-0 p-6">
                <p className="text-3xl font-bold">Booking</p>
                <section className="w-full mt-10 rounded-lg shadow-md border border-slate-900 p-6">
                    {
                        isLoading ?
                        <div className="relative w-full h-96 bg-slate-900 text-white">
                            <div className="absolute w-full h-full flex justify-center items-center">
                                <TbFidgetSpinner className="w-5 h-5 animate-spin" />
                            </div>
                        </div>
                        :
                        <div className="w-full h-96 overflow-scroll">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th>Package Name</th>
                                        <th>Image</th>
                                        <th>Package Type</th>
                                        <th>Product Details</th>
                                        <th>Customer</th>
                                        <th>Schedule</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        booking.map((item,id)=>{
                                            return (
                                                <tr key={id} className="">
                                                    <td className="p-2 text-blue-400 font-bold border border-slate-900">{item?.package?.name}</td>
                                                    <td className="p-2 border border-slate-900">
                                                        <Image 
                                                            src={`data:image/jpg;image/jpeg;image/png;base64, ${item?.package?.image}`}
                                                            alt="package-img"
                                                            width={400}
                                                            height={60}
                                                            layout="responsive"
                                                        />
                                                    </td>
                                                    <td className="p-2 border border-slate-900">{item?.package?.package_type}</td>
                                                    <td className="p-2 border border-slate-900">
                                                        {
                                                            item?.package?.package_item?.map((element,idx)=>{
                                                                return (
                                                                    <p key={idx} className="flex gap-2">
                                                                        <span className="text-gray-400 text-sm">Product:</span>
                                                                        <span className="text-cyan-400 text-sm">{element?.product?.name}</span>
                                                                    </p>
                                                                )
                                                            })
                                                        }
                                                        <p className="space-x-2">
                                                            <span className="text-gray-400 text-sm">Total Price:</span>
                                                            <span className="text-cyan-400 text-sm">{item?.package?.total_price}</span>
                                                        </p>
                                                    </td>
                                                    <td className="p-2 border border-slate-900">{item?.user?.name}</td>
                                                    <td className="p-2 border border-slate-900">
                                                        <p className="flex gap-2">
                                                            <span className="text-gray-400 text-sm">Scheduled:</span>
                                                            <span className="text-sm text-teal-400"><DateTimeFrame dateStr={item?.order_date} /></span>
                                                        </p>
                                                        <p className="flex gap-2">
                                                            <span className="text-gray-400 text-sm">Location:</span>
                                                            <span className="text-sm text-teal-400">{item?.location}</span>
                                                        </p>
                                                        <p className="flex gap-2">
                                                            <span className="text-gray-400 text-sm">Service:</span>
                                                            <span className="text-sm text-teal-400">{item?.services}</span>
                                                        </p>
                                                        <p className="flex gap-2">
                                                            <span className="text-gray-400 text-sm">Contact #:</span>
                                                            <span className="text-sm text-teal-400">{item?.user?.contact_number}</span>
                                                        </p>
                                                        <p className="flex gap-2">
                                                            <span className="text-gray-400 text-sm">Message:</span>
                                                            <span className="text-sm text-teal-400">{item?.message}</span>
                                                        </p>
                                                    </td>
                                                    <td className="p-2 border border-slate-900">
                                                        <span className={`font-bold ${item?.status == 'confirmed' ? 'text-purple-400' : (item?.status == 'cancelled' ? 'text-red-600' : 'text-amber-400')}`}>{item?.status?.toUpperCase()}</span>
                                                    </td>
                                                    <td className="p-2 text-white space-y-2 border border-slate-900">
                                                        <button
                                                            onClick={()=>confirmBooking(item.id)}
                                                            className="w-full p-2 rounded-lg bg-indigo-400 hover:bg-indigo-500"
                                                        >
                                                            confirm
                                                        </button>
                                                        
                                                        <button
                                                            onClick={()=>cancelBooking(item.id)}
                                                            className="w-full p-2 rounded-lg bg-rose-400 hover:bg-rose-500"
                                                        >
                                                            cancel
                                                        </button>
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