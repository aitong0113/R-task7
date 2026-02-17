import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="container nf-wrap py-5 d-flex align-items-center">
      <div className="w-100 text-center">
        <div className="nf-hero mb-2" aria-hidden="true">404</div>
        <h1 className="fw-bold mb-2">哎呀！頁面不存在</h1>
        <p className="text-muted mb-4">可能是網址有誤，或頁面已被移除。您可以回到首頁或探索商品。</p>
        <div className="d-flex gap-2 justify-content-center">
          <Link to="/" className="btn btn-primary px-3">返回首頁</Link>
          <Link to="/products" className="btn btn-outline-secondary px-3">逛逛商品</Link>
        </div>
      </div>
    </section>
  );
}
