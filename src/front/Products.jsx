import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, addToCart } from '../services/api';
import Pagination from '../components/Pagination';


export default function Products() {
  const PER_PAGE = 9;
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1 });

  const slicePage = (list, p) => {
    const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    const start = (p - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    setProducts(list.slice(start, end));
    setPagination({ current_page: p, total_pages: totalPages });
  };

  useEffect(() => {
    // 首次載入：抓取所有後端頁次合併，再以前端每頁 9 筆顯示
    const loadAll = async () => {
      const first = await getProducts(1);
      const firstList = first.products || [];
      const totalServerPages = first.pagination?.total_pages || 1;

      if (totalServerPages > 1) {
        const tasks = Array.from({ length: totalServerPages - 1 }, (_, i) => getProducts(i + 2));
        const rest = await Promise.all(tasks);
        const restList = rest.flatMap(r => r.products || []);
        const all = [...firstList, ...restList];
        setAllProducts(all);
        slicePage(all, 1);
      } else {
        setAllProducts(firstList);
        slicePage(firstList, 1);
      }
    };
    loadAll();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      slicePage(allProducts, page);
    }
  }, [page, allProducts]);

  return (
    <div className="container py-4">
      <h1 className="mb-3">專注與放鬆的聲音選品</h1>

      <p className="text-muted mb-4 col-md-8">
        為長時間工作、學習與情緒調節而挑選的聲音設備，
        協助你在日常生活中建立專注、安定與放鬆的聆聽空間。
      </p>

      <div className="row g-4">
        {products.map(product => (
          <div className="col-md-6 col-lg-4" key={product.id}>
            <div className="card h-100 shadow-sm">

              {/* 圖片區（新品疊在上面） */}
              <div className="position-relative">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: 200, objectFit: 'cover' }}
                />

                {product.is_new === 1 && (
                  <span
                    className="badge bg-success position-absolute"
                    style={{
                      top: 12,
                      left: 12,
                      fontSize: 12,
                      boxShadow: '0 2px 6px rgba(0,0,0,.2)',
                    }}
                  >
                    新品
                  </span>
                )}
              </div>

              {/* 文字內容 */}
              <div className="card-body d-flex flex-column">
                <small className="text-muted">
                  {product.category}
                </small>

                <h5 className="card-title mt-2">
                  {product.title}
                </h5>

                <p className="mt-auto mb-2">
                  <strong className="fs-5">
                    NT${product.price}
                  </strong>
                  <del className="text-muted ms-2">
                    NT${product.origin_price}
                  </del>
                </p>
                
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => addToCart(product.id, 1).then(() => alert('已加入購物車'))}
                >
                  加入購物車
                </button>

                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-outline-primary btn-sm mt-2"
                >
                  查看商品詳情
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={pagination.current_page || page}
          totalPages={pagination.total_pages || 1}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}