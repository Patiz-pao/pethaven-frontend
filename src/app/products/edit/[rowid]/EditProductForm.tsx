"use client";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Textarea, Input, Label, Button } from "@/components/ui/";
import axios from "axios";
import { CircleCheckBig, Plus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface EditProductProps {
  rowId: string;
}

const EditProduct = ({ rowId }: EditProductProps) => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      stockQuantity: "",
      imageUrl: "",
      status: "",
      sku: "",
      brand: "",
      rating: "",
      discountPrice: "",
      isFeatured: false,
    },
  });

  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${rowId}`);
        const productData = response.data.data;

        const category = await axios.get(`/api/category`);
        const categoryData = category.data.data;

        const matchingCategory = categoryData.find(
          (cat: { rowid: string; name: string }) =>
            cat.name === productData.category
        );

        console.log(categoryData);
        console.log(matchingCategory.name);
        

        reset({
          name: productData.name,
          description: productData.description,
          price: productData.price.toString(),
          category: matchingCategory ? matchingCategory.name : "test",
          stockQuantity: productData.stockQuantity.toString(),
          imageUrl: productData.imageUrl,
          status: productData.status,
          sku: productData.sku,
          brand: productData.brand,
          rating: productData.rating.toString(),
          discountPrice: productData.discountPrice?.toString() || "",
          isFeatured: productData.isFeatured,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      }
    };

    if (rowId) {
      fetchProduct();
    }
  }, [rowId, reset]);

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      price: parseFloat(data.price),
      stockQuantity: parseInt(data.stockQuantity),
      rating: parseFloat(data.rating),
      discountPrice: data.discountPrice ? parseFloat(data.discountPrice) : null,
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await axios.put(`/api/products/${rowId}`, payload);
      console.log(response.data);
      setShowSuccessPopup(true);
      setTimeout(() => {
        setIsDialogOpen(false);
        router.push("/products");
      }, 2000);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("/api/category");

      if (Array.isArray(response.data)) {
        const fetchedCategories = response.data.map(
          (category: { name: string; rowid: string }) => ({
            label: category.name,
            value: category.rowid,
          })
        );
        setCategories(fetchedCategories);
      } else if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        const fetchedCategories = response.data.data.map(
          (category: { name: string; rowid: string }) => ({
            label: category.name,
            value: category.rowid,
          })
        );
        setCategories(fetchedCategories);
      } else {
        console.error(
          "Invalid data format: response.data is not an array or doesn't have 'data' array"
        );
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await axios.post("/api/category", {
          name: newCategory.trim(),
        });
        setCategories((prevCategories) => [
          ...prevCategories,
          { value: newCategory.trim(), label: newCategory.trim() },
        ]);
        setValue("category", newCategory.trim());
        setNewCategory("");
        setShowAddCategory(false);
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleOpenDialog = async () => {
    const isValid = await trigger();
    if (isValid) {
      setIsDialogOpen(true);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
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
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                {...register("name", {
                  required: "Product name is required",
                })}
                className={`${
                  errors.name ? "border-red-500" : "border-gray-300"
                } w-full rounded-md border p-2`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", { required: "Price is required" })}
                  className={`${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } w-full rounded-md border p-2`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountPrice">Discount Price</Label>
                <Input
                  id="discountPrice"
                  type="number"
                  step="0.01"
                  {...register("discountPrice")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <div className="relative">
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger
                          className={`${
                            errors.category
                              ? "border-red-500"
                              : "border-gray-300"
                          } w-full rounded-md border p-2`}
                        >
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Choose Category</SelectLabel>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.label}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <button
                    type="button"
                    onClick={() => setShowAddCategory(!showAddCategory)}
                    className="p-2 mt-2 bg-blue-50 rounded-md hover:bg-blue-400 flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    <p className="text-sm">Add Category</p>
                  </button>
                </div>

                {showAddCategory && (
                  <div className="mt-2 space-y-2">
                    <Input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Add new category"
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                    <Button
                      type="button"
                      onClick={handleAddCategory}
                      className="w-full rounded-md bg-blue-500 hover:bg-blue-600 text-white p-2"
                    >
                      Add Category
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  {...register("brand", { required: "Brand is required" })}
                  className={`${
                    errors.brand ? "border-red-500" : "border-gray-300"
                  } w-full rounded-md border p-2`}
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm">{errors.brand.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  {...register("stockQuantity", {
                    required: "Stock Quantity is required",
                  })}
                  className={`${
                    errors.stockQuantity ? "border-red-500" : "border-gray-300"
                  } w-full rounded-md border p-2`}
                />
                {errors.stockQuantity && (
                  <p className="text-red-500 text-sm">
                    {errors.stockQuantity.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  {...register("rating", { required: "Rating is required" })}
                  className={`${
                    errors.rating ? "border-red-500" : "border-gray-300"
                  } w-full rounded-md border p-2`}
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm">
                    {errors.rating.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={`${
                          errors.status ? "border-red-500" : "border-gray-300"
                        } w-full rounded-md border p-2`}
                      >
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="Y">Active</SelectItem>
                          <SelectItem value="N">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Controller
                name="imageUrl"
                control={control}
                rules={{
                  required: "Image URL is required",
                  pattern: {
                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                    message: "Invalid URL format",
                  },
                }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Product Image</Label>
                    <Input
                      id="imageUrl"
                      type="text"
                      placeholder="Enter Image URL"
                      {...field}
                      className={`${
                        errors.imageUrl ? "border-red-500" : "border-gray-300"
                      } w-full rounded-md border p-2`}
                    />
                  </div>
                )}
              />
            </div>

            <div className="mt-6">
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Button
                  type="button"
                  onClick={handleOpenDialog}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md p-3"
                  variant="outline"
                >
                  Update Product
                </Button>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    {showSuccessPopup ? (
                      <div className="flex flex-col items-center justify-center p-4">
                        <CircleCheckBig className="w-16 h-16 text-green-500 mb-4" />
                        <div className="text-center">
                          <h2 className="text-2xl font-bold text-green-600 mb-2">
                            Success!
                          </h2>
                          <p className="text-gray-600">
                            Product has been successfully updated.
                          </p>
                          <p className="text-gray-500 text-sm mt-2">
                            Redirecting to products page...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <AlertDialogTitle>
                          Confirm Update Product
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to update this product?
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-blue-500 hover:bg-blue-600"
                            onClick={handleSubmit(onSubmit)}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </>
                    )}
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
