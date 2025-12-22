import rikkeiLogo from "../../../assets/img/rikkei logo.png";
import office from "../../../assets/img/At the office-amico 1.png";
import { useState } from "react";
import useNotify from "../../../hooks/useNotify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../apis/authApi";
import { setLoading, fetchUser } from "../../../store/slices/user.slices";

export default function BusinessLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify, contextHolder } = useNotify();
  const validate = () => {
    const newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu tối thiểu 8 ký tự";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      (async () => {
        try {
          dispatch(setLoading(true));
          await auth.loginBusiness({ email: formData.email, password: formData.password });
          await dispatch(fetchUser() as any);
          dispatch(setLoading(false));
          notify(true, "Đăng nhập thành công");
          setTimeout(() => navigate('/'), 2000);
        } catch (err: any) {
          dispatch(setLoading(false));
          notify(false, err.message || 'Login failed');
        }
      })();
    }
  };
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {contextHolder}
      {/* LEFT */}
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
            Cùng Rikkei Education tiếp cận nguồn nhân lực chất lượng cao
          </h2>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: 40,
              width: 486.54,
              height: 472.75,
              display: "flex",
              flexDirection: "column",
            }}
          >

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
                style={{
                  width: "100%",
                  height: 65,
                  borderRadius: 5,
                  border: "1px solid #DEDDE4",
                  padding: "0 12px",
                }}
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
                  style={{
                    width: "100%",
                    height: 65,
                    borderRadius: 5,
                    border: "1px solid #DEDDE4",
                    padding: "0 45px 0 12px",
                  }}
                />

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
              {errors.password && (
                <p style={{ color: "#C62828", fontSize: 12, marginTop: 4 }}>
                  {errors.password}
                </p>
              )}
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
            height: 641,
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
          src={office}
          alt="Office"
          style={{
            width: 600,
            height: 600,
            objectFit: "contain",
          }}
        />
      </div>

    </div>
  );
}
