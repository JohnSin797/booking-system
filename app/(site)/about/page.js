'use client'

import Footer from "@/app/components/footer"
import Top from "@/app/components/navigation/top"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"

export default function About ()
{
    const [description, setDescription] = useState({})

    useEffect(()=>{
        const getData = async () => {
            try {
                await csrf()
                await axios.get('/api/about/index')
                .then(res=>{
                    setDescription(res.data.data)
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
            <Top />
            <main className="mt-24">
                <section className='mt-24 w-full p-8 md:px-24'>
                    <div className='my-10 w-full h-96 border border-slate-900 rounded-lg p-6 md:p-10 space-y-5'>
                        <p className="text-xl md:text-3xl font-bold w-full border-b border-slate-900">About</p>
                        <p className="text-sm md:text-base">{description?.description}</p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}