import React, { Component} from 'react';
import {Row, Col} from "react-bootstrap";
import AuctionGame from './AuctionGame';

class isHappening extends Component {
    

    render() {
        return(       
            <div className="tab-pane active">
                <Row className="justify-content-md-center pt-5 mg-items">
                    {this.props.listAucH.filter(auc => auc.idDG % 2 === 1 ).map(auc =>(                      
                        <Col className="col-items" xs sm="5" mr-2>
                            <AuctionGame 
                                key={auc.idDG} 
                                idRoom={"auction/" + auc.idDG}
                                auc={auc}
                                handleLiked={false}
                            />    
                        </Col>
                    ))}    
                    {this.props.listAucH.filter(auc => auc.idDG % 2 === 0 ).map(auc =>(                      
                        <Col className="col-items" xs sm="5" mr-2>
                            <AuctionGame 
                                key={auc.idDG} 
                                idRoom={"auction/" + auc.idDG}
                                auc={auc}
                                handleLiked={false}
                            />    
                        </Col>
                    ))}    
                </Row>
            </div>
        );
    }
}

export default isHappening;