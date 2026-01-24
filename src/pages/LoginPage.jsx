export default function LoginPage({
  formData,
  handleInputChange,
  handleLogin,
}) {
  return (
    <div className="container login">
      <h1>WeeK3</h1>
      <h1 className="text-danger h3 mb-3">請先登入</h1>

      <form className="form-floating" onSubmit={handleLogin}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"  
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            placeholder="請輸入帳號"
            id="username"
          />
          <label>Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="請輸入密碼"
            id="password"
          />
          <label>Password</label>
        </div>

        <button className="btn btn-primary w-100 mt-2">登入</button>
      </form>
    </div>
  );
}
