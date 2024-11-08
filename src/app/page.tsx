"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/data')
  .then(response => {
    setData(response.data)
  });
  }, []);

  return (
    <div>
      <p>{data}</p>
    </div>
  );
}
