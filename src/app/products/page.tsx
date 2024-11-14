"use client";
import React, { useState } from "react";
import { Plus, Star } from "lucide-react";
import { useProducts } from "@/app/api/useProducts";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RatingStarsProps = {
  rating: number;
};

const RatingStars = ({ rating }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <Star key={`full-${index}`} className="text-yellow-500" />
        ))}
      {halfStar === 1 && (
        <Star
          key="half"
          className="text-yellow-500"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <Star key={`empty-${index}`} className="hidden" />
        ))}
    </div>
  );
};

const Products = () => {
  const { loading, searchTerm, setSearchTerm, products } = useProducts();
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrand, setSelectedBrand] = useState("all");

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], priceRange[1]]);
  };

  const filteredProducts = products.filter((product) => {
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand =
      selectedBrand === "all" || product.brand === selectedBrand;
    return matchesPrice && matchesBrand;
  });

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
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="products/add"
              className="p-2 rounded-full bg-purple-100 hover:bg-purple-200"
            >
              <div className="flex gap-1 items-center">
                <Plus className="text-blue-600" size={24} />
                <p>เพิ่มรายการสินค้า</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="block lg:grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <div className="bg-white rounded-lg p-4 shadow-md mb-5">
              <h2 className="text-lg font-semibold mb-4">หมวดหมู่สินค้า</h2>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">กรองตาม</h3>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="ทุกๆ Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">ทุกๆ Brand</SelectItem>
                      {Array.from(new Set(products.map((p) => p.brand))).map(
                        (brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-4">กรองตามราคา</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[0, 5000]}
                    max={5000}
                    min={0}
                    step={1}
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="w-full"
                  />
                  <div className="flex justify-between items-center text-sm">
                    <span>ราคา {priceRange[0]} ฿</span>
                    <span>ถึง {priceRange[1]} ฿</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-contain p-2"
                  />
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{product.name}</h2>
                      <p className="text-gray-600 text-sm mb-2 font-bold">
                        {product.brand}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RatingStars rating={product.rating} />
                    </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
