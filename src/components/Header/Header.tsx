import rikkeiLogo from "../../assets/img/rikkei logo.png";
import phonecall from "../../assets/img/PhoneCall.png";
import america from "../../assets/img/America.png";

export default function Header() {
    const leftMenuItemStyle: React.CSSProperties = {
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: 14,
        lineHeight: "20px",
        letterSpacing: "0%",
        cursor: "pointer",
        color: "#333333",
    };

    return (
        <header style={{ width: "100%" }}>

            <div
                style={{
                    width: "100%",
                    height: 48,
                    backgroundColor: "#F1F2F4",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 30px",
                    boxSizing: "border-box",
                }}
            >
                <div style={{ display: "flex", gap: 24 }}>
                    <span style={leftMenuItemStyle}>Trang chủ</span>
                    <span style={{ ...leftMenuItemStyle }}>Việc làm</span>
                    <span style={leftMenuItemStyle}>CV của bạn</span>
                    <span style={leftMenuItemStyle}>Customer Supports</span>
                </div>




                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>

                    {/* PHONE */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <img
                            src={phonecall}
                            alt="phone icon"
                            style={{ width: 16, height: 16 }}
                        />
                        <span
                            style={{
                                fontFamily: "Inter",
                                fontWeight: 500,
                                fontSize: 14,
                                lineHeight: "20px",
                                color: "#333",
                            }}
                        >
                            +1-202-555-0178
                        </span>
                    </div>


                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src={america}
                            alt="america icon"
                            style={{ width: 20, height: 14 }}
                        />
                        <span
                            style={{
                                fontFamily: "Inter",
                                fontSize: 14,
                                lineHeight: "20px",
                                color: "#333",
                            }}
                        >
                            English
                        </span>
                    </div>
                </div>

            </div>


            <div
                style={{
                    width: "100%",
                    height: 139,
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    justifyContent: "center",
                    boxShadow: "0px 4px 12px 0px #23165114",
                }}
            >

                <div
                    style={{
                        width: 1440,
                        padding: "0 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 24,
                        boxSizing: "border-box",
                    }}
                >

                    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                        {/* LOGO */}
                        <img
                            src={rikkeiLogo}
                            alt="Rikkei Edu"
                            style={{ height: 34.87, width: 98.69, cursor: "pointer" }}
                        />


                        <div
                            style={{
                                width: 668,
                                height: 50,
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid #E0E0E0",
                                borderRadius: 6,
                                padding: "0 16px",
                                gap: 12,
                                boxSizing: "border-box",
                            }}
                        >

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    whiteSpace: "nowrap",
                                    fontSize: 14,
                                }}
                            >
                                Hà Nội
                            </div>


                            <div
                                style={{
                                    width: 1,
                                    height: 24,
                                    backgroundColor: "#E0E0E0",
                                }}
                            />


                            <input
                                placeholder="Job title, keyword, company"
                                style={{
                                    border: "none",
                                    outline: "none",
                                    width: "100%",
                                    fontSize: 14,
                                }}
                            />
                        </div>
                    </div>


                    <div style={{ display: "flex", gap: 12 }}>
                        <button
                            style={{
                                width: 134,
                                height: 48,
                                padding: "12px 24px",
                                borderRadius: 3,
                                border: "1px solid #C62828",
                                backgroundColor: "#C62828",
                                color: "#FFFFFF",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Đăng Nhập
                        </button>

                        <button
                            style={{
                                width: 109,
                                height: 48,
                                padding: "12px 24px",
                                borderRadius: 3,
                                border: "1px solid #C62828",
                                backgroundColor: "#FFFFFF",
                                color: "#C62828",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Đăng Kí
                        </button>

                        <button
                            style={{
                                width: 140,
                                height: 48,
                                padding: "12px 24px",
                                borderRadius: 3,
                                border: "none",
                                backgroundColor: "#24125F",
                                color: "#FFFFFF",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Đăng Tuyển
                        </button>
                    </div>
                </div>
            </div>


        </header>
    );
}
