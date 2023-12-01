'use client'

import { useState } from "react"
import { AiOutlineMenuUnfold, AiOutlineCloseCircle, AiFillBook, AiOutlineDropbox } from "react-icons/ai"
import { LuLayoutDashboard } from "react-icons/lu"
import { TbPackages, TbReportAnalytics } from "react-icons/tb"
import { FaQuestionCircle } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import Logo from "../logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MdOutlineStar } from "react-icons/md"

export default function AdminNav () {

    const [isOpen, setIsOpen] = useState(true)
    const currentPath = usePathname()

    return (
        <>
            <button
                onClick={()=>setIsOpen(!isOpen)}
                className="absolute top-6 right-6 md:hidden"
            >
                <AiOutlineMenuUnfold className="w-5 h-5" />
            </button>
            <aside className={`fixed flex flex-col justify-between md:justify-start left-0 h-full w-full md:w-1/5 bg-gray-900 duration-300 text-gray-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="border-b border-gray-600 p-10">
                    <div className="bg-gray-800 p-3 rounded-lg">
                        <Logo />
                    </div>
                </div>
                <ul className="p-6 space-y-2">
                    <li>
                        <Link
                            href={'/dashboard'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath == '/dashboard' ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <LuLayoutDashboard className={`w-5 h-5 ${currentPath == '/dashboard' ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/product'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath == '/product' ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <AiOutlineDropbox className={`w-5 h-5 ${currentPath == '/product' ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Product
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/booking'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath == '/booking' ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <AiFillBook className={`w-5 h-5 ${currentPath == '/booking' ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Booking
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/packages'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath.startsWith('/packages') ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <TbPackages className={`w-5 h-5 ${currentPath.startsWith('/packages') ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Packages
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/ratings-feedbacks'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath.startsWith('/ratings-feedbacks') ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <MdOutlineStar className={`w-5 h-5 ${currentPath.startsWith('/ratings-feedbacks') ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Ratings and Feedback
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/inquiries'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath.startsWith('/inquiries') ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <FaQuestionCircle className={`w-5 h-5 ${currentPath.startsWith('/inquiries') ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Inquiries
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/reports'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath.startsWith('/reports') ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <TbReportAnalytics className={`w-5 h-5 ${currentPath.startsWith('/reports') ? 'text-indigo-400' : 'text-gray-400'}`} />
                            Reports
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/about-page'}
                            className={`block w-full p-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 ${currentPath.startsWith('/about-page') ? 'font-bold text-white bg-slate-800' : ''}`}
                        >
                            <IoInformationCircle className={`w-5 h-5 ${currentPath.startsWith('/about-page') ? 'text-indigo-400' : 'text-gray-400'}`} />
                            About
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