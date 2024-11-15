import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="bg-blue-300 py-16 text-center">
        <h1 className="text-4xl font-bold text-white">
          ยินดีต้อนรับสู่ Pet Haven Shop!
        </h1>
        <p className="text-lg text-white mt-4">
          แหล่งรวมสินค้าและบริการสำหรับสัตว์เลี้ยงที่คุณรัก
        </p>
        <div className="mt-10">
          <Link href="/products" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Shop
          </Link>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-bold text-center mb-8">สินค้าแนะนำ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "อาหารสุนัข",
              img: "https://img.th.my-best.com/product_images/07ad151064c2d48521455ec7259bf323.jpeg?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=40852dc7e32a4580033b4152ac203d40",
            },
            {
              name: "อาหารแมว",
              img: "https://cdn.onemars.net/sites/whiskas_th_r81SA_mwh5/image/whiskas-3d-1-2kg-fop-adult-tuna-2_1713962971851_1720686678842.png",
            },
            {
              name: "อาหารอื่นๆ",
              img: "https://www.betagro.com/storage/content/our-business/pet-business/img-brand-2.jpg",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-600">
                สินค้าคุณภาพสำหรับสัตว์เลี้ยงของคุณ
              </p>
              <div className="py-5">
                <Link
                  href="/products"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  ดูเพิ่มเติม
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-100 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          เกล็ดความรู้สำหรับสัตว์เลี้ยง
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "5 เคล็ดลับการดูแลสุนัขให้สุขภาพดี",
            "วิธีเล่นกับแมวให้อารมณ์ดี",
            "การดูแลตู้ปลาให้น้ำใสสะอาด",
          ].map((tip, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-bold mb-2">{tip}</h3>
              <p className="text-gray-600">
                อ่านเคล็ดลับดี ๆ ที่จะช่วยให้สัตว์เลี้ยงของคุณมีความสุข
              </p>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                อ่านเพิ่มเติม
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
