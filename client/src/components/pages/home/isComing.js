import React, { Component} from 'react';
import { Row, Col} from "react-bootstrap";
import AuctionGame from './AuctionGame';

class isComing extends Component {

   
    render() {
        return (
            <div className="tab-pane active">
                {this.props.listAuc.map(auc =>(
                    <Row className="justify-content-md-center pt-5 mg-items">
                        <Col className="col-items" xs sm="5" mr-2>
                            <AuctionGame 
                                key={auc.idDG} 
                                auc={auc}
                                handleLiked = {this.handleLiked}
                            />    
                        </Col>
                        <Col className="col-items" xs sm="5" mr-2>
                            <AuctionGame 
                                key={auc.idDG} 
                                auc={auc}
                                handleLiked = {this.props.handleLiked}
                            />    
                        </Col>              
                    </Row>
                ))}
            </div>
        );
    }
}

export default isComing;
