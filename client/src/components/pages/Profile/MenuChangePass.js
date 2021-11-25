import {VpnKey} from '@material-ui/icons';
import React, {Component} from 'react';
import styled from 'styled-components';
import { mobile } from '../../../responsive';

class MenuChangePass extends Component {
    render() {
        return(
            <MenuItem onClick={this.props.handleSwitchTab} className="item active-menu btn btn-custom bg-white" id="0">
                <span style={{ textDecoration: "none", color: "#333", marginRight: "12px" }}>
                    <VpnKey className="mr-2 mb-2"/>
                    Đổi mật khẩu
                </span>
            </MenuItem>
        )
    }
}
const MenuItem = styled.a`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 10px 10px 16px;
    vertical-align: middle;
    text-decoration: none;
    color: #343a40;
    font-size: 17px;
    font-weight: 500;
    border: 0.5px solid transparent;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    user-select: none;
    &:hover {
        color: #343a40;
        cursor: pointer;
        border-color: rgba(0, 0, 0, 0.2);
        opacity: 0.8;
        background-color: #333;
    }
    &:active {
        box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.05) inset;
    }
    
    ${mobile({
    width: "30%",
    padding: "5px 10px",
    fontSize: "15px",
    borderTopRightRadius: "6px",
    borderTopLeftRadius: "6px",
    borderBottomRightRadius: "0",
    borderBottomLeftRadius: "0",
    justifyContent: "center"
})}
`;

export default MenuChangePass;