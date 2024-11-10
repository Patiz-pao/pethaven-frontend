"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import axios from 'axios';

const AddProducts = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      stockQuantity: '',
      imageUrl: '',
      status: 'N',
      sku: '',
      brand: '',
      rating: '',
      discountPrice: '',
      isFeatured: false
    }
  });

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      price: parseFloat(data.price),
      stockQuantity: parseInt(data.stockQuantity),
      rating: parseFloat(data.rating),
      discountPrice: parseFloat(data.discountPrice),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      console.log('Sending payload:', payload);
      const response = await axios.post('/api/products', payload);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                {...register('name', { required: 'Product name is required' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description', { required: 'Description is required' })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register('price', { required: 'Price is required' })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountPrice">Discount Price</Label>
                <Input
                  id="discountPrice"
                  type="number"
                  step="0.01"
                  {...register('discountPrice')}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  {...register('category', { required: 'Category is required' })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  {...register('brand', { required: 'Brand is required' })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  {...register('stockQuantity', { required: 'Stock Quantity is required' })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  {...register('sku', { required: 'SKU is required' })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  {...register('status', { required: 'Status is required' })}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="Y">Active</option>
                  <option value="N">Inactive</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  {...register('rating')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                {...register('imageUrl', { required: 'Image URL is required' })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isFeatured"
                {...register('isFeatured')}
                checked={watch('isFeatured')}
              />
              <Label htmlFor="isFeatured">Featured Product</Label>
            </div>

            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
