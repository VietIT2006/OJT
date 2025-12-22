import rikkeiLogo from "../../../assets/img/rikkei logo.png";
import { useState } from "react";
import useNotify from "../../../hooks/useNotify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../apis/authApi";
import { setLoading, fetchUser } from "../../../store/slices/user.slices";

export default function BusinessRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const TextInput = ({
        label,
        placeholder,
        value,
        onChange,
        error,
        type = "text",
    }: {
        label: string;
        placeholder: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        error?: string;
        type?: string;
    }) => (
        <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 500 }}>{label}</label>

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 5,
                    border: "1px solid #DEDDE4",
                    padding: "0 12px",
                }}
            />

            {error && (
                <p style={{ color: "#C62828", fontSize: 12 }}>{error}</p>
            )}
        </div>
    );

    const PasswordInput = ({
        label,
        show,
        toggle,
        value,
        onChange,
        error,
    }: {
        label: string;
        show: boolean;
        toggle: () => void;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        error?: string;
    }) => (
        <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 500 }}>{label}</label>

            <div style={{ position: "relative" }}>
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder="********"
                    style={{
                        width: "100%",
                        height: 40,
                        borderRadius: 5,
                        border: "1px solid #DEDDE4",
                        padding: "0 44px 0 12px",
                    }}
                />

                <span
                    onClick={toggle}
                    style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                    }}
                >
                    👁
                </span>
            </div>

            {error && (
                <p style={{ color: "#C62828", fontSize: 12 }}>{error}</p>
            )}
        </div>
    );

    const SectionTitle = ({ title }: { title: string }) => (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 32,
            }}
        >
            <div
                style={{
                    width: 10,
                    height: 40,
                    backgroundColor: "#BC2228",
                    marginRight: 12,
                    borderRadius: 2,
                }}
            />
            <span
                style={{
                    fontSize: 24,
                    fontWeight: 700,
                    lineHeight: "24px",
                    color: "#0A033C",
                }}
            >
                {title}
            </span>
        </div>
    );


    const Input = ({
        label,
        placeholder,
        value,
        onChange,
        error,
    }: {
        label: string;
        placeholder: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        error?: string;
    }) => (
        <div style={{ marginBottom: 20 }}>
            <label>
                <span style={{ fontWeight: 500 }}>{label}</span>
            </label>

            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 5,
                    border: "1px solid #DEDDE4",
                    padding: "0 12px",
                }}
            />

            {error && (
                <p style={{ color: "#C62828", fontSize: 12 }}>{error}</p>
            )}
        </div>
    );

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        location: "",
        phone: "",
        companyEmail: "",
    });
    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        location: "",
        phone: "",
        companyEmail: "",
    });
    const validate = () => {
        const newErrors = {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            companyName: "",
            location: "",
            phone: "",
            companyEmail: "",
        };

        if (!formData.fullName.trim())
            newErrors.fullName = "Họ tên không được để trống";

        if (!formData.email.trim())
            newErrors.email = "Email không được để trống";
        else if (!/^\S+@\S+\.\S+$/.test(formData.email))
            newErrors.email = "Email không hợp lệ";

        if (!formData.password.trim())
            newErrors.password = "Mật khẩu không được để trống";
        else if (formData.password.length < 8)
            newErrors.password = "Mật khẩu tối thiểu 8 ký tự";

        if (!formData.confirmPassword.trim())
            newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
        else if (formData.confirmPassword !== formData.password)
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";

        if (!formData.companyName.trim())
            newErrors.companyName = "Tên công ty không được để trống";

        if (!formData.location.trim())
            newErrors.location = "Địa điểm làm việc không được để trống";

        if (!formData.phone.trim())
            newErrors.phone = "Số điện thoại không được để trống";
        else if (!/^[0-9]{8,11}$/.test(formData.phone))
            newErrors.phone = "Số điện thoại không hợp lệ";

        if (!formData.companyEmail.trim())
            newErrors.companyEmail = "Email công ty không được để trống";
        else if (!/^\S+@\S+\.\S+$/.test(formData.companyEmail))
            newErrors.companyEmail = "Email công ty không hợp lệ";

        setErrors(newErrors);

        return Object.values(newErrors).every((e) => e === "");
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notify, contextHolder } = useNotify();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            dispatch(setLoading(true));
            await auth.registerBusiness({
                fullname: formData.fullName,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                companyName: formData.companyName,
                location: formData.location,
                phone: formData.phone,
                companyEmail: formData.companyEmail,
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
        <div style={{ display: "flex", justifyContent: "center" }}>
            {contextHolder}
            {/* LEFT */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <div style={{ width: 560 }}>

                    {/* HEADER LEFT */}
                    <div style={{ paddingTop: 13 }}>
                        <img
                            src={rikkeiLogo}
                            alt="Rikkei Logo"
                            style={{ width: 200, height: 67.6 }}
                        />

                        <h2
                            style={{
                                marginTop: 24,
                                fontSize: 30,
                                fontWeight: 700,
                                lineHeight: "40px",
                            }}
                        >
                            Đăng kí để có thể tiếp cận nguồn nhân lực chất lượng cao
                        </h2>
                    </div>

                    {/* FORM LEFT */}
                    <div style={{ marginTop: 10 }}>
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            marginTop: 40,
                            width: 486.54,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <SectionTitle title="Thông tin tài khoản" />

                        <TextInput
                            label="Họ tên"
                            placeholder="Nhập họ tên"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                            }
                            error={errors.fullName}
                        />

                        <TextInput
                            label="Email"
                            placeholder="abc@gmail.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            error={errors.email}
                        />

                        <PasswordInput
                            label="Password"
                            show={showPassword}
                            toggle={() => setShowPassword(!showPassword)}
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            error={errors.password}
                        />

                        <PasswordInput
                            label="Confirm password"
                            show={showConfirmPassword}
                            toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({ ...formData, confirmPassword: e.target.value })
                            }
                            error={errors.confirmPassword}
                        />
                    </form>
                    </div>
                </div>
            </div>



            <div
                style={{
                    width: 120,
                    marginTop: 100,
                    display: "flex",
                    flexDirection: "column",
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

                <div style={{  textAlign: "center" }}>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        style={{
                            width: 474.95,
                            height: 65,
                            backgroundColor: "#C62828",
                            color: "#fff",
                            borderRadius: 5,
                            border: "none",
                            fontWeight: 600,
                            cursor: "pointer",
                            marginTop: 16,
                        }}
                    >
                        Đăng ký
                    </button>

                    <p style={{ marginTop: 16, fontSize: 14, textAlign: "center" }}>
                        Đã có tài khoản?{" "}
                        <span style={{ color: "#C62828", fontWeight: 500, cursor: "pointer" }}>
                            Đăng nhập ngay
                        </span>
                    </p>
                </div>
            </div>


            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <div style={{ width: 560, marginTop: 220 }}>
                    <SectionTitle title="Thông tin doanh nghiệp" />

                    <Input
                        label="Công ty"
                        placeholder="Tên công ty"
                        value={formData.companyName}
                        onChange={(e) =>
                            setFormData({ ...formData, companyName: e.target.value })
                        }
                        error={errors.companyName}
                    />

                    <Input
                        label="Địa điểm làm việc"
                        placeholder="Chọn tỉnh/thành phố"
                        value={formData.location}
                        onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                        }
                        error={errors.location}
                    />

                    <Input
                        label="Số điện thoại liên hệ"
                        placeholder="012345678"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        error={errors.phone}
                    />

                    <Input
                        label="Email công ty"
                        placeholder="abc@company.com"
                        value={formData.companyEmail}
                        onChange={(e) =>
                            setFormData({ ...formData, companyEmail: e.target.value })
                        }
                        error={errors.companyEmail}
                    />
                </div>

            </div>

        </div>
    );
}
