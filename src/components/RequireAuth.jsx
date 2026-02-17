import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { getAdminToken, removeAdminToken } from '@/services/auth';

export default function RequireAuth({ children }) {
  const token = getAdminToken();
  const [authorized, setAuthorized] = useState(false);
  const [checked, setChecked] = useState(!token ? true : false);

  useEffect(() => {
    if (!token) return;

    const API_BASE = import.meta.env.VITE_API_BASE;
    axios
      .post(
        `${API_BASE}/api/user/check`,
        {},
        { headers: { Authorization: token } }
      )
      .then(() => {
        setAuthorized(true);
        setChecked(true);
      })
      .catch(() => {
        removeAdminToken();
        setAuthorized(false);
        setChecked(true);
      });
  }, [token]);

  if (!checked) return null;
  if (!authorized) return <Navigate to="/login" replace />;
  return children;
}
