"use client"
import { useState } from "react"
import { saveUser } from "@/libs/request/users"
import { useRouter } from "next/navigation"

export default function Add() {

  const [user, setUser] = useState({ username: '', email: '', password: '' })

  const router = useRouter()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await saveUser(user)

    if (res.error === true && res.status !== 200) {
      alert(res.message)
      return
    }
    if (res.error === false && res.status === 200) router.push('/dashboard')
  }

  return (
    <section className="text-gray-600 body-font relative h-full">
      <div className="flex items-center justify-center">
        <div className="w-3/4 md:w-1/3 bg-white flex flex-col md:py-8 mt-8 md:mt-0">
          <p className="leading-relaxed mb-5 text-gray-600">
            Here you will be able to add a new register
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
              <input type="text" id="username" name="username" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => handleChange(e)} value={user.username} />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => handleChange(e)} value={user.email} />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => handleChange(e)} value={user.password} />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3">
              <button className="w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add</button>
            </div>
          </form>
        </div>
      </div>
    </section >
  )
}
