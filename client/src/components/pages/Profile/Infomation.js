import { DoneAll } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
//
import axios from "../../../api/axios";

function Infomation(props) {
  const [error, setError] = useState("");
  const [ho, setHo] = useState("");
  const [ten, setTen] = useState("");
  const [tenDN, setTenDN] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [sDT, setSDT] = useState("");

  useEffect(()=>{
    setHo(props.Ho);
    setTen(props.Ten);
    setTenDN(props.TenDN);
    setNgaySinh(props.NgaySinh);
    setSDT(props.SDT);
  }, [props.Ho, props.NgaySinh, props.SDT, props.Ten, props.TenDN])

  const handleEdit = (event) => {
    event.preventDefault();
    if(ho === "" || ten === "" || tenDN === ""){
      setError("Vui lòng không để trống trường Họ & Tên, Tên người dùng!");
    } else { console.log(ho, ten, tenDN, ngaySinh, sDT)
      axios
        .patch("update/profile", {
          ho, ten, tenDN, ngaySinh, sDT
        })
        .then((Response) => {
          if (Response.data.message) {
            setError(Response.data.message);
          } 
        })
        .catch(() => {
          setError(
            "Đã có một lỗi bất thường xảy ra, vui lòng thử lại sau ít phút!"
          );
        })
        .then(() => {
          window.location.reload(false);
        })
    }
  };
  return (
    <div>
     
        <div className="info">
          <h4>Thông tin cơ bản</h4>
          <div>
            <div className="d-grid">
              <label>Tên người dùng:</label>
              <input type="text" value={tenDN} onChange={(e) => {setTenDN(e.target.value);}}/>
            </div>

            <div className="d-grid">
              <label>Họ & tên:</label>
              
              <span>
                <input type="text" value={ho} onChange={(e) => {setHo(e.target.value);}}/>
                <input type="text" value={ten} onChange={(e) => {setTen(e.target.value);}}/>  
              </span>
              
            </div>

            <div className="d-grid">
              <label c>Ngày sinh:</label>
              <input type="date" value={ngaySinh} onChange={(e) => {setNgaySinh(e.target.value);}}/>
            </div>

          </div>
        </div>
   
        <div className="info">
          <h4 >Thông tin liên lạc</h4>

          <div >
            <div className="d-grid">
              <label>Email:</label>
              <input value={props.Email} disabled="disabled"/>
            </div>
            <div className="d-grid">
              <label>Số điện thoại:</label>
              <input 
                type="number" 
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" 
                value={sDT} 
                onChange={(e) => {setSDT(e.target.value.toString());}}
              />
            </div>
          </div>
        </div>
        <div className="btn-edit">
          {error?  <span className="cp-err">{error}</span> : <span></span>}
          <br/><br/>
          <button
            className="btn"
            onClick={handleEdit}
          >
            <DoneAll className="mr-1" />
            Chỉnh sửa
          </button>
        </div>
        
    </div>
  );
};

export default Infomation;
