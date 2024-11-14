import { Suspense, lazy } from "react";
import AddProductForm from "./AddProductForm";

export default function EditPage() {
  return (
    <Suspense
      fallback={
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
      }
    >
      <AddProductForm />
    </Suspense>
  );
}
