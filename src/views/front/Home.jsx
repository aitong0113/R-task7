import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero 區 */}
      <section className="bg-light py-5 border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-3">
                專注與放鬆，<br />
                從聲音開始
              </h1>

              <p className="text-muted mb-4">
                InnerSound 精選適合長時間工作、學習與情緒調節的聲音設備，
                陪你在日常中建立穩定、專注與放鬆的聆聽空間。
              </p>

              <Link
                to="/products"
                className="btn btn-primary btn-lg"
              >
                前往選品 →
              </Link>
            </div>

            <div className="col-md-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1689357641864-0965f9d03169?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Sound focus"
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 理念區 */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">為什麼選擇 InnerSound？</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <h5>🎧 專注導向選品</h5>
              <p className="text-muted">
                適合長時間使用、不刺激、不干擾思緒，
                幫助你進入深度工作與學習狀態。
              </p>
            </div>

            <div className="col-md-4">
              <h5>🌿 放鬆與安定</h5>
              <p className="text-muted">
                柔和音色與舒適配戴，
                適合情緒調節、休息與夜晚放鬆時刻。
              </p>
            </div>

            <div className="col-md-4">
              <h5>✨ 簡約而不多餘</h5>
              <p className="text-muted">
                去除花俏功能，留下真正需要的聲音體驗，
                讓生活回到剛剛好的狀態。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 區 */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h3 className="mb-3">
            找到適合你的聲音節奏
          </h3>

          <Link
            to="/products"
            className="btn btn-outline-primary btn-lg"
          >
            查看所有產品
          </Link>
        </div>
      </section>
    </>
  );
}