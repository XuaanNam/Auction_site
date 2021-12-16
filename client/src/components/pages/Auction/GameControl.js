import React, { Component} from "react";
import "../../assets/Auction.css";
import {Button, Card} from "react-bootstrap"
//Ảnh
import clock from "../../images/clock.png";


class HistoryTable extends Component {
    state = {
        haveWinner: false,
    }

    render() {
        if(this.props.userWinner !== "" && this.state.haveWinner === false) {
            this.setState({haveWinner: true});
        } console.log(this.state.haveWinner, this.props.userWinner)
        return (
            <div className="auc-game-control">
                <img alt="" src={('../' + this.props.urlImage)} className="img-banner"/>
                <Card.Body>
                    <div className="auc-info">
                        <div className="d-flex auc-site">
                            <span >
                                Trang web: {this.props.website}
                            </span>
                        </div>
                        <div className="d-flex">
                            <span>Vị trí: {this.props.position}</span>
                            <span>Kích thước: {this.props.bannerSize}</span>            
                        </div>                       
                    </div>
                    { this.props.isStart && 
                        <span>
                            <strong>Người thắng hiện tại: Ông/Bà {this.props.userWinner}</strong>
                        </span>
                    }
                    
                    <div className="d-flex pt-3">
                        <span>
                            {this.props.isPrepare && 
                                <strong> Thời gian bắt đầu:{" "} 
                                    <Card.Img style={{maxWidth:20, marginBottom: 3}} src={clock}/>
                                    {" "}
                                    {this.props.currentTime}
                                </strong>
                            }
                            {this.props.isStart && 
                                <strong> Thời gian còn lại:{" "} 
                                    <Card.Img style={{maxWidth:20, marginBottom: 3}} src={clock}/>
                                    {" "}
                                    {this.props.currentTime}
                                </strong>                            
                            } 
                            {this.props.isEnding && 
                                <strong> Đấu giá kết thúc vào lúc:{" "} 
                                    <Card.Img style={{maxWidth:20, marginBottom: 3}} src={clock}/>
                                    {" "}
                                    {this.props.currentTime}
                                </strong>
                            }
                        </span>
                    </div>
                    
                    <div className="d-flex pt-3  pb-4 auc-price">
                        {/* highest Price */}
                        <div>
                            {this.props.isPrepare && <b>Giá khởi điểm:</b>}
                            {this.props.isStart && <b>Giá cao nhất hiện tại:</b>}
                            {this.props.isEnding && <b>Tổng giá trị:</b>}
                            <br />
                            <span >{this.props.highestPrice} VNĐ</span>
                        </div>

                        {/*price Step */}
                        <div>
                            <b>Bước giá:</b><br />
                            <span >{this.props.priceStep} VNĐ</span>
                        </div>
                    </div>

                    {this.props.isPrepare &&
                        <span className="d-flex">
                            <strong className = "mess-prepare">Vui lòng đợi đến giờ cuộc đấu giá bắt đầu!!!</strong>
                        </span>
                    }
                    { this.props.isStart && 
                        <div className="d-flex">
                            <div className="mr-3" style={{margin:"auto"}}>
                                <Button
                                    onClick={this.props.handleDecrement}
                                    variant="info"
                                    style={{ minWidth: "3vw" }}
                                >
                                    <b>-</b>
                                </Button>
                                <span className="ml-3 mr-3">
                                    <b className="auc-price">{this.props.currentPrice} VNĐ</b>
                                </span>
                                <Button
                                    onClick={this.props.handleIncrement}
                                    variant="info"
                                    style={{ minWidth: "3vw" }}
                                >
                                    <b>+</b>
                                </Button>
                            </div>
                            <Button
                                style={{ minWidth: "10vw" ,margin:"auto"}}
                                onClick={this.props.handleBet}
                                variant={`info $"mglButton}`}
                            >
                                <b>Đặt giá thầu</b>
                            </Button>
                        </div>
                    }
                    { this.props.isEnding && 
                        <div>
                            {this.state.haveWinner ?
                                <span className = "auc-price">
                                    <strong>
                                        Chúc mừng ông/bà <span>{this.props.userWinner}</span> đã chiến thắng !!
                                    </strong><br/>
                                    <strong>
                                        Tổng số tiền là: <span >{this.props.highestPrice} VNĐ</span> 
                                    </strong>                
                                </span>
                                : 
                                <span className = "auc-price">
                                    <strong>
                                        Chưa có ai thắng game đấu này! Vui lòng đợi lần đấu giá tiếp theo
                                    </strong>              
                                </span>
                            }
                        </div>
                    }
                </Card.Body>
            </div>
        );
    }
} 

export default HistoryTable;