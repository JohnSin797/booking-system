'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import Swal from "sweetalert2"
import Auth from "@/app/hooks/auth"
import jwt from "jsonwebtoken"

export default function CustomerTop () {

    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState({})
    const router = useRouter()
    const {logout} = Auth()

    useEffect(()=>{
        if (typeof(window) !== 'undefined' && localStorage) {
            const token = localStorage.getItem('user_token')
            const decoded = jwt.decode(token, {complete: true})
            setUser(decoded?.payload)
        }
    }, [])

    return (
        <div className="fixed top-0 right-0 w-4/5 bg-white z-50 p-6">
            <div className="relative w-full flex justify-end">
                <button
                    onClick={()=>setIsOpen(!isOpen)}
                >
                    <AiFillCaretDown className="w-5 h-5" />
                </button>
                <div className={`${isOpen ? 'absolute w-[350px] h-40 rounded-lg bg-gray-900 top-10 text-white p-6 space-y-2' : 'hidden'}`}>
                    <Link 
                        href={'/profile'}
                        className="block w-full p-2 border border-gray-400 hover:bg-gray-800 rounded-lg text-center"
                    >
                        view profile
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full p-2 border border-gray-400 hover:bg-gray-800 rounded-lg"
                    >
                        logout
                    </button>
                </div>
            </div>
        </div>
    )
}