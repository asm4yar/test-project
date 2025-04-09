// useData.ts
import { useEffect, useState } from 'react';

function useData() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  async function fetchItems() {
    try {
      const response = await fetch(`${process.env.API_URL}/items`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch items', err);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchItems();
    const intervalId = setInterval(fetchItems, 10000);
    
    return () => clearInterval(intervalId); // Очистка интервала при размонтировании
  }, []);
  
  return { items, loading, error };
}

export default useData;