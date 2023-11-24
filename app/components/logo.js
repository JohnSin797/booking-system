'use client'

import Image from "next/image"

export default function Logo () {
    return (
        <div className="flex items-center gap-3">
            <Image 
                src={`/images/logo.png`}
                alt="logo"
                width={50}
                height={30}
            />
            <p className="font-bold">A&F Booking System</p>
        </div>
    )
}