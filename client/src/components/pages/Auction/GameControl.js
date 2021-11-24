import React, { Component} from "react";
import "../../../App.css";
import AuctionD from "../../assets/AuctionDetail.module.css";
import {Button, Card} from "react-bootstrap"
//Ảnh
import banner1 from "../../images/img-1.png";
import clock from "../../images/clock.png";


class HistoryTable extends Component {
    
    render() {
        return (
            <div
                className={`body-container pt-2 pl-5 pr-5 ${AuctionD.detailCard}`}
            >
                <Card.Img
                    variant="top"
                    src={banner1}
                    className={AuctionD.imgCard}
                />
                <Card.Body>
                    {/* position */}
                    <Card.Title className={AuctionD.auctionTitle}>
                        Vị trí: {this.props.position}
                    </Card.Title>
                    {/* banner Size*/}

                    <span className={AuctionD.auctionSize}>Kích thước: {this.props.bannerSize}</span>
                    <span className={AuctionD.auctionWebsite}>
                        Trang web: {this.props.website}
                    </span>

                    {/* current time & the current winner */}
                    <div className="d-flex pt-4">
                        <span>
                            <strong> Thời gian:{" "}
                                <Card.Img style={{maxWidth:20, marginBottom: 3}} src={clock}/>
                                {" "}
                                {this.props.currentTime}
                            </strong>
                        </span>
                        <span className={AuctionD.auctionWinCurrent}>
                            <strong>Người thắng hiện tại: </strong>
                            <span>{this.props.userWinner}</span>
                        </span>
                    </div>

                    <div className="d-flex pt-4">
                        {/* highest Price */}
                        <div>
                            <b className={AuctionD.priceCurrent}>Giá cao nhất hiện tại:</b>{" "}
                            <br />
                            <b className={AuctionD.priceShow}>{this.props.highestPrice} VNĐ</b>
                        </div>

                        {/*price Step */}
                        <div className={AuctionD.jumpPriceInfo}>
                            <b className={AuctionD.priceJump}>Bước giá:</b><br />
                            <b className={AuctionD.priceJumpShow}>{this.props.priceStep} VNĐ</b>
                        </div>
                    </div>
                    {this.props.isPrepare ? 
                        <div>
                            <strong className={AuctionD.priceJumpShow}>Vui lòng đợi đến giờ cuộc đấu giá bắt đầu</strong>
                        </div>
                        : <div></div>
                    }
                    { this.props.isStart ? 
                        <div className="d-flex pt-5">
                            <div>
                                <Button
                                    onClick={this.props.handleDecrement}
                                    variant="info"
                                    style={{ minWidth: "3vw" }}
                                >
                                    <b>-</b>
                                </Button>
                                <span className="ml-3 mr-3">
                                    <b className={AuctionD.priceTurn}>{this.props.currentPrice}VNĐ</b>
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
                                onClick={this.props.handleBet}
                                variant={`info ${AuctionD.mglButton}`}
                                style={{ minWidth: "12vw" }}
                            >
                                <b>Đặt giá thầu</b>
                            </Button>
                        </div>
                        : <div></div>
                    }
                    { this.props.isEnding ? 
                        <div>
                            <span className={AuctionD.auctionWinCurrent}>
                                <strong>
                                    Chúc mừng ông/bà <span>{this.props.userWinner}</span> đã chiến thắng !!
                                </strong>
                                <strong>
                                    Tổng số tiền là: <b className={AuctionD.priceShow}>{this.props.highestPrice} VNĐ</b> 
                                </strong>
                                                        
                            </span>
                        </div>
                        : <div></div>
                    }
                </Card.Body>
            </div>
        );
    }
} 

export default HistoryTable;