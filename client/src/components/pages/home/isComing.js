import React, { Component} from 'react';
import {CheckCircle, Close, Error} from '@material-ui/icons';
import { Row, Col} from "react-bootstrap";
import AuctionGame from './AuctionGame';
import Coming from '../../assets/isComing.module.css'

class isComing extends Component {

   
    render() {
        return (
            <div className="tab-pane active">
                {this.props.listAucC && 
                    <Row className="justify-content-md-center pt-5 mg-items">
                        {this.props.listAucC.filter(auc => auc.idDG % 2 === 1).map(auc =>(                      
                            <Col key={auc.idDG} className="col-items mr-2" xs sm="5" >
                                <AuctionGame 
                                    idRoom={"auction/" + auc.idDG}
                                    auc={auc}
                                    handleLiked = {this.props.handleLiked}
                                />    
                            </Col>
                        ))}    
                        {this.props.listAucC.filter(auc => auc.idDG % 2 === 0).map(auc =>(                      
                            <Col key={auc.idDG} className="col-items mr-2" xs sm="5">
                                <AuctionGame 
                                    idRoom={"auction/" + auc.idDG}
                                    auc={auc}
                                    handleLiked = {this.props.handleLiked}
                                />    
                            </Col>
                        ))}            
                    </Row>    
                }
               
            </div>
        );
    }
}

export default isComing;
