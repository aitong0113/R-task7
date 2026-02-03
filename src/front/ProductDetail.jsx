import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, addToCart } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then(data => {
      setProduct(data.product);
    });
  }, [id]);

  if (!product) {
    return <p className="container py-5">載入中...</p>;
  }

  return (
    <div className="container py-5">
      {/* 回列表 */}
      <Link
        to="/products"
        className="d-inline-flex align-items-center gap-2 mb-4 text-secondary text-decoration-none"
        style={{ fontSize: 14 }}
      >
        ← 回到產品列表
      </Link>

      <div className="row g-5">
        {/* 左：圖片 */}
        <div className="col-md-5">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="img-fluid rounded-4 shadow-sm"
          />
        </div>

        {/* 右：內容 */}
        <div className="col-md-7">
          <small className="text-muted">
            {product.category}
          </small>

          <h1 className="mt-2 mb-3">
            {product.title}
          </h1>

          <p className="text-muted mb-4">
            {product.description}
          </p>

          {/* 特色說明 */}
          <div
            className="mb-5"
            style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}
          >
            {product.content}
          </div>

          {/* 購買區 */}
          <div className="p-4 border rounded-4 bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fs-4 fw-bold">
                  NT${product.price}
                </div>
                <del className="text-muted">
                  NT${product.origin_price}
                </del>
              </div>

              {product.is_new === 1 && (
                <span className="badge bg-success">
                  新品
                </span>
              )}
            </div>

            <button
              className="btn btn-primary btn-lg w-100"
              onClick={() => addToCart(product.id, 1).then(() => alert('已加入購物車'))}
            >
              加入購物車
            </button>

            <p
              className="text-muted text-center mt-3 mb-0"
              style={{ fontSize: 14 }}
            >
              純粹聆聽定位・不複雜，只留下需要的功能
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}