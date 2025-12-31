import React from 'react'
import { useState } from 'react'
import { useNavigate , useParams } from 'react-router-dom'
   
export const ProductPage = () => {
  
  const { id } = useParams<{id:string}>()

  const navigate = useNavigate()

  const [product,setProduct] = useState<Product | null>(null)
  return (
    <div>ProductPage</div>
  )
}
