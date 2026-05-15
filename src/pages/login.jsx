import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const nav = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    // Lưu thông tin user vào localStorage
                    localStorage.setItem("user", JSON.stringify(data.user));
                    // Chuyển về trang chủ
                    nav("/");
                } else {
                    setError(data.msg);
                }
            })
            .catch(() => setError("Không thể kết nối server"));
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: "400px" }}>
                <h3 className="text-center mb-4">Data Integration Dashboard</h3>
                <h5 className="text-center text-muted mb-4">Đăng nhập</h5>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <label>Tài khoản</label>
                    <input
                        id="username"
                        className="form-control mb-3"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />

                    <label>Mật khẩu</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control mb-3"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button className="btn btn-primary w-100">
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
}