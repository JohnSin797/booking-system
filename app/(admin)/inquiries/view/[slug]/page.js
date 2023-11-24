'use client'

import DateFrame from "@/app/components/dateFrame"
import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function View ({ params })
{

    const [inquiry, setInquiry] = useState({})

    useEffect(()=>{
        const getData = async () => {
            try {
                await csrf()
                await axios.post('/api/inquiries/view', {id: params.slug})
                .then(res=>{
                    setInquiry(res.data.data)
                })
                .catch(err=>{
                    console.log(err)
                    Swal.fire(err.response.data.message)
                })
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    const confirmDelete = () => {
        Swal.fire({
            title: 'Delete',
            text: 'Are you sure you want to delete Inquiry?',
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                deleteInquiry(params.slug)
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
            <AdminTopNav />
            <AdminNav />
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
            <p className="text-3xl font-bold">View Inquiry</p>
                <section className="mt-10 space-y-6">
                    <div className="flex justify-center w-full">
                        <input 
                            type="text"
                            className="w-full md:w-3/5 border-b border-slate-900 text-center outline-none"
                            name="title"
                            value={inquiry?.title}
                            placeholder="About"
                            readOnly
                        />
                    </div>
                    <div className="border border-slate-900 rounded-lg p-6 md:px-20">
                        <textarea 
                            className="resize-none outline-none w-full"
                            name="message"
                            value={inquiry?.message}
                            readOnly
                        />
                    </div>
                    <p className="text-xs text-right font-bold"><DateFrame dateStr={inquiry.created_at} /></p>
                    <div className="flex justify-end gap-2 w-full text-white">
                        <Link
                            href={'/inquiries'}
                            className="block w-full md:w-1/6 rounded-lg bg-blue-400 hover:bg-blue-500 text-center p-2"
                        >
                            back
                        </Link>
                        <button
                            onClick={confirmDelete}
                            className="w-full md:w-1/6 rounded-lg bg-rose-400 hover:bg-rose-500 p-2"
                        >
                            delete
                        </button>
                    </div>
                </section>
            </main>
        </>
    )
}