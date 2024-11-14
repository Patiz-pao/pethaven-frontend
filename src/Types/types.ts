export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  brand: string;
  rating: number;
}

export interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showSuccessPopup: boolean;
  filteredProducts:Product[];
}