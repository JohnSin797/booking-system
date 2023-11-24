'use client'

import { PiGearFine } from "react-icons/pi"

export default function Loading () {
    return (
        <div className="absolute w-full h-full bg-slate-900/80 flex justify-center items-center">
            <PiGearFine className="w-10 h-10 animate-spin text-white" />
        </div>
    )
}