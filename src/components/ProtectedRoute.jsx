import { useEffect, useState } from 'react';
import { RotatingTriangles } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';

import { removeAdminToken } from '@/services/auth';
import { httpAdmin, setAdminAuthTokenFromCookie } from '@/services/http';

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setAdminAuthTokenFromCookie();
    httpAdmin.post('/api/user/check')
      .then(() => {
        setIsAuth(true);
        setLoading(false);
      })
      .catch(() => {
        removeAdminToken && removeAdminToken();
        setIsAuth(false);
        setLoading(false);
        navigate('/login', { replace: true, state: { from: location } });
      });
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
        <RotatingTriangles />
      </div>
    );
  }

  if (!isAuth) return null;
  return children;
}