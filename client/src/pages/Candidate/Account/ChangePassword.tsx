import Header from "../../components/Header/Header";
import  "../../index.css"
import Footer from "../../components/Footer/Footer";

import Lock from "../../assets/img/Lock.png";

import User from "../../assets/img/User.png";



export default function ChangeAccInfo() {
  const labelBold: React.CSSProperties = {
  fontWeight: 600,
}

const inputBox341: React.CSSProperties = {
  width: 341,
  height: 50,
  display: "flex",
  alignItems: "center",
  gap: 8,
  border: "1px solid #797979",
  outline: "2px solid #797979",
  borderRadius: 4,
  padding: "0 12px",
  boxSizing: "border-box",
  background: "#fff",
}

const inputStyle341: React.CSSProperties = {
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: 16,
  color: "#9199A3",
}


  return (
    <div className="hide-top-header" style={{ background: "#F5F6F8" }}>
      <Header />
       {/* CONTENT */}
      <div
        style={{
          maxWidth: 1440,
          margin: "40px auto",
          display: "flex",
          gap: 24,
        }}
      >
        {/* LEFT MENU */}
        <div
          style={{
            width: 534,
            height:306,
            background: "#fff",
            borderRadius: 8,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ fontSize: 26,fontWeight:700,marginBottom: 20 ,borderBottom: "1px solid #CCCCCC",paddingBottom: 16}}>Danh mục</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 20, color: "#C62828" }}>
              <img src={User} width={48} height={48} />
              <span style={{ fontSize: 24, fontWeight: 600 }}>Thông tin cá nhân</span>
            </div>

            <div style={{ display: "flex", gap: 20 }}>
              <img src={Lock} width={48} height={48} />
              <span style={{ fontSize: 24, fontWeight: 600 }}>Bảo mật</span>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 8,
            padding: 32,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            maxHeight: 749,
            minWidth: 826,

          }}
        >
          {/* USER HEADER */}
          <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>

            <div>
              <h3 style={{ margin: 0,fontWeight:600,fontSize:24 }}>Đổi mật khẩu</h3>
            </div>
          </div>

          {/* FORM */}
{/* GRID 2 CỘT – CÁC FIELD CHÍNH */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 44,
  }}
>
  {[
    { label: "Mật khẩu cũ", icon: Lock, value: "Nhập mật khẩu cũ" },
    { label: "Mật khẩu mới", icon: Lock, value: "Nhập mật khẩu mới" },
  ].map((item) => (
    <div key={item.label}>
      <label style={labelBold}>{item.label}</label>

      <div style={inputBox341}>
        <img src={item.icon} width={32} />
        <input
          defaultValue={item.value}
          style={inputStyle341}
        />
      </div>
    </div>
  ))}
</div>




          {/* SAVE BUTTON */}
          <div style={{ textAlign: "right", marginTop: 32, }}>
            <button
              style={{
                background: "#C62828",
                color: "#fff",
                border: "none",
                padding: "10px 24px",
                borderRadius: 4,
                cursor: "pointer",
                width: 105,
                height: 48,
              }}
            >
              Lưu Lại
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}