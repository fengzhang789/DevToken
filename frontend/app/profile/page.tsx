"use client";

import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'

const Page = () => {
  const searchParams = useSearchParams();
  
  const code = useMemo(() => {
    return searchParams.get("code")
  }, [searchParams])

  return (
    <div>page</div>
  )
}

export default Page