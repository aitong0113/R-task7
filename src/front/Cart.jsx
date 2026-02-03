  import { useEffect, useState } from 'react';
  import { Link } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';
  import { getCart as apiGetCart, updateCartItem, removeCartItem, clearCart } from '../services/api';



  export default function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState({ carts: [] });
    const [isClearing, setIsClearing] = useState(false);

    const getCart = () => {
      apiGetCart().then(data => {
        setCart(data.data);
      });
    };

    useEffect(() => {
      getCart();
    }, []);

    const updateQty = (cartItem, qty) => {
      updateCartItem(cartItem.id, cartItem.product.id, qty)
        .then(() => getCart());
    };

    const removeItem = (cartId) => {
      removeCartItem(cartId).then(() => getCart());
    };

    const handleClearCart = () => {
      if (cart.carts.length === 0) return;
      const ok = window.confirm('確定要清空購物車嗎？此操作無法復原');
      if (!ok) return;
      setIsClearing(true);
      clearCart()
        .then((data) => {
          if (data?.success) {
            getCart();
          } else {
            alert(data?.message || '清空購物車失敗');
          }
        })
        .catch((err) => {
          alert(err?.response?.data?.message || '清空購物車時發生錯誤');
        })
        .finally(() => setIsClearing(false));
    };

    return (
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">購物車</h1>
          <button
            className="btn btn-outline-danger"
            onClick={handleClearCart}
            disabled={cart.carts.length === 0 || isClearing}
          >
            {isClearing ? '清空中…' : '清空購物車'}
          </button>
        </div>

        {cart.carts.length === 0 ? (
          <p className="text-muted">購物車目前是空的</p>
        ) : (
          <>
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>商品</th>
                  <th className="text-center">數量</th>
                  <th className="text-end">小計</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.carts.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex gap-3 align-items-center">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          style={{ width: 80, borderRadius: 8 }}
                        />
                        {item.product.title}
                      </div>
                    </td>
                    <td className="text-center" style={{ width: 140 }}>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQty(item, item.qty - 1)}
                          disabled={item.qty === 1}
                        >
                          −
                        </button>

                        <span style={{ minWidth: 24, textAlign: 'center' }}>
                          {item.qty}
                        </span>

                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQty(item, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-end">
                      NT${item.final_total}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-end">
              <h5>總金額：NT${cart.final_total}</h5>
            </div>

            <div className="text-end mt-3">
              <Link to="/products" className="btn btn-outline-secondary me-2">
                繼續選購
              </Link>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/checkout')}
              >
                前往結帳
              </button>
            </div>
          </>
        )}
      </div>
    );
  }