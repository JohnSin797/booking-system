'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import jwt from "jsonwebtoken"

export default function Auth () {
    const router = useRouter()

    const update = async (user, load) => {
        try {
            await axios.post('/api/user/authorize', user)
            .then(res=>{
                localStorage.setItem('user_token', res.data.data)
                load()
            })
        } catch (error) {
            console.log(error)
        }
    }

    const authorize = async (user) => {
        try {
            await axios.post('/api/user/authorize', user)
            .then(res=>{
                localStorage.setItem('user_token', res.data.data)
                if (user.role == 'admin') {
                    router.push('/dashboard')
                } else {
                    router.push('/home')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            await axios.get('/api/user/logout')
            .then(res=>{
                localStorage.removeItem('user_token')
                router.push('/')
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return {authorize, logout, update}
}