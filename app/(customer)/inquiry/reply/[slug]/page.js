'use client'

import DateFrame from "@/app/components/dateFrame"
import CustomerTop from "@/app/components/navigation/customerTop"
import Side from "@/app/components/navigation/side"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Reply ({ params })
{
    const [inquiry, setInquiry] = useState({
        title: '',
        message: ''
    })

    useEffect(()=>{
        const getData = async () => {
            try {
                await csrf()
                await axios.post('/api/inquiry/reply/show', {id: params.slug})
                .then(res=>{
                    setInquiry(res.data.data)
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
            <CustomerTop />
            <Side />
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <p className="text-3xl font-bold">View Reply</p>
                <section className="mt-10 space-y-6">
                    <div>
                        <p className="underline font-bold">From: Admin</p>
                        <p className="underline text-blue-400">About: {inquiry?.inquiry?.title}</p>
                    </div>
                    {/* <div className="flex justify-center w-full">
                        <input 
                            type="text"
                            className="w-full md:w-3/5 border-b border-slate-900 text-center outline-none"
                            name="title"
                            value={inquiry?.inquiry?.title}
                            placeholder="About"
                            readOnly
                        />
                    </div> */}
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
                            href={'/inquiry'}
                            className="block w-full md:w-1/6 rounded-lg bg-blue-400 hover:bg-blue-500 text-center p-2"
                        >
                            back
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )
}