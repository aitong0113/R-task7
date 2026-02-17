import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { setAdminToken } from '@/services/auth';
import { httpAdmin } from '@/services/http';

import './login.scss';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await httpAdmin.post(`${API_BASE}/admin/signin`, {
        username: data.username,
        password: data.password,
      });

      const { token, expired } = res.data;
      setAdminToken(token, expired);

      navigate('/admin/products');
    } catch (err) {
      console.error('登入錯誤', err.response);
      alert(err.response?.data?.message || JSON.stringify(err.response?.data) || '登入失敗');
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login-title">後台登入</h1>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="請輸入管理員帳號"
            {...register('username', { required: true })}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="請輸入密碼"
            {...register('password', { required: true })}
          />
        </div>

        <button type="submit" className="login-btn">
          登入後台
        </button>
      </form>
    </div>
  );
}