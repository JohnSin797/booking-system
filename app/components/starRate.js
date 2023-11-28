'use client'

import { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"

export default function StarRate ({ star }) {
    const [starArray, setStarArray] = useState([])

    useEffect(()=>{
        function setArray(){
            if (star) {
                const newArr = new Array(star).fill(null)
                setStarArray(newArr)
            } else {
                setStarArray([])
            }
        }
        setArray()
    }, [])

    return (
        <span className="flex gap-1 items-center">
            {
                starArray.map((item,id)=>{
                    return <FaStar key={id} className="w-3 h-3 text-amber-400" />
                })
            }
        </span>
    )
}