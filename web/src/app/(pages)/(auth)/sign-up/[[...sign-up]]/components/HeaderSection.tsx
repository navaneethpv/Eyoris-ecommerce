'use client';
import React from 'react'
import Link from 'next/link'
const HeaderSection = () => {
  return (
    <div>
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Looks like you are new to Eyoris
            </h2>
            {/* Email display */}
            <p className="text-sm text-gray-600 flex items-center">
              <span className="font-medium text-gray-900 mr-1">
                example@gmail.com
              </span>
              <Link href="/signin" className="text-blue-600 hover:text-blue-500 font-medium">
                Change
              </Link>
            </p>
          </div>
    </div>
  )
}

export default HeaderSection