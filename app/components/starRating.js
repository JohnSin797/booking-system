'use client'

import { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import { csrf } from "../hooks/csrf"
import axios from "../lib/axios"
import jwt from "jsonwebtoken"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

export default function StarRating () {
    
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [user, setUser] = useState({})
    const router = useRouter()

    const rate = async index => {
        try {
            if (!user) {
                router.push('/auth/login')
            }
            setRating(index)
            await csrf()
            await axios.post('/api/rating/store', {stars: index, user_id: user.id})
            .then(res=>{
                Swal.fire({
                    title: res.data.message,
                    icon: 'success',
                    showCancelButton: false
                })
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
        if (typeof(window) !== 'undefined' && localStorage) {
            const token = localStorage.getItem('user_token')
            const decoded = jwt.decode(token, {complete: true})
            setUser(decoded?.payload)
            setRating(decoded?.payload?.rating?.stars)
        }
    }, [])

    return (
        <div className="w-full p-6 md:px-20">
            <p className="text-center">Please rate us</p>
            <div className="flex justify-center items-center">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? "text-amber-400" : "text-black"}
                            onClick={() => rate(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <FaStar className="w-6 h-6" />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}