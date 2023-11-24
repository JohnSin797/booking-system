'use client'

import AverageRating from "@/app/components/averageRating"
import RatingFeedbackCard from "@/app/components/cards/ratingFeedbackCard"
import CustomerTop from "@/app/components/navigation/customerTop"
import Side from "@/app/components/navigation/side"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"

export default function RatingFeedback ({ params }) {

    const [packageDetail, setPackageDetail] = useState({})

    useEffect(()=>{
        getData()
    }, [])
    
    const getData = async () => {
        try {
            await csrf()
            await axios.post('/api/package/show', {id: params.slug})
            .then(res=>{
                console.log(res)
                setPackageDetail(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <CustomerTop />
            <Side />
            <main className="absolute top-16 right-0 w-full md:w-4/5 px-6 pb-6">
                <div className="w-full bg-white z-10 top-16 sticky p-6">
                    <p className="text-3xl font-bold">Ratings and Feedbacks</p>
                </div>
                <div className="w-full mt-8 px-20 space-y-2">
                    <RatingFeedbackCard details={packageDetail} getData={getData} />
                </div>
            </main>
        </>
    )
}