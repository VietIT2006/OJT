import rikkeiLogo from "../../../assets/img/rikkei logo.png";
import investmentImg from "../../../assets/img/Investment.png";
import { useState } from "react";
import useNotify from "../../../hooks/useNotify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../apis/authApi";
import { setLoading, fetchUser } from "../../../store/slices/user.slices";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const inputStyle: React.CSSProperties = {
        width: "100%",
        height: 40,
        borderRadius: 5,
        border: "1px solid #DEDDE4",
        padding: "0 12px",
        boxSizing: "border-box",
    };

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notify, contextHolder } = useNotify();
    const validate = () => {
        const newErrors = {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        // Full name
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Họ tên không được để trống";
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        // Password
        if (!formData.password.trim()) {
            newErrors.password = "Mật khẩu không được để trống";
        } else if (formData.password.length < 8) {
            newErrors.password = "Mật khẩu tối thiểu 8 ký tự";
        }

        // Confirm password
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
        }

        setErrors(newErrors);
        return (
            !newErrors.fullName &&
            !newErrors.email &&
            !newErrors.password &&
            !newErrors.confirmPassword
        );
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            dispatch(setLoading(true));
            await auth.registerCan({
                fullname: formData.fullName,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            });
            await dispatch(fetchUser() as any);
            dispatch(setLoading(false));
            notify(true, "Đăng ký thành công");
            navigate('/');
        } catch (err: any) {
            dispatch(setLoading(false));
            notify(false, err.message || 'Đăng ký thất bại');
        }
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {contextHolder}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: 560,
                        paddingTop: 53,
                    }}
                >
                    <img
                        src={rikkeiLogo}
                        alt="Rikkei Logo"
                        style={{
                            width: 200,
                            height: 67.6,
                            objectFit: "contain",
                        }}
                    />

                    <h2
                        style={{
                            marginTop: 84,
                            width: 475,
                            height: 106,
                            fontSize: 30,
                            lineHeight: "40px",
                            fontWeight: 700,
                            marginBottom: 5,
                        }}
                    >
                        Cùng Rikkei Education xây dựng hồ sơ nổi bật và nhận được các cơ hội sự
                        nghiệp lý tưởng
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        style={{
                            marginTop: 40,
                            width: 486.54,
                            height: 574.86,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div style={{ marginBottom: 20 }}>
                            <label>
                                <span
                                    style={{
                                        display: "block",
                                        width: 80,
                                        height: 43.5,
                                        fontWeight: 500,
                                        fontSize: 16,
                                        lineHeight: "43.5px",
                                        color: "#0A033C",
                                        marginBottom: 5,
                                    }}
                                >
                                    Họ tên
                                </span>
                            </label>

                            <input
                                type="text"
                                placeholder="Nhập họ tên"
                                value={formData.fullName}
                                onChange={(e) =>
                                    setFormData({ ...formData, fullName: e.target.value })
                                }
                                style={inputStyle}
                            />

                            {errors.fullName && (
                                <p style={{ color: "#C62828", fontSize: 12, marginTop: 4 }}>
                                    {errors.fullName}
                                </p>
                            )}

                        </div>


                        <div style={{ marginBottom: 20 }}>
                            <label>
                                <span
                                    style={{
                                        display: "block",
                                        width: 61,
                                        height: 43.5,
                                        fontWeight: 500,
                                        fontSize: 16,
                                        lineHeight: "43.5px",
                                        color: "#0A033C",
                                        marginBottom: 5,
                                    }}
                                >
                                    Email
                                </span>
                            </label>

                            <input
                                type="email"
                                placeholder="abc@gmail.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                style={inputStyle}
                            />

                            {errors.email && (
                                <p style={{ color: "#C62828", fontSize: 12, marginTop: 4 }}>
                                    {errors.email}
                                </p>
                            )}

                        </div>


                        <div style={{ marginBottom: 20 }}>
                            <label>
                                <span
                                    style={{
                                        display: "block",
                                        width: 101.69,
                                        height: 43.5,
                                        fontWeight: 500,
                                        fontSize: 16,
                                        lineHeight: "43.5px",
                                        color: "#0A033C",
                                        marginBottom: 5,
                                    }}
                                >
                                    Password
                                </span>
                            </label>

                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    style={{ ...inputStyle, padding: "0 45px 0 12px" }}
                                />

                                {errors.password && (
                                    <p style={{ color: "#C62828", fontSize: 12, marginTop: 4 }}>
                                        {errors.password}
                                    </p>
                                )}


                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: 15,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        fontSize: 18,
                                        color: "#6B7280",
                                        userSelect: "none",
                                    }}
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </span>
                            </div>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <label>
                                <span
                                    style={{
                                        display: "block",
                                        width: 160,
                                        height: 43.5,
                                        fontWeight: 500,
                                        fontSize: 16,
                                        lineHeight: "43.5px",
                                        color: "#0A033C",
                                        marginBottom: 5,
                                    }}
                                >
                                    Confirm password
                                </span>
                            </label>

                            <div style={{ position: "relative" }}>
                                <input
                                    type="password"
                                    placeholder="********"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        setFormData({ ...formData, confirmPassword: e.target.value })
                                    }
                                    style={inputStyle}
                                />

                                {errors.confirmPassword && (
                                    <p style={{ color: "#C62828", fontSize: 12, marginTop: 4 }}>
                                        {errors.confirmPassword}
                                    </p>
                                )}


                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        position: "absolute",
                                        right: 15,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        fontSize: 18,
                                        color: "#6B7280",
                                        userSelect: "none",
                                    }}
                                >
                                    {showConfirmPassword ? "🙈" : "👁"}
                                </span>
                            </div>
                        </div>



                        <button
                            style={{
                                width: "100%",
                                height: 65,
                                borderRadius: 5,
                                backgroundColor: "#c62828",
                                color: "#fff",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: 600,
                            }}
                        >
                            Đăng nhập
                        </button>


                        <div
                            style={{
                                width: 486.5,
                                height: 87,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 10,
                            }}
                        >
                            <span style={{ fontSize: 14, cursor: "pointer" }}>
                                Quên mật khẩu?
                            </span>

                            <span style={{ fontSize: 14 }}>
                                Bạn không có tài khoản?{" "}
                                <span
                                    style={{
                                        color: "#C62828",
                                        fontWeight: 500,
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                    }}
                                >
                                    Tạo 1 tài khoản
                                </span>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: 1.45,
                        height: 900,
                        background:
                            "linear-gradient(180deg, rgba(10, 3, 60, 0) 0%, #0A033C 51.56%, rgba(10, 3, 60, 0) 100%)",
                    }}
                />
            </div>

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src={investmentImg}
                    alt="Investment"
                    style={{
                        width: 500,
                        height: 500,
                        objectFit: "contain",
                    }}
                />
            </div>

        </div>
    );
}
