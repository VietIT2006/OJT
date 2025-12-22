import rikkeiwhite from "../../assets/img/rikkeiwhite.png";
import facebookIcon from "../../assets/img/facebookicon.png";
import youtubeIcon from "../../assets/img/ytbicon.png";


export default function Footer() {
    const FooterTitle = ({ title }: { title: string }) => (
        <div
            style={{
                height: 24,
                marginBottom: 16,
                fontWeight: 600,
                fontSize: 16,
                color: "#FFFFFF",
                lineHeight: "24px",
                whiteSpace: "nowrap",
            }}
        >
            {title}
        </div>
    );
    const footerItemStyle: React.CSSProperties = {
        fontFamily: "Cabin",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "150%",
        color: "#EBB0B2",
        marginBottom: 8,
    };

    return (
        <footer
            style={{
                width: "100%",
                backgroundColor: "#BC2228",
                padding: "40px 24px 16px",
                boxSizing: "border-box",
                color: "#fff",
            }}
        >
            {/* CONTENT */}
            <div
                style={{
                    maxWidth: 1440,
                    margin: "0 auto",
                    display: "flex",
                    gap: 58,
                }}
            >
                {/* COLUMN 1 */}
                <div style={{ flex: 1 }}>
                    <img
                        src={rikkeiwhite}
                        alt="Rikkei Education"
                        style={{ width: 98.69, height: 34.87, marginBottom: 46 }}
                    />

                    <p style={{ fontSize: 14, lineHeight: "22px" }}>
                        Tầng 7 tháp A tòa Sông Đà, đường Phạm Hùng,
                        <br />
                        quận Nam Từ Liêm, Hà Nội
                    </p>

                    <p style={{ fontSize: 14, marginTop: 8 }}>0862 069 233</p>
                    <p style={{ fontSize: 14 }}>academy@rikkeisoft.com</p>

                    {/* SOCIAL */}
                    <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                        <img
                            src={facebookIcon}
                            alt="Facebook"
                            style={{
                                width: 24,
                                height: 24,
                                cursor: "pointer",
                            }}
                        />

                        <img
                            src={youtubeIcon}
                            alt="YouTube"
                            style={{
                                width: 24,
                                height: 24,
                                cursor: "pointer",
                            }}
                        />
                    </div>

                </div>
                <div
                    style={{
                        display: "flex",
                        gap: 50,
                    }}
                >
                    {/* COLUMN 2 */}
                    <div style={{ minWidth: 160 }}>
                        <FooterTitle title="Khóa học" />

                        <div style={{ marginTop: 8 }}>
                            <p style={footerItemStyle}>Làm quen với Code</p>
                            <p style={footerItemStyle}>Bootcamp Fulltime</p>
                            <p style={footerItemStyle}>Bootcamp Parttime</p>
                            <p style={footerItemStyle}>Kỹ sư CNTT - PTIT</p>
                            <p style={footerItemStyle}>Bổ trợ cho nghề</p>
                        </div>
                    </div>


                    {/* COLUMN 3 */}
                    <div style={{ minWidth: 160 }}>
                        <FooterTitle title="Tài nguyên học tập" />
                        <div style={{ marginTop: 8 }}>
                            <p style={footerItemStyle}>Blog</p>
                            <p style={footerItemStyle}>Ebook - Report</p>
                            <p style={footerItemStyle}>Khóa học miễn phí</p>
                            <p style={footerItemStyle}>Sự kiện - Webinar</p>
                            <p style={footerItemStyle}>Cộng đồng</p>
                        </div>
                    </div>


                    {/* COLUMN 4 */}
                    <div style={{ minWidth: 200 }}>
                        <FooterTitle title="Vì sao chọn Rikkei Academy" />
                        <div style={{ marginTop: 8 }}>
                            <p style={footerItemStyle}>Về Rikkei Academy</p>
                            <p style={footerItemStyle}>Hệ sinh thái Rikkei</p>
                            <p style={footerItemStyle}>Cơ hội nghề nghiệp</p>
                            <p style={footerItemStyle}>Tấm gương sáng</p>
                            <p style={footerItemStyle}>Liên hệ</p>
                        </div>
                    </div>

                </div>
            </div>

            <p
                style={{
                    marginTop: 24,
                    textAlign: "center",
                    fontSize: 12,
                    color: "#FFFFFF",
                }}
            >
                Copyright © 2023 Rikkei Education. All Rights Reserved.
            </p>
        </footer>
    );
}
