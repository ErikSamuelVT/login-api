import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col justify-center items-center ">
            <h1 className="font-semibold uppercase mb-3">Not Found | Error 404</h1>
            <Link href="/" className="px-3 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Home</Link>
        </div>
    )
}
