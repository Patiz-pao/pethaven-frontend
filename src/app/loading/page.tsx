"use client";
import { useState } from "react";

export default function LoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // จำลองการโหลดเสร็จ
    }, 3000); // ตั้งเวลาให้ปุ่มโหลดเป็นเวลา 3 วินาที
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handleClick}
        className={`flex items-center space-x-2 bg-black text-white rounded-lg ${
          loading ? "cursor-wait" : ""
        }`}
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="flex items-center justify-center bg-white">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-blue-200 animate-spin border-t-blue-500" />
                <div className="mt-4 text-center text-blue-500 font-medium animate-pulse">
                  Loading...
                </div>
              </div>
            </div>
          </>
        ) : (
          <span>Click Me</span>
        )}
      </button>
    </div>
  );
}
