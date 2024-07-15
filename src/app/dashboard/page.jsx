import TableRow from "@/components/TableRow"
import { getUsers } from "@/libs/request/users"
import Link from "next/link"

export default async function Dashboard() {

  const res = await getUsers()

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Dashboard</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Here you can view and modify the records you have in the database
            <br />
            <span className='font-semibold my-3'>Note: </span>Remember that the password is encrypted.
          </p>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">

          <Link href="/dashboard/add" className="hover:font-semibold hover:text-indigo-700 hover:cursor-pointer hover:underline">Add</Link>

          <table className="my-3 table-auto w-full text-left whitespace-no-wrap">
            <thead className="text-center">
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Id</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Username</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Email</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Password</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Created at</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Operations</th>
              </tr>
            </thead>
            <tbody>
              {
                (res.error === false && res.status === 200) &&
                res.users.map((user, i) => (
                  <TableRow key={i} subId={i + 1} id={user._id} username={user.username} email={user.email} password={user.password} createdAt={user.createdAt} />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </section >
  )
}