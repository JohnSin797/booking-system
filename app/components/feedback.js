'use client'

import { useEffect, useState } from "react"
import { BiSolidPaperPlane } from "react-icons/bi"
import axios from "../lib/axios"
import { csrf } from "../hooks/csrf"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import jwt from "jsonwebtoken"

export default function Feedback ({ getData }) {

    const [comment, setComment] = useState('')
    const router = useRouter()
    const [user, setUser] = useState({})

    useEffect(()=>{
        if (typeof(window) !== 'undefined' && localStorage) {
            const token = localStorage.getItem('user_token')
            const decoded = jwt.decode(token, {complete: true})
            setUser(decoded?.payload)
        }
    }, [])

    const submitFeedback = async e => {
        try {
            e.preventDefault()
            await csrf()
            await axios.post('/api/feedback/store', {user_id: user.id, comment: comment})
            .then(res=>{
                setComment('')
                getData()
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err)
                // router.push('/auth/login')
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className='md:px-10' onSubmit={submitFeedback}>
            <div className='flex justify-between items-center gap-2 p-6'>
                <input 
                    type='text'
                    className='w-full p-2 rounded-full border border-slate-900'
                    placeholder='Enter feedback here...'
                    onChange={e=>setComment(e.target.value)}
                    value={comment}
                />
                <button
                    type='submit'
                    className='bg-blue-400 hover:bg-blue-500 p-2 rounded-lg'
                >
                    <BiSolidPaperPlane className='w-6 h-6 text-white' />
                </button>
            </div>
        </form>
    )
}