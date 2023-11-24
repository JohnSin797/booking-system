'use client'

import { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import { csrf } from "../hooks/csrf"
import axios from "../lib/axios"
import jwt from "jsonwebtoken"
import Swal from "sweetalert2"

export default function PackageRating ({ details, status }) {

    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [user, setUser] = useState({})

    useEffect(()=>{
        if (typeof(window) !== 'undefined' && localStorage) {
            const token = localStorage.getItem('user_token')
            const decode = jwt.decode(token, {complete: true})
            setUser(decode?.payload)
            details?.rating?.forEach(element => {
                if (element?.user_id == decode?.payload?.id) {
                    setRating(element.stars)
                }
            })
        }
    }, [])

    const rate = async (index) => {
        try {
            await csrf()
            await axios.post('/api/package-rating/store', {package_id: details.id, user_id: user.id, stars: index})
            .then(res=>{
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        disabled={status}
                        className={index <= (hover || rating) ? "text-amber-400" : "text-black"}
                        onClick={() => rate(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <FaStar className="w-4 h-4" />
                    </button>
                )
            })}
        </section>
    )
}