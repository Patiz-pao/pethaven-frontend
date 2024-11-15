"use client";
import React, { useState } from "react";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

import axios from "axios";

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
  const { loading, products } = useProducts();
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], priceRange[1]]);
  };

  const filteredProducts = products.filter((product) => {
    const matchBrand =
      selectedBrand === "all" || product.brand === selectedBrand;
    const matchCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchBrand && matchCategory;
  });

  const handleDelete = async (productId: string) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      window.location.reload();
    } catch (error) {
      console.log("ไม่สามารถลบสินค้าได้");
    }
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      handleDelete(productToDelete);
      setIsDialogOpen(false);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center bg-white">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-blue-200 animate-spin border-t-blue-500" />
            <div className="mt-4 text-center text-blue-500 font-medium animate-pulse">
              Loading...
            </div>
          </div>
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
                    <SelectValue placeholder="Brand โชว์ทั้งหมด" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Brand โชว์ทั้งหมด</SelectItem>
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

                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full mt-4">
                    <SelectValue placeholder="Category โชว์ทั้งหมด" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Category โชว์ทั้งหมด</SelectItem>
                      {Array.from(new Set(products.map((p) => p.category))).map(
                        (category) => (
                          <SelectItem key={category} value={category}>
                            {category}
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
                  <div className="flex gap-3 justify-end py-2 px-3 bg-purple-600 shadow-xl">
                    <Link href={`/products/edit/${product.rowid}`} passHref>
                      <Pencil className="h-4 w-4 text-white" />
                    </Link>

                    <button
                      onClick={() => {
                        setProductToDelete(product.rowid);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                    <AlertDialog
                      open={isDialogOpen}
                      onOpenChange={setIsDialogOpen}
                    >
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Confirm product deletion
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this product?
                            Deletion cannot be reversed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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
