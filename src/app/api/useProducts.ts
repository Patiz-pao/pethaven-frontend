import { useState, useEffect } from "react";
import axios from "axios";
import { Product, UseProductsReturn } from "../../Types/types";

export const useProducts = (): UseProductsReturn => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("ไม่สามารถดึงข้อมูลสินค้าได้");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
      (product) =>
      product.name ||
      product.category
      
  );

  return {
    products,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filteredProducts,
  };
};