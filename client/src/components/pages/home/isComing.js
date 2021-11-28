import React, { Component} from 'react';
import { Row, Col} from "react-bootstrap";
import AuctionGame from './AuctionGame';

class isComing extends Component {

   
    render() {
        return (
            <div className="tab-pane active">
                <Row className="justify-content-md-center pt-5 mg-items">
                    {this.props.listAucC.filter(auc => auc.idDG % 2 === 1).map(auc =>(                      
                        <Col className="col-items" xs sm="5" mr-2>
                            <AuctionGame 
                                key={auc.idDG} 
                                idRoom={"auction/" + auc.idDG}
                                auc={auc}
                                handleLiked = {true}
                            />    
                        </Col>
                    ))}    
                    {this.props.listAucC.filter(auc => auc.idDG % 2 === 0 && auc.TrangThai === '0').map(auc =>(                      
                        <Col className="col-items" xs sm="5" mr-2>
                            <AuctionGame 
                                key={auc.idDG} 
                                idRoom={"auction/" + auc.idDG}
                                auc={auc}
                                handleLiked = {true}
                            />    
                        </Col>
                    ))}            
                </Row>       
            </div>
        );
    }
}

export default isComing;
