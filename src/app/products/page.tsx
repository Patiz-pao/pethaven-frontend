"use client";
import React from "react";
import { Search, ShoppingCart, Plus } from "lucide-react";
import { useProducts } from "@/app/api/useProducts";
import Link from "next/link";

const Products = () => {
  const { loading, error, searchTerm, setSearchTerm, filteredProducts } =
    useProducts();

  if (loading) {
    return (
      <div className="bg-blue-100 opacity-80 min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <div className="text-blue-600 font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-4">
            <Link href="/addproducts" className="p-2 rounded-full bg-purple-100 hover:bg-purple-200">
              <Plus className="text-purple-600" size={24} />
            </Link>
            <div className="relative">
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
            <button className="p-2 rounded-full bg-purple-100 hover:bg-purple-200">
              <ShoppingCart className="text-purple-600" size={24} />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="container mx-auto px-4 py-2 text-red-500">{error}</div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-2 font-bold">
                  {product.brand}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-purple-600 font-bold">
                    ฿{product.price.toLocaleString()}
                  </span>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    เพิ่มลงตะกร้า
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
