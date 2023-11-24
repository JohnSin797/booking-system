'use client'

import { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import jwt from "jsonwebtoken"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import Swal from "sweetalert2"

export default function WriteInquiry ({ status, setStatus })
{

    const [inquiryForm, setInquiryForm] = useState({
        user_id: '',
        title: '',
        message: ''
    })

    const handleForm = e => {
        const {name, value} = e.target
        setInquiryForm({
            ...inquiryForm,
            [name]: value
        })
    }
    
    useEffect(()=>{
        if (typeof(window) !== 'undefined' && localStorage) {
            const token = localStorage.getItem('user_token')
            const decoded = jwt.decode(token, {complete: true})
            setInquiryForm({
                ...inquiryForm,
                user_id: decoded?.payload?.id
            })
        }
    }, [])

    const submitInquiry = async () => {
        try {
            await csrf()
            await axios.post('/api/inquiries/store', inquiryForm)
            .then(res=>{
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

    return (
        <section className={`${status ? 'fixed w-full h-full z-50 top-0 left-0 flex justify-center items-center bg-slate-900/90' : 'hidden'}`}>
            <form className="w-full md:w-3/5 bg-white rounded-lg p-6 relative" onSubmit={submitInquiry}>
                <button
                    type="button"
                    onClick={()=>setStatus(false)}
                    className="absolute right-3 top-3 hover:text-red-600"
                >
                    <AiOutlineClose className="w-5 h-5" />
                </button>
                <p className="text-xl font-bold">Write Inquiry</p>
                <div className="mt-10 flex justify-center w-full">
                    <input 
                        type="text"
                        className="w-full md:w-3/5 border-b border-slate-900 text-center outline-none"
                        name="title"
                        onChange={handleForm}
                        value={inquiryForm.title}
                        placeholder="About"
                    />
                </div>
                <div className="border border-slate-900 rounded-lg p-6 mt-5">
                    <textarea 
                        className="resize-none outline-none w-full"
                        name="message"
                        onChange={handleForm}
                        value={inquiryForm.message}
                        placeholder="Type here..."
                        required
                    />
                </div>
                <div className="w-full mt-5 md:flex justify-end gap-2 text-white">
                    <button
                        type="submit"
                        className="w-full md:w-1/5 p-2 rounded-lg bg-blue-400 hover:bg-blue-500"
                    >
                        send
                    </button>
                    <button
                        type="button"
                        onClick={()=>setStatus(false)}
                        className="w-full md:w-1/5 p-2 rounded-lg bg-rose-400 hover:bg-rose-500"
                    >
                        cancel
                    </button>
                </div>
            </form>
        </section>
    )
}