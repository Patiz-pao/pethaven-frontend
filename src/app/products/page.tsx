"use client"
import React, { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const products: Product[] = [
    {
      id: 1,
      name: "อาหารแมวพรีเมียม",
      price: 299,
      category: "อาหาร",
      image: "/api/placeholder/200/200",
      description: "อาหารแมวคุณภาพสูง สำหรับแมวทุกวัย"
    },
    {
      id: 2,
      name: "ของเล่นสุนัข",
      price: 159,
      category: "ของเล่น",
      image: "/api/placeholder/200/200",
      description: "ของเล่นยางกัดสำหรับสุนัข ทนทาน"
    },
    {
      id: 3,
      name: "ที่นอนแมว",
      price: 590,
      category: "เครื่องนอน",
      image: "/api/placeholder/200/200",
      description: "ที่นอนนุ่มสบาย ขนาดพอดีสำหรับแมว"
    },
    {
      id: 4,
      name: "ชามอาหารสุนัข",
      price: 199,
      category: "อุปกรณ์",
      image: "/api/placeholder/200/200",
      description: "ชามอาหารสแตนเลส ทำความสะอาดง่าย"
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-100">
      <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาสินค้า..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button className="p-2 rounded-full bg-purple-100 hover:bg-purple-200">
                <ShoppingCart className="text-purple-600" size={24} />
              </button>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-purple-600 font-bold">฿{product.price}</span>
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