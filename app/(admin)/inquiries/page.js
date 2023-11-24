'use client'

import DateFrame from "@/app/components/dateFrame"
import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import { TbFidgetSpinner } from "react-icons/tb"
import Link from "next/link"
import Swal from "sweetalert2"

export default function Inquiries () {

    const [inquiries, setInquiries] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getData = async () => {
        try {
            setIsLoading(true)
            await csrf()
            await axios.get('/api/inquiries/index')
            .then(res=>{
                setInquiries(res.data.data)
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

    const confirmDelete = id => {
        Swal.fire({
            title: 'Delete',
            icon: 'warning',
            text: 'Are you sure you want to delete?',
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                
            }
        })
    }

    return (
        <>
            <AdminTopNav />
            <AdminNav />
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <p className="text-3xl font-bold">Inquiries</p>
                <section className="mt-8 w-full border border-slate-900 rounded-lg shadow-md p-6">
                    {
                        isLoading ?
                        <div className="w-full h-96 relative">
                            <div className="absolute w-full h-full top-0 left-0 bg-slate-900 flex justify-center items-center">
                                <TbFidgetSpinner className="w-5 h-5 animate-spin text-white" />
                            </div>
                        </div>
                        :
                        <div className="w-full h-96 overflow-y-scroll">
                            <table className="w-full table-fixed">
                                <thead className="sticky top-0 w-full bg-white">
                                    <tr>
                                        <th>Customer</th>
                                        <th>About</th>
                                        <th>Date Sent</th>
                                        <th>Reply</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        inquiries.map((item,id)=>{
                                            return (
                                                <tr key={id}>
                                                    <td className="border border-slate-900 p-2">{item?.user?.name}</td>
                                                    <td className="border border-slate-900 p-2">{item?.title}</td>
                                                    <td className="border border-slate-900 p-2"><DateFrame dateStr={item?.created_at} /></td>
                                                    <td className="text-white border border-slate-900 p-2">
                                                        {
                                                            item?.inquiry_reply ? 
                                                            <button
                                                                className="w-full p-1 rounded-lg bg-blue-400 hover:bg-blue-500"
                                                            >
                                                                read
                                                            </button>
                                                            :
                                                            <span className="text-gray-400">No reply</span>
                                                        }
                                                    </td>
                                                    <td className="text-white border border-slate-900 p-2 space-y-2">
                                                        <Link
                                                            href={'/inquiries/view/'+item.id}
                                                            className="block text-center w-full p-1 rounded-lg bg-indigo-400 hover:bg-indigo-500"
                                                        >
                                                            view
                                                        </Link>
                                                        <button
                                                            onClick={()=>confirmDelete(item.id)}
                                                            className="w-full p-1 rounded-lg bg-rose-400 hover:bg-rose-500"
                                                        >
                                                            delete
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