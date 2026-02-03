import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { submitOrder } from '../services/api';
import { Oval } from 'react-loader-spinner';
import { useState } from 'react';

export default function Checkout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = (form) => {
  setIsLoading(true);

  setTimeout(() => {
    submitOrder({
      user: {
        name: form.name,
        email: form.email,
        tel: form.tel,
        address: form.address,
      },
      message: form.message,
    })
      .then((data) => {
        if (data?.success) {
          const orderId =
            data.orderId || data.order?.id || data.data?.orderId;
          navigate(`/order-success/${orderId}`);
        } else {
          alert('訂單建立失敗');
        }
      })
      .catch(() => {
        alert('送出訂單時發生錯誤');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, 1500); // 👈 故意延遲 1.5 秒
};

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '50vh' }}
      >
        <Oval
          height={80}
          width={80}
          color="#a95c4d"
          ariaLabel="oval-loading"
          secondaryColor="#914535"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h1 className="mb-4">結帳</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 姓名 */}
        <div className="mb-3">
          <label className="form-label">姓名</label>
          <input
            className="form-control"
            {...register('name', { required: '請輸入姓名' })}
          />
          {errors.name && (
            <p className="text-danger">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            {...register('email', {
              required: '請輸入 Email',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email 格式不正確',
              },
            })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        {/* 電話 */}
        <div className="mb-3">
          <label className="form-label">電話</label>
          <input
            className="form-control"
            {...register('tel', {
              required: '請輸入電話',
              minLength: { value: 10, message: '電話至少 10 碼' },
            })}
          />
          {errors.tel && (
            <p className="text-danger">{errors.tel.message}</p>
          )}
        </div>

        {/* 地址 */}
        <div className="mb-3">
          <label className="form-label">地址</label>
          <input
            className="form-control"
            {...register('address', { required: '請輸入地址' })}
          />
          {errors.address && (
            <p className="text-danger">{errors.address.message}</p>
          )}
        </div>

        {/* 備註 */}
        <div className="mb-4">
          <label className="form-label">備註</label>
          <textarea
            className="form-control"
            rows="3"
            {...register('message')}
          />
        </div>

        <div className="d-flex justify-content-between">
          <Link to="/cart" className="btn btn-outline-secondary">
            ← 返回購物車
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            送出訂單
          </button>
        </div>
      </form>
    </div>
  );
}