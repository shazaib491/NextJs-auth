import { useRouter } from 'next/router'
import React from 'react'

export default function AboutPage() {
    let allRoutes=useRouter();
    console.log(allRoutes.query)
  return (
    <div>AboutPage</div>
  )
}
