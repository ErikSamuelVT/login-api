import Login from '../assets/content-login.svg'
import Register from '../assets/content-register.svg'
import Admin from '../assets/content-admin.svg'
import AdminById from '../assets/content-adminbyid.svg'
import AdminUpdate from '../assets/content-update.svg'
import AdminDelete from '../assets/content-delete.svg'

import { login, register, admin, adminById, adminUpdate, adminDelete } from '@/libs/outputs'
import Card from './Card'

export default function Content() {

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" id='howtouse'>How to use</h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Using API login is very simple. Just make a request to the urls below to get a response.
            Depending on the method of the request will be the response, remember that Login API provides you with a login and a CRUD of users making use of the database provided by mongodb atlas.</p>
        </div>
        <div className="flex flex-wrap -m-4">
          <Card
            img={Login}
            title={"Login"}
            parameters={"email, password"}
            method={"POST"}
            url={"/login"}
            code={login}
          />

          <Card
            img={Register}
            title={"Register"}
            parameters={"username, email, password"}
            method={"POST"}
            url={"/register"}
            code={register}
          />

          <Card
            img={Admin}
            title={"All users"}
            parameters={"Not need"}
            method={"GET"}
            url={"/admin"}
            code={admin}
          />

          <Card
            img={AdminById}
            title={"User by id"}
            parameters={"id"}
            method={"POST"}
            url={"/admin/[id]"}
            code={adminById}
          />

          <Card
            img={AdminUpdate}
            title={"Update by id"}
            parameters={"id"}
            method={"PUT"}
            url={"/admin/[id]"}
            code={adminUpdate}
          />

          <Card
            img={AdminDelete}
            title={"Delete by id"}
            parameters={"id"}
            method={"DELETE"}
            url={"/admin/[id]"}
            code={adminDelete}
          />
        </div>
      </div>
    </section >
  )
}
