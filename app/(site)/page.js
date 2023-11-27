'use client'

import Image from 'next/image'
import Footer from '../components/footer'
import Top from '../components/navigation/top'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { csrf } from '../hooks/csrf'
import axios from '../lib/axios'
import ImagePreview from '../components/imagePreview'
import PackageCard from '../components/cards/packageCard'
import StarChart from '../components/starChart'
import Feedback from '../components/feedback'
import DateFrame from '../components/dateFrame'
import StarRate from '../components/starRate'
import StarRating from '../components/starRating'
import FeedbackInput from '../components/feedbackInput'

export default function Home() {

  const [packages, setPackages] = useState([])
  const [reply, setReply] = useState('')
  const [openReply, setOpenReply] = useState([])
  const [feedbacks, setFeedbacks] = useState([])

  const getData = async () => {
    try {
      await csrf()
      await axios.get('/api/package/index')
      .then(res=>{
        console.log(res)
        setPackages(res.data.data)
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
    getData()
  }, [])

  return (
    <main className='mt-24'>
      <Top />
      <section className='mt-24 w-full px-10 py-6'>
        <div className='w-full h-96 banner relative'>
          <Link href={'/auth/login'} className='block bg-green-400 p-2 text-white absolute bg-green-600 hover:bg-green-500 right-20 top-40'>BOOK NOW</Link>
        </div>
      </section>
      <section className='mt-20 w-full p-6 space-y-10'>
        <p className='text-center font-bold underline'>Here you can book the gift</p>
        <div className='flex flex-wrap gap-8 justify-center'>
          {
            packages.map((item,index)=>{
              return (
                <PackageCard key={index} source={item.image} name={item.name} price={item.total_price} packageItem={item} />
              )
            })
          }
        </div>
      </section>
      <section className='mt-20 w-full'>
        <p className='text-center text-xl md:text-3xl font-bold'>Rating and Feedback</p>
        <p className='text-center text-sm md:text-md'>Check out what our customers have to say:</p>
        <div className='mt-10'>
          <StarRating />
          <Feedback getData={getData} />
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
      <Footer />
    </main>
  )
}
