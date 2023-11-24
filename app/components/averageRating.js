'use client'

import { useEffect, useState } from "react"
import { FaStar, FaStarHalfAlt  } from "react-icons/fa"

export default function AverageRating ({ star }) {

    const [roundedRating, setRoundedRating] = useState(null)

    

    useEffect(()=>{
        const setStars = () => {
            let starCount = 0
            star.forEach(element => {
                starCount += element.stars
            })
            const averageRating = starCount / star.length
            const round = Math.round(averageRating * 2) / 2
            setRoundedRating(round)
        }
        setStars()
    }, [])

    const stars = Array.from({ length: 5 }, (_, index) => {
        const isFull = index + 0.5 <= roundedRating;
        const isHalf = index < roundedRating && !isFull;
    
        return (
          <span key={index}>
            {
                isFull && <FaStar />
            }
            {
                isHalf && <FaStarHalfAlt />
            }
          </span>
        );
    })

    return (
        <span className="flex gap-1 items-center">
            {stars}
        </span>
    )
}