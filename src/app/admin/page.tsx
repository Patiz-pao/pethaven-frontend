"use client";
import React, { useState, useEffect } from "react";
import { Table } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Toaster, useToast } from "@/components/ui/toaster";
import Link from "next/link";
import { CircleArrowLeft } from "lucide-react";

interface Product {
  rowid: string;
  name: string;
  price: number;
  status: string;
}

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products/all");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      console.log("API Response:", result);

      const productData = Array.isArray(result) ? result : result.data || [];

      setProducts(productData);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (rowid: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "N" ? "Y" : "N";

      const response = await fetch(`/api/status/${rowid}/${newStatus}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.rowid === rowid ? { ...product, status: newStatus } : product
        )
      );

      toast({
        description: "อัพเดทสถานะสำเร็จ",
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        variant: "destructive",
        description: "เกิดข้อผิดพลาดในการอัพเดทสถานะ",
      });
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

  if (error) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-center text-red-600">{error}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">ไม่พบข้อมูลสินค้า</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100">
      <div className="container mx-auto px-4 py-6">
        <div className="p-0 sm:p-8">
          <Card>
            <CardHeader>
              <Link href="/products">
                <div className="flex items-center gap-2 mb-3 text-blue-500 hover:text-blue-700 font-medium transition duration-300">
                  <CircleArrowLeft className="h-6 w-6" />
                  <span>Back</span>
                </div>
              </Link>
              <CardTitle className="text-xl font-bold">
                จัดการสินค้า ({products.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  {" "}
                  <Table>
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="hidden sm:table-cell p-4 text-center">
                          ID
                        </th>
                        <th className="p-1 sm:p-4 text-center">ชื่อสินค้า</th>
                        <th className="p-1 sm:p-4 text-center">ราคา</th>
                        <th className="p-1 sm:p-4 text-center">สถานะ</th>
                        <th className="p-1 sm:p-4 text-center">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={`product-${index}`} className="border-t">
                          <td className="hidden sm:table-cell p-4 text-center">
                            {product.rowid}
                          </td>
                          <td className="p-1 sm:p-4 text-center">
                            {product.name}
                          </td>
                          <td className="p-1 sm:p-4 text-center">
                            {product.price.toLocaleString("th-TH", {
                              style: "currency",
                              currency: "THB",
                            })}
                          </td>
                          <td className="p-1 sm:p-4 text-center">
                            <span
                              key={`status-${product.rowid}`}
                              className={`px-2 py-1 rounded text-sm ${
                                product.status === "Y"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.status === "Y" ? "Active" : "InActive"}
                            </span>
                          </td>
                          <td className="p-1 sm:p-4 text-center">
                            <Switch
                              key={`switch-${product.rowid}`}
                              checked={product.status === "Y"}
                              onCheckedChange={() =>
                                handleStatusChange(
                                  product.rowid,
                                  product.status
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
