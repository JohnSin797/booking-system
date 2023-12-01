'use client'

import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function About ()
{
    const [description, setDescription] = useState({
        description: ''
    })

    const getData = async () => {
        try {
            await csrf()
            await axios.get('/api/about/index')
            .then(res=>{
                setDescription(res.data.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const saveDescription = async () => {
        try {
            await csrf()
            await axios.post('/api/about/update', {description: description.description})
            .then(res=>{
                getData()
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getData()
    }, [])

    return (
        <>
            <AdminTopNav />
            <AdminNav />
            <main className="absolute top-20 right-0 w-full md:w-4/5 p-6">
                <p className="text-3xl font-bold">About</p>
                <section className="mt-10 border border-slate-900 rounded-lg shadow-md p-6 h-96">
                    <textarea 
                        rows={10}
                        className="w-full resize-none outline-none border rounded-lg p-3"
                        placeholder="Type here..."
                        value={description.description}
                        onChange={e=>setDescription({...description, description: e.target.value})}
                    />
                    <button
                        onClick={saveDescription}
                        className="w-full md:w-1/5 bg-teal-400 text-white p-2 rounded-lg"
                    >
                        save
                    </button>
                </section>
            </main>
        </>
    )
}