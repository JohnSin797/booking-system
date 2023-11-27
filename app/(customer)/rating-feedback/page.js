'use client'

import RatingFeedbackCard from "@/app/components/cards/ratingFeedbackCard"
import CustomerTop from "@/app/components/navigation/customerTop"
import Side from "@/app/components/navigation/side"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import jwt from "jsonwebtoken"

export default function RatingFeedback () {

    const [feedbacks, setFeedbacks] = useState([])
    const [user, setUser] = useState({})

    useEffect(()=>{
        if (typeof(window) !== 'undefined' && localStorage) {
            const token = localStorage.getItem('user_token')
            const decoded = jwt.decode(token, {complete: true})
            setUser(decoded?.payload)
            getData(decoded?.payload?.id)
        }
    }, [])

    const getData = async (id) => {
        try {
            await csrf()
            await axios.post('/api/booking/show', {user_id: id})
            .then(res=>{
                console.log(res)
                setFeedbacks(res.data.data)
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
                <div className="w-full mt-8 md:px-20 space-y-2">
                    {
                        feedbacks.map((item,id)=>{
                            return <RatingFeedbackCard key={id} details={item?.package} getData={getData} />
                        })
                    }
                </div>
            </main>
        </>
    )
}