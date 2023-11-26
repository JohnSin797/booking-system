'use client'

import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function Create ({ params })
{

    const [reply, setReply] = useState('')
    const [receiver, setReceiver] = useState({})
    const router = useRouter()

    useEffect(()=>{
        const getData = async () => {
            try {
                await csrf()
                await axios.post('/api/inquiries/view', {id: params.slug})
                .then(res=>{
                    setReceiver(res.data.data)
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

    const submitReply = async () => {
        try {
            await csrf()
            await axios.post('/api/inquiry/reply', {
                inquiry_id: params.slug,
                message: reply
            })
            .then(res=>{
                setReply('')
                Swal.fire(res.data.message)
                router.push('/inquiries')
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
                <section className="flex justify-between items-center">
                    <p className="text-3xl font-bold">Create Reply</p>
                    <button
                        onClick={submitReply}
                        className="p-1 w-full md:w-1/5 text-white bg-teal-400 hover:bg-teal-500"
                    >
                        send
                    </button>
                </section>
                <section className="border border-slate-900 rounded-lg shadow-md p-6 mt-10">
                    <p className="text-xl font-bold">To: <span className="text-blue-400">{receiver?.user?.name}</span></p>
                    <p className="text-xl font-bold">About: <span className="text-teal-400">{receiver?.title}</span></p>
                    <div className="mt-10 p-8 border border-gray-400 rounded-lg">
                        <textarea 
                            className="resize-none outline-none w-full"
                            rows={5}
                            placeholder="Type reply here..."
                            onChange={e=>setReply(e.target.value)}
                            value={reply}
                        />
                    </div>
                </section>
            </main>
        </>
    )
}