'use client'

import { TbFidgetSpinner } from "react-icons/tb"

export default function Loader () {
    return (
        <div className="absolute w-full h-full flex justify-center items-center bg-slate-900">
            <TbFidgetSpinner className="w-5 h-5 animate-spin text-white" />
        </div>
    )
}