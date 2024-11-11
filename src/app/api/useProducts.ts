import { useState, useEffect } from "react";
import axios from "axios";
import { Product, UseProductsReturn } from "../../Types/types";

export const useProducts = (): UseProductsReturn => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data.data);
        setShowSuccessPopup(true);

        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("ไม่สามารถดึงข้อมูลสินค้าได้");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, products]);

  return {
    products,
    filteredProducts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    showSuccessPopup,
  };
};
