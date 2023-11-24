'use client'

import DashboardItem from "@/app/components/cards/dashboardItem"
import LineChart from "@/app/components/dashboard/lineChart"
import PieChart from "@/app/components/dashboard/pieChart"
import Feedback from "@/app/components/feedback"
import FeedbackInput from "@/app/components/feedbackInput"
import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import { useEffect, useState } from "react"
import { BsFillPersonFill, BsCheckSquare } from "react-icons/bs"
import { IoHourglassOutline } from "react-icons/io5"
import { TbShoppingCartCancel } from "react-icons/tb"

export default function Dashboard () {

    const [isLoading, setIsLoading] = useState(false)
    const [bookingDetails, setBookingDetails] = useState({
        confirmed: 0,
        cancelled: 0,
        pending: 0
    })
    const [userCount, setUserCount] = useState(0)
    const [pieDetails, setPieDetails] = useState([0,0,0])
    const [incomeDetails, setIncomeDetails] = useState(new Array(12).fill(0))
    const [feedbacks, setFeedbacks] = useState([])

    function processBookingDetails(arr) {
        const currentDate = new Date()
        let details = {
            confirmed: 0,
            cancelled: 0,
            pending: 0
        }
        arr.forEach(element => {
            console.log(element.status)
            if (element.status == 'confirmed' && new Date(element.order_date).getFullYear() === currentDate.getFullYear() && new Date(element.order_date).getMonth() === currentDate.getMonth()) {
                details['confirmed']++
            }
            if (element.status == 'cancelled' && new Date(element.order_date).getFullYear() === currentDate.getFullYear() && new Date(element.order_date).getMonth() === currentDate.getMonth()) {
                details['cancelled']++
            }
            if (element.status == 'pending' && new Date(element.order_date).getFullYear() === currentDate.getFullYear() && new Date(element.order_date).getMonth() === currentDate.getMonth()) {
                details['pending']++
            }
        })
        setPieDetails([details.confirmed, details.pending, details.cancelled])
        setBookingDetails(details)
    }

    function processIncome(arr) {
        var incomeArr = new Array(12).fill(0)
        const currentYear = new Date().getFullYear()
        arr.forEach(element=>{
            if (element.order_date.slice(0,4) === currentYear.toString() && element.status === 'confirmed') {
                const month = parseInt(element?.order_date?.slice(5,7), 10)
                incomeArr[month-1] += element?.package?.total_price
            }
        })
        setIncomeDetails(incomeArr)
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

    const getData = async () => {
        try {
            setIsLoading(true)
            await csrf()
            await axios.get('/api/booking/index')
            .then(res=>{
                processBookingDetails(res.data.data)
                setUserCount(res.data.user)
                processIncome(res.data.data)
                setIsLoading(false)
            })
            .catch(err=>{
                console.log(err)
                setIsLoading(false)
            })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getData()
        getFeedbacks()
    }, [])

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Income',
            data: incomeDetails,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 1)',
          },
        ],
    }
      
    const options = {
        responsive: true,
        scales: {
            y:{
                grid: {
                    drawBorder: true,
                    color: '#FFFFFF',
                },
                ticks:{
                    beginAtZero: true,
                    color: 'white'
                }
            },
            x: {
                grid: {
                    drawBorder: true,
                    color: '#FFFFFF',
                },
                ticks:{
                    beginAtZero: true,
                    color: 'white'
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white', 
                },
            },
            title: {
                display: true,
                text: '',
                color: 'white'
            },
        },
    }

    const pieData = {
        labels: ['Confirmed', 'Pending', 'Cancelled'],
        datasets: [
          {
            data: pieDetails,
            backgroundColor: ['green', 'yellow', 'red'],
          },
        ],
      };
      
      const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white', 
                },
            },
            title: {
                display: true,
                text: '',
                color: 'white'
            },
        },
      }

    return (
        <>
            <AdminTopNav />
            <AdminNav />
            <main className="absolute top-20 right-0 w-4/5 p-6 space-y-2">
                <section className="w-full flex gap-2 sticky top-16 bg-white p-6">
                    <DashboardItem className={'w-[23%] border border-slate-900'} title={'total customer'} details={userCount}>
                        <BsFillPersonFill className="w-20 h-20 text-white bg-cyan-400" />
                    </DashboardItem>
                    <DashboardItem className={'w-[23%] border border-slate-900'} title={'pending'} details={bookingDetails.pending}>
                        <IoHourglassOutline className="w-20 h-20 text-white bg-teal-400" />
                    </DashboardItem>
                    <DashboardItem className={'w-[23%] border border-slate-900'} title={'cancelled'} details={bookingDetails.cancelled}>
                        <TbShoppingCartCancel className="w-20 h-20 text-white bg-amber-400" />
                    </DashboardItem>
                    <DashboardItem className={'w-[23%] border border-slate-900'} title={'confirmed'} details={bookingDetails.confirmed}>
                        <BsCheckSquare className="w-20 h-20 text-white bg-indigo-400" />
                    </DashboardItem>
                </section>
                <section className="flex gap-2">
                    <div className="h-96 w-2/3 bg-cyan-600 p-6">
                        <LineChart data={data} options={options} />
                    </div>
                    <div className="h-96 w-1/3 bg-indigo-600 p-6">
                        <PieChart data={pieData} options={pieOptions} />
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
                                <FeedbackInput key={id} item={item} getData={getData} />
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