import Birthday from "../../../assets/img/Birthday.png";
import Phone from "../../../assets/img/Phone.png";
import Gender from "../../../assets/img/Gender.png";
import Lock from "../../../assets/img/Lock.png";
import Email from "../../../assets/img/Email.png";
import Info from "../../../assets/img/Info.png";
import Address from "../../../assets/img/Home Page.png";
import User from "../../../assets/img/User.png";


export default function CandidateAccountInfo() {
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

    const inputBox: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  border: "1px solid #797979",
  borderRadius: 4,
  padding: "8px 12px",
  marginTop: 6,
  outline: "2px solid #797979",
}


  return (
    <div className="hide-top-header" style={{ background: "#F5F6F8" }}>
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
            height:749,
            minWidth:826,

          }}
        >
          {/* USER HEADER */}
          <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                background: "#E0E0E0",
              }}
            />
            <div>
              <h3 style={{ margin: 0,fontWeight:600,fontSize:24 }}>Nguyễn Văn A</h3>
              <span style={{ color: "#777" ,fontWeight:400, fontSize:20,fontStyle:"italic" }}>Full-Stack Developer</span>
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
    { label: "Email", icon: Email, value: "nguyenvana@gmail.com" },
    { label: "SĐT", icon: Phone, value: "+84 0123 456 789" },
    { label: "Địa chỉ", icon: Address, value: "abc def" },
    { label: "Trang cá nhân", icon: Info, value: "fb.com/abc" },
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


{/* GIỚI TÍNH  */}
<div style={{ marginTop: 24, maxWidth: 151 ,height:50,marginBottom:44,paddingTop:13 }}> 
  <label style={labelBold}>Giới tính</label>
  <div style={inputBox}>
    <img src={Gender} width={32} />
    <select style={inputStyle341}>
      <option>Male</option>
      <option>Female</option>
    </select>
  </div>
</div>

{/* NGÀY SINH  */}
<div style={{ marginTop: 16, maxWidth: 181, height:50,paddingTop:20 }}>
  <label style={labelBold}>Ngày sinh</label>
  <div style={inputBox}>
    <img src={Birthday} width={32} />
    <input
      type="date"
      style={{
        ...inputStyle341,
        width: "auto",
        flex: 1,
      }}
    />


  </div>
</div>


          {/* SAVE BUTTON */}
          <div style={{ textAlign: "right", marginTop: 32,paddingTop:30 }}>
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
    </div>
  );
}