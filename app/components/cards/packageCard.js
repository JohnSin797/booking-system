'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import jwt from "jsonwebtoken"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { AiOutlineClose } from "react-icons/ai"
import AverageStarRating from "../averageStarRating"

export default function PackageCard ({ source, name, price, packageItem }) {

    const [user,setUser] = useState({})
    const router = useRouter()
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [bookingForm, setBookingForm] = useState({
        location: '',
        date: '',
        message: '',
        quantity: 0,
        services: ''
    })
    const [averageStar, setAverageStar] = useState(null)

    const handleBookingForm = e => {
        const {name, value} = e.target
        setBookingForm({
            ...bookingForm,
            [name]: value
        })
    }

    function getAverage() {
        let total = 0
        let index = 0
        packageItem?.rating?.forEach(element => {
            total += element?.stars
            index++
        })
        const ave = total / index
        setAverageStar(ave)
    }

    useEffect(()=>{
        if (typeof(window) !== 'undefined' && localStorage) {
            const token = localStorage.getItem('user_token')
            const decoded = jwt.decode(token, {complete: true})
            setUser(decoded?.payload)
        }
        getAverage()
    }, [])

    const confirmBooking = () => {
        if (!user?.role) {
            Swal.fire({
                title: 'You are not logged in',
                text: 'Do you want to continue booking?',
                icon: 'warning',
                showCancelButton: true,
                showConfirmButton: true
            })
            .then(res=>{
                if (res.isConfirmed) {
                    router.push('/auth/login')
                }
            })
        } else {
            setOpenConfirmation(true)
        }
    }

    const bookNow = async () => {
        try {
            console.log(bookingForm)
            await csrf()
            await axios.post('/api/booking/store', {
                package_id: packageItem.id, 
                user_id: user.id,
                message: bookingForm.message,
                location: bookingForm.location,
                date: bookingForm.date,
                quantity: bookingForm.quantity,
                services: bookingForm.services
            })
            .then(res=>{
                cancel()
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const cancel = () => {
        setBookingForm({
            location: '',
            date: '',
            message: ''
        })
        setOpenConfirmation(false)
    }

    return (
        <div className='w-full md:w-[23%] bg-slate-900 h-80 border-slate-900 border'>
            <div className={`${openConfirmation ? 'fixed w-full h-full bg-slate-900/90 top-0 left-0 z-50 flex justify-center items-center' : 'hidden'}`}>
                <div className="w-full md:w-3/5 bg-white rounded-lg p-6 relative">
                    <button
                        onClick={()=>setOpenConfirmation(false)}
                        className="absolute right-2 top-2"
                    >
                        <AiOutlineClose className="w-5 h-5 hover:text-red-600" />
                    </button>
                    <div className="w-full flex gap-2 items-center">
                        <div className="relative w-full md:w-1/2 h-80">
                            <Image 
                                src={`data:image/jpg;image/jpeg;image/png;base64, ${source}`}
                                alt="package-image"
                                layout="fill"
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-3">
                            <div>
                                <label className="text-xs font-bold">Date</label>
                                <input 
                                    type="datetime-local"
                                    className="w-full p-1 border border-slate-900 rounded-lg"
                                    name="date"
                                    onChange={handleBookingForm}
                                    value={bookingForm.date}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold">Location</label>
                                <input 
                                    type="text"
                                    className="w-full p-1 border border-slate-900 rounded-lg"
                                    name="location"
                                    onChange={handleBookingForm}
                                    value={bookingForm.location}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold">Quantity</label>
                                <input 
                                    type="number"
                                    className="w-full p-1 border border-slate-900 rounded-lg"
                                    name="quantity"
                                    onChange={handleBookingForm}
                                    value={bookingForm.quantity}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold">Services</label>
                                <select
                                    className="w-full p-1 border border-slate-900 rounded-lg"
                                    name="services"
                                    onChange={handleBookingForm}
                                    value={bookingForm.services}
                                >
                                    <option>Select Services</option>
                                    <option value={'home surprise'}>Home Surprise</option>
                                    <option value={'car surprise'}>Car Surprise</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold">Message (Optional)</label>
                                <input 
                                    type="text"
                                    className="w-full p-1 border border-slate-900 rounded-lg"
                                    name="message"
                                    onChange={handleBookingForm}
                                    value={bookingForm.message}
                                />
                            </div>
                            <div className="flex gap-2 justify-between items-center text-white mt-2">
                                <button
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
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-60 relative'>
                <Image 
                    src={`data:image/jpg;image/jpeg;image/png;base64, ${source}`}
                    alt="package-img"
                    layout="fill"
                />
            </div>
            <div className="w-full flex items-center justify-between p-3 text-white">
                <div>
                    <div>
                        <AverageStarRating star={averageStar} />
                    </div>
                    <p className="text-center font-bold">{name}</p>
                    <p>
                        {
                            Number(price).toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            })
                        }
                    </p>
                </div>
                <button
                    onClick={confirmBooking}
                    className="bg-teal-400 hover:bg-teal-500 p-2 font-bold w-1/3"
                >
                    BOOK
                </button>
            </div>
        </div>
    )
}