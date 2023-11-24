'use client'

import RatingFeedbackCard from "@/app/components/cards/ratingFeedbackCard"
import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function RatingsFeedback ()
{
    const [packageFeedbacks, setPackageFeedbacks] = useState([])

    const getData = async () => {
        try {
            await csrf()
            await axios.get('/api/package-feedback/index')
            .then(res=>{
                console.log(res)
                setPackageFeedbacks(res.data.data)
            })
            .catch(err=>{
                console.log(err)
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
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <div className="w-full bg-white z-10 top-16 sticky p-6">
                    <p className="text-3xl font-bold">Ratings and Feedbacks</p>
                </div>
                <div className="w-full mt-8 px-20 space-y-2">
                    {
                        packageFeedbacks.map((item,id)=>{
                            return <RatingFeedbackCard key={id} details={item} getData={getData} />
                        })
                    }
                </div>
            </main>
        </>
    )
}