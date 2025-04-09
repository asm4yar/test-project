import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import NotFoundPage from './NotFoundPage'; 

type ItemType = {
  id: number;
  name: string;
  description: string;
};

type ErrorResponse = {
  status: number;
  message: string;
};

function SinglePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<ItemType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${process.env.API_URL}/items/${id}`);
        
        if (response.status === 403) {
          throw { status: 403, message: 'Access forbidden' };
        }
        
        if (!response.ok) {
          throw { status: response.status, message: 'Item not found' };
        }

        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err as ErrorResponse);
        
        // Перенаправляем на 404 если элемент не найден
        if ((err as ErrorResponse).status === 404) {
          navigate('/404');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error?.status === 403) {
    return (
      <div className="error">
        <h2>Access Denied</h2>
        <p>You don't have permission to view this item.</p>
        <Link to="/">Go to Home Page</Link>
      </div>
    );
  }

  if (error || !item) {
    return <NotFoundPage />;
  }

  return (
    <div className="detail">
      <Link to="/">Go Back</Link>
      <h2>Item Details</h2>
      <p>ID: {item.id}</p>
      <p>Name: {item.name}</p>
      <p>Description: {item.description}</p>
    </div>
  );
}

export default SinglePage;