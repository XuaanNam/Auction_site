import { DoneAll } from "@material-ui/icons";
import React, { useState } from "react";
//
//
import axios from "../../../api/axios";

function ChangePass() {
  const [MkCu, setMatKhauCu] = useState("");
  const [MkMoi, setMatKhauMoi] = useState("");
  const [CFMkMoi, setCFMatKhauMoi] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = (event) => {
    event.preventDefault();
    if (MkCu === '' || MkMoi === '' || CFMkMoi === '') {
      setError("Vui lòng nhập đầy đủ các trường!");
    } else
    if (MkCu === MkMoi) {
      setError("Mật khẩu mới trùng với mật khẩu cũ!");
    } else
    if (CFMkMoi !== MkMoi) {
      setError("Xác nhận mật khẩu mới không khớp!");
    } else {
      axios
        .patch("update/password", {
          MkCu,
          MkMoi
        })
        .then((Response) => {
          if (Response.data.message) {
            setError(Response.data.message);
            setMatKhauCu('');
            setMatKhauMoi('');
            setCFMatKhauMoi('');
          } 
        })
        .catch(() => {
          setError(
            "Đã có một lỗi bất thường xảy ra, vui lòng thử lại sau ít phút!"
          );
        });
      }
  };

  return (
    <div>
      <div className="info">
        <h4>Thay đổi mật khẩu</h4>
        <div>
          <div className="d-grid passreload">
            <label >
              
                  Mật khẩu cũ:
            </label>
            <input
              type="password"
              value={MkCu}
              onChange={(e) => {
                setMatKhauCu(e.target.value);
              }}
            />
          </div>
          <div className="d-grid passreload">
            <label >Mật khẩu mới:</label>
            <input
              type="password"
              value={MkMoi}
              onChange={(e) => {
                setMatKhauMoi(e.target.value);
              }}
            />
          </div>
          <div className="d-grid passreload">
            <label >Xác nhận mật khẩu:</label>
            <input
              type="password"
              value={CFMkMoi}
              onChange={(e) => {
                setCFMatKhauMoi(e.target.value);
              }}
            />
          </div>
        </div>   
      </div>
      <div className="btn-edit">
        {error?  <span className="cp-err">{error}</span> : <span></span>}
        <br/><br/>
        <button
          className="btn"
          onClick={handleChangePassword}
        >
          <DoneAll className="mr-1" />
          Thay đổi
        </button>
      </div>
    </div>
    
  );
};

export default ChangePass;
