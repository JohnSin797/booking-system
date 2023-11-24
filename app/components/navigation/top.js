'use client'

import Link from "next/link"
import Logo from "../logo"
import jwt from "jsonwebtoken"
import { useState, useEffect } from "react"

export default function Top () {
    const [user, setUser] = useState({})

    useEffect(()=>{
        if (typeof(window) !== 'undefined' && localStorage) {
            const token = localStorage.getItem('user_token')
            const decoded = jwt.decode(token, {complete:true})
            setUser(decoded?.payload)
        }
    }, [])

    return (
        <nav className="fixed w-full top-0 p-6 px-40 bg-white flex justify-between items-center z-50">
            <Link
                href={'/'}
            >
                <Logo />
            </Link>
            <ul className="flex gap-10">
                <li>
                    <Link
                        href={'/'}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href={'/contact'}
                    >
                        Contact
                    </Link>
                </li>
                <li>
                    {
                        !user && (
                            <Link
                                href={'/auth/login'}
                            >
                                Login
                            </Link>
                        )
                    }
                    {
                        user?.role == 'admin' && (
                            <Link
                                href={'/dashboard'}
                            >
                                Dashboard
                            </Link>
                        )
                    }
                    {
                        user?.role == 'user' && (
                            <Link
                                href={'/home'}
                            >
                                Customer
                            </Link>
                        )
                    }
                </li>
            </ul>
        </nav>
    )
}