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

    const [reply, setReply] = useState({})

    const confirmDelete = id => {

    }

    useEffect(()=>{
        const getData = async () => {
            try {
                await csrf()
                await axios.post('/api/inquiry/reply/show', {id: params.slug})
                .then(res=>{
                    setReply(res.data.data)
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

    return (
        <>
            <AdminTopNav />
            <AdminNav />
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <p className="text-3xl font-bold">View Reply</p>
                <section className="mt-10 space-y-6">
                    <div className="flex gap-2 font-bold">
                        <span>To:</span>
                        <span className="text-blue-400">{reply?.inquiry?.user?.name}</span>
                    </div>
                    <div className="p-6 md:px-20">
                        <textarea 
                            className="resize-none outline-none w-full"
                            name="message"
                            value={reply?.message}
                            readOnly
                        />
                    </div>
                    <p className="text-xs text-right font-bold"><DateFrame dateStr={reply.created_at} /></p>
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