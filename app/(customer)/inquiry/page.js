'use client'

import CustomerTop from "@/app/components/navigation/customerTop"
import Side from "@/app/components/navigation/side"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import jwt from "jsonwebtoken"
import { TbFidgetSpinner } from "react-icons/tb"
import WriteInquiry from "@/app/components/modals/writeInquiry"
import DateFrame from "@/app/components/dateFrame"
import Link from "next/link"
import Swal from "sweetalert2"

export default function Inquiry ()
{

    const [isLoading, setIsLoading] = useState(false)
    const [openInquiry, setOpenInquiry] = useState(false)
    const [inquiries, setInquiries] = useState([])

    const getData = async (id) => {
        try {
            setIsLoading(true)
            await csrf()
            await axios.post('/api/inquiries/show', {user_id: id})
            .then(res=>{
                console.log(res)
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
        if (typeof(window) !== 'undefined' && localStorage) {
            const token = localStorage.getItem('user_token')
            const decoded = jwt.decode(token, {complete: true})
            getData(decoded?.payload?.id)
        }
    }, [])

    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Delete',
            text: 'Are you sure you want to delete Inquiry?',
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                deleteInquiry(id)
            }
        })
    }

    const deleteInquiry = async (id) => {
        try {
            await csrf()
            await axios.post('/api/inquiries/delete')
            .then(res=>{
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
            <CustomerTop />
            <Side />
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <div className="md:flex justify-between">
                    <p className="text-3xl font-bold">Inquiries</p>
                    <button
                        onClick={()=>setOpenInquiry(true)}
                        className="w-full md:w-1/5 bg-teal-400 hover:bg-teal-500 p-2 text-white"
                    >
                        write inquiry
                    </button>
                </div>
                <WriteInquiry status={openInquiry} setStatus={setOpenInquiry} />
                <section className="mt-8 w-full border border-slate-900 rounded-lg shadow-md p-6">
                    {
                        isLoading ?
                        <div className="w-full h-96 relative">
                            <div className="absolute w-full h-full top-0 left-0 bg-slate-900 flex justify-center items-center">
                                <TbFidgetSpinner className="w-5 h-5 animate-spin text-white" />
                            </div>
                        </div>
                        :
                        <div className="w-full h-96 overflow-scroll md:overflow-y-scroll">
                            <table className="w-full table-auto md:table-fixed">
                                <thead className="sticky top-0 w-full bg-white">
                                    <tr>
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
                                                    <td className="border border-slate-900 p-2">{item?.title}</td>
                                                    <td className="border border-slate-900 p-2"><DateFrame dateStr={item?.created_at} /></td>
                                                    <td className="text-white border border-slate-900 p-2">
                                                        {
                                                            item?.inquiry_reply ? 
                                                            <Link
                                                                href={'/inquiry/reply/'+item?.inquiry_reply?.id}
                                                                className="block text-center w-full p-1 rounded-lg bg-blue-400 hover:bg-blue-500"
                                                            >
                                                                read
                                                            </Link>
                                                            :
                                                            <span className="text-gray-400">No reply</span>
                                                        }
                                                    </td>
                                                    <td className="text-white border border-slate-900 p-2 space-y-2">
                                                        <Link
                                                            href={'/inquiry/view/'+item.id}
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