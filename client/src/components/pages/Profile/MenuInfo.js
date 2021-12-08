import {Contacts} from '@material-ui/icons';
import React, {Component} from 'react';

class MenuInfo extends Component {
    render() {
        return(
            <span onClick={this.props.handleSwitchTab} className="btn-dark btn ">
              
                    <Contacts className="mr-2"/>
                    Thông tin cơ bản
                
            </span>
        )
    }
}

export default MenuInfo;