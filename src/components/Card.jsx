import Image from 'next/image'

export default function Card({ img, title, parameters, method, url, code }) {
  return (
    <div className="xl:w-1/3 md:w-1/2 p-4 w-full">
      <div className="border border-gray-200 p-6 rounded-lg">

        <div className="flex gap-3 items-center">
          <Image className='h-16 w-16' src={img} alt='Image from undraw' />
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{title}</h2>
        </div>
        <h3 className='font-semibold my-3'>Required parameters: <span className='font-normal '>{parameters}</span></h3>
        {title === 'All users' || title === 'User by id' ? <h3><span className='font-semibold my-3'>Note: </span>Remember that the password is encrypted.</h3> : <></>}
        <h3 className='font-semibold'>Request:</h3>
        <pre className='bg-gray-100 overflow-x-auto p-3 ' tabIndex={0}>
          <code>
            <span>
              [{`${method}`}] http://localhost:3000/api{`${url}`}
            </span>
          </code>
        </pre>
        <br />
        <h3 className='font-semibold'>Output:</h3>
        <pre className='bg-gray-100 p-3 ' tabIndex={0} white-space="pre">
          <code>
            <span>
              {JSON.stringify(code, null, 2)}
            </span>
          </code>
        </pre>

      </div>
    </div>
  )
}
