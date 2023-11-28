'use client'

import { useEffect, useState } from "react"
import DateFrame from "./dateFrame"
import StarRate from "./starRate"
import jwt from "jsonwebtoken"
import { BiSolidPaperPlane } from "react-icons/bi"
import { csrf } from "../hooks/csrf"
import axios from "../lib/axios"
import Swal from "sweetalert2"

export default function FeedbackInput ({ item, getData }) {
    
    const [reply, setReply] = useState('')
    const [openReply, setOpenReply] = useState(false)
    const [user, setUser] = useState({})

    const submitReply = async (e) => {
        try {
            e.preventDefault()
            await csrf()
            await axios.post('/api/reply/store', {reply_to: item.id, user_id: user.id, comment: reply})
            .then(res=>{
                setReply('')
                getData()
                Swal.fire(res.data.message)
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
        }
    }, [])

    return (
        <section>
            <form className='border border-slate-900 p-3 space-y-3' onSubmit={submitReply}>
                <p className='font-bold flex gap-2 items-center'><span>{item?.user?.name}</span> <StarRate star={item?.user?.rating?.stars} /></p>
                <p>{item?.comment}</p>
                <div className='flex items-center justify-between'>
                    <button
                        type="button"
                        onClick={()=>setOpenReply(!openReply)}
                        className='text-xs text-teal-400 hover:text-teal-600 font-bold underline'
                    >
                        reply
                    </button>
                    <p className='text-xs text-cyan-400 font-bold'><DateFrame dateStr={item?.created_at} /></p>
                </div>
                <div className={`${openReply ? 'w-full p-6 flex gap-2 items-center' : 'hidden'}`}>
                    <input 
                        type='text'
                        className='w-full p-2 rounded-full border border-slate-900'
                        onChange={e=>setReply(e.target.value)}
                        value={reply}
                        placeholder='Type here...'
                    />
                    <button
                        type='submit'
                        className='bg-blue-400 hover:bg-blue-500 p-2 rounded-lg'
                    >
                        <BiSolidPaperPlane className='w-6 h-6 text-white' />
                    </button>
                    
                </div>
                <p className={`${item?.replies?.length > 0 ? 'text-sm text-blue-600' : 'hidden'}`}>Replies:</p>
                {
                    item?.replies.map((rep,id)=>{
                        return (
                            <div key={id} className="border border-slate-900 p-2 space-y-2">
                                <p className="font-bold flex gap-2 items-center"><span>{rep?.user?.name}</span> <StarRate star={rep?.user?.rating?.stars} /></p>
                                <p>{rep?.comment}</p>
                                <p className="text-xs text-cyan-400 font-bold"><DateFrame dateStr={rep?.created_at} /></p>
                            </div>
                        )
                    })
                }
            </form>
        </section>
    )
}