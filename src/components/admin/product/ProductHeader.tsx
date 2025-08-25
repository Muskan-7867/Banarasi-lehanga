import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ProductHeader() {
  return (
    <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Products</h1>
      <p className="text-gray-600">
        Manage your cricket equipment inventory
      </p>
    </div>
    <div className="flex gap-2">
      {/* <Link
        href="/admin/products/category"
        className="inline-flex items-center px-4 py-2 app-color text-white rounded-lg hover:bg-main transition-colors"
      >
        <Plus className="mr-2" size={16} />
        Add Category
      </Link> */}
      <Link
        href="/admin/products/size-quality-color"
        className="inline-flex items-center px-4 py-2 app-color text-white rounded-lg hover:bg-main transition-colors"
      >
        <Plus className="mr-2" size={16} />
        Add Product Attributes
      </Link>
      <Link
        href="/admin/products/new"
        className="inline-flex items-center px-4 py-2 app-color text-white rounded-lg hover:bg-main transition-colors"
      >
        <Plus className="mr-2" size={16} />
        Add Product
      </Link>
    </div>
  </div>
  )
}
