import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { rowId } = req.query;

  if (method === "GET") {
    try {
      const response = await axios.get(`/products/${rowId}`);
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลสินค้าได้" });
    }
  }

  if (method === "PUT") {
    try {
      const response = await axios.put(`/products/${rowId}`, req.body);
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ error: "ไม่สามารถอัพเดตข้อมูลสินค้าได้" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
