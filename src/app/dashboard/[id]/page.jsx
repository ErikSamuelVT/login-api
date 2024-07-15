"use client"
import { useEffect, useState } from "react"
import { deleteUsers, getUserById, updateUserById } from "@/libs/request/users"
import { useParams, useRouter } from "next/navigation"

export default function Edit() {

  const [user, setUser] = useState({ username: 'username', password: 'password' })

  const router = useRouter()
  const { id } = useParams()

  const deleteUser = async () => {
    const confirmDelete = confirm("Are you sure?")

    if (!confirmDelete) return

    const res = await deleteUsers(id)

    if (res.error === true && res.status !== 200) {
      alert(res.message)
      return
    }
    if (res.error === false && res.status === 200) router.push('/dashboard')
  }

  const getUser = async () => {
    const res = await getUserById(id)

    if (res.error === true && res.status !== 200) router.push('/dashboard')

    setUser(res.user)
  }

  const handleChange = (name, value) => {
    setUser((prevState) => { return { ...prevState, [name]: value } })
  }

  const updateUser = async () => {
    const updatedUser = {
      username: user.username,
      password: user.password
    }
    const res = await updateUserById(id, updatedUser)

    if (res.error === true && res.status !== 200) {
      alert(res.message)
      return
    }
    if (res.error === false && res.status === 200) router.push('/dashboard')
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <section className="text-gray-600 body-font relative h-full">
      <div className="flex items-center justify-center">
        <div className="w-3/4 md:w-1/3 bg-white flex flex-col md:py-8 mt-8 md:mt-0">
          <p className="leading-relaxed mb-5 text-gray-600">
            Here you will be able to update your registration
            <br />
            <span className='font-semibold my-3'>Note: </span>Only the username and password can be updated because the email is unique.
          </p>
          <div className="relative mb-4">
            <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
            <input type="text" id="username" name="username" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={user.username} onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={user.password} onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <button className="w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={updateUser}>Update</button>
            <button className="w-full text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg" onClick={deleteUser}>Delete</button>
          </div>
        </div>

      </div>
    </section>
  )
}
