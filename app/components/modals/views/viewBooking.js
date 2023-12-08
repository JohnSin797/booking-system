'use client'

import Image from "next/image"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import ViewPackage from "./viewPackage"

export default function ViewBooking ({ details, status, setStatus })
{
    const [openPackage, setOpenPackage] = useState(false)
    const [packageDetails, setPackageDetails] = useState({
        name: '',
        product_type: '',
        quantity: 0,
        total_price: 0,
        status: '',
        description: '',
        image: ''
    })

    const viewPack = view => {
        setOpenPackage(true)
        setPackageDetails(view)
    }

    return (
        <div className={`${status ? 'fixed w-full h-full bg-slate-900/90 top-0 left-0 z-50 flex justify-center items-center' : 'hidden'}`}>
                <ViewPackage status={openPackage} setStatus={setOpenPackage} details={packageDetails} />
                <div className="w-full md:w-3/5 bg-white rounded-lg p-6 relative">
                    <button
                        onClick={()=>setStatus(false)}
                        className="absolute right-2 top-2"
                    >
                        <AiOutlineClose className="w-5 h-5 hover:text-red-600" />
                    </button>
                    <div className="w-full flex gap-2 items-center">
                        <div className="relative w-full md:w-1/2 h-80">
                            <Image 
                                src={`data:image/jpg;image/jpeg;image/png;base64, ${details?.package?.image}`}
                                alt="package-image"
                                layout="fill"
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-3">
                            <div>
                                <label className="text-xs font-bold">Schedule</label>
                                <input 
                                    type="text"
                                    className="w-full p-1 border border-slate-900 rounded-lg"
                                    name="date"
                                    value={details.order_date}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold">Location</label>
                                <input 
                                    type="text"
                                    className="w-full p-1 border border-slate-900 rounded-lg"
                                    name="location"
                                    value={details.location}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold">Quantity</label>
                                <input 
                                    type="number"
                                    className="w-full p-1 border border-slate-900 rounded-lg"
                                    name="quantity"
                                    value={details.quantity}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold">Services</label>
                                <input 
                                    type="text"
                                    className="w-full p-1 border border-slate-900 rounded-lg"
                                    name="services"
                                    value={details.services}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold">Message (Optional)</label>
                                <input 
                                    type="text"
                                    className="w-full p-1 border border-slate-900 rounded-lg"
                                    name="message"
                                    value={details.message}
                                    readOnly
                                />
                            </div>
                            <div className="flex gap-2 justify-between items-center text-white mt-2">
                                {/* <button
                                    onClick={bookNow}
                                    className="w-1/2 p-2 rounded-lg bg-teal-400 hover:bg-teal-500"
                                >
                                    book now
                                </button>
                                <button
                                    onClick={cancel}
                                    className="w-1/2 p-2 rounded-lg bg-rose-400 hover:bg-rose-500"
                                >
                                    cancel
                                </button> */}
                                <button
                                    className="w-1/2 p-2 rounded-lg bg-teal-400 hover:bg-teal-500"
                                    onClick={()=>viewPack(details.package)}
                                >
                                    view package
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}