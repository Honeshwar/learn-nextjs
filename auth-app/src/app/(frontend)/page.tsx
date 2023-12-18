import Link from "next/link"

export default function Home() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Link href="/signup">Register</Link>
    </div>
    )
}
