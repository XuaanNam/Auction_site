import { DoneAll } from "@material-ui/icons";
import React, { useState } from "react";
//
//
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Infomation = () => {
  const [error, setError] = useState("");
  const userid = cookies.get("userid") ? cookies.get("userid") : null;
  const username = cookies.get("username") ? cookies.get("username") : null;

  let navigate = useNavigate();
  let isAuth = 0;

  const handleEdit = () => {};
  return (
    <div>
      <div className="profile-ProfileBody">
        <div className="profile-ProfileCard card-item fade-card mobile-active">
          <h4 className="profile-CardHeader">Thông tin cơ bản</h4>
          <div className="profile-CardBody">
            <div className="profile-UserInfo">
              <div className="profile-InfoName basic">Tên người dùng:</div>
              <input className="profile-InputText basic" />
              {/* <InfoName className="edit-basic display-none">First Name</InfoName> */}
              {/* Xử lý */}
              {/* <InfoName className="edit-basic display-none">Last Name</InfoName> */}
              {/* Xử lý */}
            </div>
            <div className="profile-UserInfo">
              <div className="profile-InfoName">Họ & tên</div>
              <input className="profile-InputTextDouble basic" />
              <input className="profile-InputTextDouble marginforDouble" />
              {/* Xử lý */}
            </div>
            <div className="profile-UserInfo">
              <div className="profile-InfoName">Ngày sinh:</div>
              <input className="profile-InputText basic" />
              {/* Xử lý */}
            </div>
            <div className="profile-UserInfo">
              <div className="profile-InfoName">Giới tính:</div>
              <input className="profile-InputText basic" />
              {/* Xử lý */}
            </div>
          </div>
        </div>
      </div>
      <div className="profile-ProfileBody pt3">
        <div className="profile-ProfileCard">
          <h4 className="profile-CardHeader">Thông tin liên lạc</h4>

          <div className="profile-CardBody">
            <div className="profile-UserInfo">
              <div className="profile-InfoName">Email:</div>
              <input className="profile-InputText contact" />
              {/* xử lý*/}
            </div>
            <div className="profile-UserInfo">
              <div className="profile-InfoName">Số điện thoại:</div>
              <input className="profile-InputText contact" />
              {/* xỬ LÝ */}
            </div>
          </div>
          <div className="profile-CardFooter"></div>
          <div className="profile-CardFooter">
            <button
              className="profile-EditButton"
              onClick={handleEdit}
              className="btn btn-dark btn-custom basic"
            >
              <DoneAll className="mr-1" />
              Chỉnh sửa
            </button>
            {/* xử lý */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infomation;
