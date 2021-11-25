import { DoneAll } from "@material-ui/icons";
import React, { useState } from "react";
//
//
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ChangePass = () => {
  const [MkCu, setMatKhauCu] = useState("");
  const [MkMoi, setMatKhauMoi] = useState("");
  const [CFMkMoi, setCFMatKhauMoi] = useState("");
  const [error, setError] = useState("");
  const userid = cookies.get("userid") ? cookies.get("userid") : null;
  const username = cookies.get("username") ? cookies.get("username") : null;

  let navigate = useNavigate();
  let isAuth = 0;
  const handleChangePassword = (event) => {
    event.preventDefault();
    if (MkCu === MkMoi) {
      setError("Mật khẩu mới trùng với mật khẩu cũ!");
    }
    axios
      .patch("update/password", {
        MkCu,
        MkMoi,
        userid,
        username,
      })
      .then((Response) => {
        if (Response.data.message) {
          setError(Response.data.message);
        } else if (isAuth === false) {
          navigate("/login");
        } else {
          setError("Cập nhật mật khẩu thành công!");
        }
      })
      .catch(() => {
        setError(
          "Đã có một lỗi bất thường xảy ra, vui lòng thử lại sau ít phút!"
        );
      });
  };

  return (
    <div className="profile-ProfileCard card-item mobile-active">
      <h4 className="profile-CardHeader">Thay đổi mật khẩu</h4>
      <div className="profile-CardBody">
        <div className="profile-UserInfo">
          <div className="profile-InfoName">
            {" "}
                 Mật khẩu cũ:
          </div>
          <input
            className="profile-InputText"
            type="password"
            onChange={(e) => {
              setMatKhauCu(e.target.value);
            }}
          />
        </div>
        <div className="profile-UserInfo">
          <div className="profile-InfoName">Mật khẩu mới:</div>
          <input
            className="profile-InputText"
            type="password"
            onChange={(e) => {
              setMatKhauMoi(e.target.value);
            }}
          />
        </div>
        <div className="profile-UserInfo">
          <div className="profile-InfoName">Xác nhận mật khẩu:</div>
          <input
            className="profile-InputText"
            type="password"
            onChange={(e) => {
              setCFMatKhauMoi(e.target.value);
            }}
          />
        </div>
      </div>
      {error}
      <div className="profile-CardFooter">
        <button
          className="profile-EditButton btn btn-dark btn-custom basic"
          onClick={handleChangePassword}
        >
          <DoneAll className="mr-1" />
          Chỉnh sửa
        </button>
        {/*Xử lý*/}
      </div>
    </div>
  );
};

export default ChangePass;
