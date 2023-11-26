'use client'

import DateFrame from "@/app/components/dateFrame"
import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import Exports from "@/app/hooks/exports"
import Swal from "sweetalert2"

export default function Reports ()
{

    const [booking, setBooking] = useState([])
    const {reports} = Exports()

    function processBooking(arr) {
        let final = []
        arr.forEach(element => {
            if (element.status == 'confirmed') {
                final.push(element)
            }
        })
        return final
    }

    useEffect(()=>{
        const getData = async () => {
            try {
                await csrf()
                await axios.get('/api/booking/index')
                .then(res=>{
                    console.log(res)
                    const newArr = processBooking(res.data.data)
                    setBooking(newArr)
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

    const exportFile = () => {
        Swal.fire({
            title: 'Export File?',
            icon: 'question',
            text: 'Select month and year',
            input: 'month',
            inputValidator: value=>{
                if (!value) {
                    return 'Month is required'
                }
            },
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.value) {
                reports(booking, res.value)
            }
        })
    }

    return (
        <>
            <AdminTopNav />
            <AdminNav />
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <section className="flex justify-between items-center">
                    <p className="text-3xl font-bold">Reports</p>
                    <button
                        onClick={exportFile}
                        className="p-2 rounded-lg bg-teal-400 hover:bg-teal-500 text-white"
                    >
                        export
                    </button>
                </section>
                <section className="mt-10 border border-slate-900 rounded-lg shadow-md p-6 w-full">
                    <div className="relative w-full h-96 overflow-y-scroll">
                        <table className="w-full table-fixed">
                            <thead className="w-full sticky top-0 bg-white">
                                <tr>
                                    <th>Customer</th>
                                    <th>Package Name</th>
                                    <th>Product Details</th>
                                    <th>Schedule</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    booking.map((item,idx)=>{
                                        return (
                                            <tr key={idx}>
                                                <td className="p-2 border border-slate-900 text-blue-400 font-bold">{item.user.name}</td>
                                                <td className="p-2 border border-slate-900 text-teal-400">{item.package.name}</td>
                                                <td className="p-2 border border-slate-900">
                                                    {
                                                        item.package.package_item.map((element,id)=>{
                                                            return (
                                                                <div key={id}>
                                                                    <span className="text-gray-400">Product:</span>
                                                                    <span className="text-cyan-400">{element?.product?.name}</span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td className="p-2 border border-slate-900">
                                                    <div className="flex gap-2">
                                                        <span className="text-gray-400">Schedule:</span>
                                                        <span className="text-indigo-400"><DateFrame dateStr={item.order_date} /></span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className="text-gray-400">Location:</span>
                                                        <span className="text-indigo-400">{item.location}</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className="text-gray-400">Message:</span>
                                                        <span className="text-indigo-400">{item.message}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    )
}