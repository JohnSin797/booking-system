'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import StarRate from "../starRate"
import Feedback from "../feedback"
import AverageStarRating from "../averageStarRating"
import FeedbackInput from "../feedbackInput"
import PackageFeedback from "../packageFeedback"
import PackageFeedbackInput from "../packageFeedbackInput"

export default function RatingFeedbackCard ({ details, getData }) {

    const [seeMore, setSeeMore] = useState(false)
    const [averageStar, setAverageStar] = useState(null)

    function averageRating() {
        let starCount = 0
        let index = 0
        details?.rating?.forEach(element => {
            starCount += element.stars
            index++
        })
        const ave = starCount / index
        setAverageStar(parseInt(ave) ?? 0)
    }

    useEffect(()=>{
        averageRating()
    }, [])

    return (
        <div className="w-full p-6 border border-gray-600 shadow-md space-y-2">
            <div className="w-full h-96 md:h-60 border overflow-hidden p-6 md:flex gap-2">
                <div className="relative w-full md:w-1/2 h-full">
                    <Image 
                        src={`data:image/jpg;image/jpeg;image/png;base64, ${details.image}`}
                        alt="package-img"
                        layout="fill"
                    />
                </div>
                <div className="w-full md:w-1/2 h-full p-6">
                    <p className="flex gap-2"><span className="text-gray-400">Rating: {averageStar ? averageStar : 0}</span><AverageStarRating star={averageStar} /></p>
                    <p className="text-gray-400">Package Name: <span className="text-blue-400">{details?.name}</span></p>
                    <p className="text-gray-400">Product Type: <span className="text-blue-400">{details?.product_type}</span></p>
                    <p className="text-gray-400">Description: <span className="text-blue-400">{details?.description}</span></p>
                    <p className="text-gray-400">Price: <span className="text-blue-400">{details?.total_price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                </div>
            </div>
            <button onClick={()=>setSeeMore(!seeMore)} className="underline text-teal-400">see feedbacks</button>
            <div className={`${seeMore ? 'w-full space-y-2' : 'hidden'}`}>
                <PackageFeedback packageId={details.id} getData={getData} />
                {
                    details?.package_feedbacks?.map((element,id)=>{
                        return (
                            <PackageFeedbackInput key={id} item={element} getData={getData} />
                        )
                    })
                }
            </div>
        </div>
    )
}