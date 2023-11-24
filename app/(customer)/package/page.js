'use client'

import CustomerTop from "@/app/components/navigation/customerTop"
import Side from "@/app/components/navigation/side"
import { useEffect, useState } from "react"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import PackageCard from "@/app/components/cards/packageCard"

export default function Packages () {

    const [packages, setPackages] = useState([])

    useEffect(()=>{
        const getData = async () => {
            try {
                await csrf()
                await axios.get('/api/package/index')
                .then(res=>{
                    setPackages(res.data.data)
                })
                .catch(err=>{
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <>
            <CustomerTop />
            <Side />
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <p className="text-3xl font-bold">Packages</p>
                <section className="w-full h-[28rem] overflow-y-scroll flex flex-wrap gap-8 justify-center p-6 mt-8">
                    {
                        packages.map((item,id)=>{
                            return (
                                <PackageCard key={id} source={item.image} name={item.name} price={item.total_price} packageItem={item} />
                            )
                        })
                    }
                </section>
            </main>
        </>
    )
}