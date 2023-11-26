'use client'

import { AiOutlineClose } from "react-icons/ai"

export default function ReadReply ({ details, status, setStatus })
{
    return (
        <section className={`${status ? 'fixed bg-slate-900/90 w-full h-full top-0 left-0 z-50 flex justify-center items-center' : 'hidden'}`}>
            <div className="w-full md:w-3/5 rounded-lg bg-white p-6 relative">
                <button
                    onClick={()=>setStatus(false)}
                    className="absolute right-3 top-3 hover:text-red-600"
                >
                    <AiOutlineClose className="w-5 h-5" />
                </button>
                <p className="text-xl font-bold">To: <span className="text-blue-400">{details.user.name}</span></p>
                <p className="text-xl font-bold">About: <span className="text-teal-400">{details.title}</span></p>
                <div className="mt-10 p-8 border border-gray-400 rounded-lg">
                    <p>{details?.inquiry_reply?.message}</p>
                </div>
            </div>
        </section>
    )
}