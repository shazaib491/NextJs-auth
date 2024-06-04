import { useParams } from 'next/navigation'
import React from 'react'

export default function AboutDynamicDetail() {
    const currentParam=useParams();
    console.log(currentParam)
  return (
    <div>AboutDynamicDetail</div>
  )
}
