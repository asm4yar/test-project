// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
}

export default NotFoundPage;
