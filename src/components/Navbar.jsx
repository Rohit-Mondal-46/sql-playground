"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link href="/" className="font-bold text-2xl text-blue-700 hover:text-blue-900">
        SQL Playground
      </Link>
    </nav>
  );
}
