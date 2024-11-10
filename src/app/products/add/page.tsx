"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Switch, Textarea, Input, Label, Button } from "@/components/ui/";
import axios from "axios";
import { Plus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const AddProducts = () => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      stockQuantity: "",
      imageUrl: "",
      status: "N",
      sku: "",
      brand: "",
      rating: "",
      discountPrice: "",
      isFeatured: false,
    },
  });

  const [categories, setCategories] = useState([
    { value: "Y", label: "Cat" },
    { value: "N", label: "Dog" },
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      price: parseFloat(data.price),
      stockQuantity: parseInt(data.stockQuantity),
      rating: parseFloat(data.rating),
      discountPrice: parseFloat(data.discountPrice),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      console.log("Sending payload:", payload);
      const response = await axios.post("/api/products", payload);
      console.log(response.data);
      setShowSuccessPopup(true);
      setTimeout(() => {
        router.push("/products");
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCategoryObj = {
        value: newCategory.trim(),
        label: newCategory.trim(),
      };
      setCategories((prevCategories) => [...prevCategories, newCategoryObj]);
      setValue("category", newCategory.trim());
      setNewCategory("");
      setShowAddCategory(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

          {showSuccessPopup && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-6 rounded-lg shadow-lg z-50">
              <p>Product added successfully!</p>
            </div>
          )}

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
                                value={category.value}
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
                    <Select {...field}>
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
              <Label htmlFor="imageUrl">Product Image</Label>

              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <Input
                    id="imageUrl"
                    type="text"
                    placeholder="Enter Image URL"
                    {...field} // Controller will handle onChange here
                    className={`${
                      errors.imageUrl ? "border-red-500" : "border-gray-300"
                    } w-full rounded-md border p-2`}
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="w-12 h-6 bg-blue-500 rounded-full"
                    />
                    <Label className="ml-4">Featured</Label>
                  </div>
                )}
              />
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md p-3"
              >
                Add Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
