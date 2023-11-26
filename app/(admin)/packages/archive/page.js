'use client'

import DateFrame from "@/app/components/dateFrame"
import ImagePreview from "@/app/components/imagePreview"
import AdminNav from "@/app/components/navigation/adminNav"
import AdminTopNav from "@/app/components/navigation/adminTopNav"
import { csrf } from "@/app/hooks/csrf"
import axios from "@/app/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BsTrashFill } from "react-icons/bs"
import { FaTrashRestoreAlt } from "react-icons/fa"
import { TbFidgetSpinner } from "react-icons/tb"
import Swal from "sweetalert2"

export default function Archive ()
{
    const [isLoading, setIsLoading] = useState(false)
    const [packages, setPackages] = useState([])

    const getData = async () => {
        try {
            setIsLoading(true)
            await csrf()
            await axios.get('/api/package/archive')
            .then(res=>{
                setPackages(res.data.data)
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
    }, [])

    const confirmDelete = id => {
        Swal.fire({
            title: 'Delete Package',
            icon: 'warning',
            text: 'Deleting from the Archive means permanent delete. Are you sure you want to delete Package?',
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                deletePackage(id)
            }
        })
    }

    const deletePackage = async (id) => {
        try {
            await csrf()
            await axios.post('/api/package/destroy', {id: id})
            .then(res=>{
                getData()
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const confirmRestore = id => {
        Swal.fire({
            title: 'Restore',
            icon: 'question',
            text: 'Are you sure you want to restore Package?',
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                restorePackage(id)
            }
        })
    }

    const restorePackage = async (id) => {
        try {
            await csrf()
            await axios.post('/api/package/restore', {id: id})
            .then(res=>{
                getData()
                Swal.fire(res.data.message)
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
            <AdminTopNav />
            <AdminNav />
            <main className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <section className="flex justify-between items-center">
                    <p className="text-3xl font-bold">Package Archive</p>
                    <Link
                        href={'/packages'}
                        className="w-full md:w-1/5 p-1 bg-gray-400 hover:bg-gray-400/80 text-white text-center block"
                    >
                        back
                    </Link>
                </section>
                <section className="w-full rounded-lg shadow-md border border-slate-900 p-6 mt-10">
                    <div className="w-full h-96 overflow-y-scroll relative">
                        {
                            isLoading ?
                            <div className="absolute w-full h-full bg-slate-900 text-white flex justify-center items-center">
                                <TbFidgetSpinner className="w-5 h-5 animate-spin" />
                            </div>
                            :
                            <table className="w-full table-fixed">
                                <thead className="w-full sticky top-0">
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Date Deleted</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        packages.map((item,id)=>{
                                            return <tr key={id} className="border-b border-slate-900">
                                                    <td className="p-2 text-blue-400 font-bold">{item?.name}</td>
                                                    <td className="p-2 text-blue-400">{item?.total_price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td className="p-2 text-teal-400">{item?.quantity}</td>
                                                    <td className="p-2 text-indigo-400">{item?.status}</td>
                                                    <td className="p-2 text-rose-400"><DateFrame dateStr={item?.deleted_at} /></td>
                                                    <td className="p-2 text-cyan-400">{item?.description}</td>
                                                    <td className="p-2"><ImagePreview source={item?.image} /></td>
                                                    <td className="text-white flex gap-2 p-2">
                                                        <button
                                                            onClick={()=>confirmRestore(item.id)}
                                                            className="bg-teal-400 hover:bg-teal-500 p-2 rounded-lg"
                                                        >
                                                            <FaTrashRestoreAlt className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={()=>confirmDelete(item.id)}
                                                            className="p-2 bg-rose-600 hover:bg-rose-700 rounded-lg"
                                                        >
                                                            <BsTrashFill className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </section>
            </main>
        </>
    )
}