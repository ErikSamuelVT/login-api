"use client"
import Link from "next/link"

export default function TableRow({ subId, id, username, email, password, createdAt }) {

  const date = new Date(createdAt).toLocaleDateString()

  return (

    <tr className="text-center">
      <td className="px-4 py-3">{subId}</td>
      <td className="px-4 py-3">{username}</td>
      <td className="px-4 py-3">{email}</td>
      <td className="px-4 py-3 max-w-32 text-ellipsis overflow-hidden">{password}</td>
      <td className="px-4 py-3">{date}</td>
      <td className="px-4 py-3">
        <Link href={`/dashboard/${id}`} className="hover:font-semibold hover:text-indigo-700 hover:cursor-pointer hover:underline">Edit</Link>
      </td>
    </tr>
  )
}
