'use client'

import { useState } from "react"
import { AiOutlineMenuUnfold, AiOutlineCloseCircle, AiFillHome, AiFillBook } from "react-icons/ai"
import { MdOutlineStar } from "react-icons/md"
import { LuPackage2, LuPackageOpen } from "react-icons/lu"
import Logo from "../logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaQuestionCircle } from "react-icons/fa"

export default function Side () {

    const [isOpen, setIsOpen] = useState(true)
    const currentPath = usePathname()

    return (
        <>
            <button
                onClick={()=>setIsOpen(!isOpen)}
                className="fixed top-6 left-6 md:hidden z-50"
            >
                <AiOutlineMenuUnfold className="w-5 h-5" />
            </button>
            <aside className={`fixed z-50 flex flex-col justify-between md:justify-start left-0 h-full w-full md:w-1/5 bg-gray-900 duration-300 text-gray-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="border-b border-gray-600 p-10">
                    <div className="bg-gray-800 p-3 rounded-lg">
                        <Logo />
                    </div>
                </div>
                <ul className="p-6 space-y-2">
                    <li>
                        <Link
                            href={'/home'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath == '/home' ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <AiFillHome className={`w-5 h-5 ${currentPath == '/home' ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/customized'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath == '/customized' ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <LuPackageOpen className={`w-5 h-5 ${currentPath == '/customized' ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Customized
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/package'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath == '/package' ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <LuPackage2 className={`w-5 h-5 ${currentPath == '/package' ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Package
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/bookings'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath == '/bookings' ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <AiFillBook className={`w-5 h-5 ${currentPath == '/bookings' ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Booking
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/rating-feedback'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath.startsWith('/rating-feedback') ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <MdOutlineStar className={`w-5 h-5 ${currentPath.startsWith('/rating-feedback') ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Ratings and Feedback
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/inquiry'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath.startsWith('/inquiry') ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <FaQuestionCircle className={`w-5 h-5 ${currentPath.startsWith('/inquiry') ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Inquiries
                        </Link>
                    </li>
                </ul>
                <div
                    className="w-full flex justify-center md:hidden"
                >
                    <AiOutlineCloseCircle 
                        onClick={()=>setIsOpen(!isOpen)}
                        className="w-8 h-8 text-white" 
                    />
                </div>
            </aside>
        </>
    )
}