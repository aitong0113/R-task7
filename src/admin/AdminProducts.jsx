import { useEffect, useState } from 'react';
import { getAdminProducts, deleteAdminProduct } from '../services/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await getAdminProducts();
        setProducts(res.data.products);
      } catch (err) {
        alert(err?.response?.data?.message || '取得商品失敗');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 刪除商品
  const handleDelete = (id) => {
    const ok = window.confirm('確定要刪除這個商品嗎？');
    if (!ok) return;

    deleteAdminProduct(id)
      .then(() => {
        // 刪完後重新抓一次列表
        setIsLoading(true);
        return getAdminProducts();
      })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        alert(err?.response?.data?.message || '刪除失敗');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p>載入中...</p>;
  }

  return (
    <div className="admin-products">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>商品管理</h2>
      </div>

      <table className="table align-middle">
        <thead>
          <tr>
            <th>商品名稱</th>
            <th className="text-end">價格</th>
            <th className="text-center">狀態</th>
            <th className="text-end">操作</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td className="text-end">NT${item.price}</td>
              <td className="text-center">
                <span
                  className={`badge ${item.is_enabled ? 'bg-success' : 'bg-secondary'
                    }`}
                >
                  {item.is_enabled ? '啟用' : '未啟用'}
                </span>
              </td>
              <td className="text-end">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}