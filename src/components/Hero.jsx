import Image from 'next/image'
import HeroImage from '../assets/hero-image.svg'

export default function Hero() {
  return (
    <section className="text-gray-600 body-font" >
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-5xl text-3xl mb-4 font-medium text-indigo-500">
            LOGIN API
          </h1>
          <p className="mb-8 leading-relaxed sm:text-3xl">
            A quick way to have a ready login, <b>exclusively for testing and development</b> of your application in localhost
          </p>
          <div className="flex justify-center">
            <a href="#howtouse" className="inline-flex text-indigo-500 hover:underline text-2xl">
              How to use?
            </a>

          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image className="object-cover object-center rounded" alt="hero" src={HeroImage} priority={true} />
        </div>
      </div>
    </section>
  )
}
