import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.scss';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log('送出登入資料 👉', data);

      const res = await axios.post(`${API_BASE}/admin/signin`, {
        username: data.email,      // ✅ 關鍵：一定是 username
        password: data.password,
      });

      const { token, expired } = res.data;
      const expireDate = new Date(expired * 1000);

      const setAuthCookie = (token, expireDate) => {
        document.cookie = `hexToken=${token}; expires=${expireDate.toUTCString()}; path=/`;
      };

      setAuthCookie(token, expireDate);

      console.log('✅ token 已寫入 cookie');

      navigate('/admin/products');
    } catch (err) {
      console.error('❌ 登入錯誤完整資訊', err.response);
      alert(err.response?.data?.message || '登入失敗');
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login-title">後台登入</h1>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="請輸入管理員信箱"
            {...register('email', { required: true })}
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