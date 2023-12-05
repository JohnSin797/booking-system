'use client'

import CustomerTop from "@/app/components/navigation/customerTop"
import Side from "@/app/components/navigation/side"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import jwt from "jsonwebtoken"
import DashboardItem from "@/app/components/cards/dashboardItem"
import { BsCheckSquare, BsFillPersonFill } from "react-icons/bs"
import { IoHourglassOutline } from "react-icons/io5"
import { TbShoppingCartCancel } from "react-icons/tb"
import { HiMagnifyingGlass } from "react-icons/hi2"
import Feedback from "@/app/components/feedback"
import FeedbackInput from "@/app/components/feedbackInput"
import Product from "@/app/components/cards/product"
import Swal from "sweetalert2"

export default function Home () {

    const [feedbacks, setFeedbacks] = useState([])
    const [products, setProducts] = useState([])
    const [bookingDetails, setBookingDetails] = useState({
        confirmed: 0,
        cancelled: 0,
        pending: 0
    })
    const [keyword, setKeyword] = useState('')

    function processBookingDetails(arr) {
        let details = {
            confirmed: 0,
            cancelled: 0,
            pending: 0
        }
        arr.forEach(element => {
            if (element.status == 'confirmed') {
                details['confirmed']++
            }
            if (element.status == 'pending') {
                details['pending']++
            }
            if (element.status == 'cancelled') {
                details['cancelled']++
            }
        })
        setBookingDetails(details)
    }

    const getBookingDetails = async (id) => {
        try {
            await csrf()
            await axios.post('/api/booking/show', {user_id: id})
            .then(res=>{
                processBookingDetails(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getProducts = async () => {
        try {
            await csrf()
            await axios.get('/api/product/index')
            .then(res=>{
                setProducts(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getFeedbacks = async () => {
        try {
            await csrf()
            await axios.get('/api/package/index')
            .then(res=>{
                setFeedbacks(res.data.feedback)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if (typeof(window) !== 'undefined' && localStorage) {
            const token = localStorage.getItem('user_token')
            const decoded = jwt.decode(token, {complete: true})
            getFeedbacks()
            getProducts()
            getBookingDetails(decoded?.payload?.id)
        }
    }, [])

    const searchProduct = async (e) => {
        try {
            e.preventDefault()
            await csrf()
            await axios.post('/api/product/search', {keyword: keyword})
            .then(res=>{
                setProducts(res.data.data)
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
        <>
            <CustomerTop />
            <Side />
            <main className="absolute w-full md:w-4/5 top-24 right-0 p-6">
                <section className="w-full flex flex-col md:flex-row gap-2 items-center md:sticky top-16 bg-white p-6 z-10">
                    <form onSubmit={searchProduct} className="w-full flex border border-slate-900 gap-2 items-center rounded-lg p-1">
                        <HiMagnifyingGlass className="border-slate-900 w-8 h-8" />
                        <input
                            type="text"
                            className="rounded-lg p-2 outline-none"
                            onChange={e=>setKeyword(e.target.value)}
                            placeholder="Search Products"
                        />
                    </form>
                    <DashboardItem className={'w-full md:w-[23%] border border-slate-900'} title={'pending'} details={bookingDetails.pending}>
                        <IoHourglassOutline className="w-20 h-20 text-white bg-teal-400" />
                    </DashboardItem>
                    <DashboardItem className={'w-full md:w-[23%] border border-slate-900'} title={'cancelled'} details={bookingDetails.cancelled}>
                        <TbShoppingCartCancel className="w-20 h-20 text-white bg-amber-400" />
                    </DashboardItem>
                    <DashboardItem className={'w-full md:w-[23%] border border-slate-900'} title={'confirmed'} details={bookingDetails.confirmed}>
                        <BsCheckSquare className="w-20 h-20 text-white bg-indigo-400" />
                    </DashboardItem>
                </section>
                <section className="w-full mt-20">
                    <p className="text-xl md:text-3xl text-center font-bold">Products</p>
                    <p className="text-sm md:text-base text-center underline">Here's our available products</p>
                    <div className="flex flex-wrap gap-5 mt-10 md:p-6">
                        {
                            products.map((prod,idx)=>{
                                return (
                                    <Product key={idx} details={prod} />
                                )
                            })
                        }
                    </div>
                </section>
                <section className='w-full'>
                    <p className='text-center text-3xl font-bold mt-20'>Rating and Feedback</p>
                    <div className='mt-10'>
                        <Feedback getData={getFeedbacks} />
                        <div className='w-full p-6 md:p-20 space-y-4'>
                            {
                            feedbacks.map((item,id)=>{
                                return (
                                <FeedbackInput key={id} item={item} getData={getFeedbacks} />
                                )
                            })
                            }
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}