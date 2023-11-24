'use client'

import { FaStar, FaStarHalfAlt, FaRegStar  } from "react-icons/fa"

export default function AverageStarRating ({ star }) {

    const average = Math.round(star * 2) / 2 ?? 0
    const arr = new Array(5).fill(null)
    return (
        <span className="flex gap-2 items-center">
            {
                arr.map((item,id)=>{
                    return (
                        <span key={id} className="text-amber-300">
                            {
                                (id + 0.5) <= average ?
                                <FaStar />
                                :
                                (id < average) ?
                                <FaStarHalfAlt />
                                :
                                <FaRegStar />
                            }
                        </span>
                    )
                })
            }
        </span>
    )
} 