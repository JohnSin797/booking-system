'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import Swal from "sweetalert2"

export default function AdminTopNav () {

    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const logout = async () => {
        try {
            await axios.get('/api/user/logout')
            .then(res=>{
                localStorage.removeItem('user_token')
                router.push('/')
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