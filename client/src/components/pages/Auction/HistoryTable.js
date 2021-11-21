import React, { Component } from "react";
import "../../../App.css";
import AuctionD from "../../assets/AuctionDetail.module.css";
import { Table } from "react-bootstrap";


class HistoryTable extends Component {
    render() {
        return (
            <Table responsive className="auction-table">
                <thead>
                    <tr className={AuctionD.lineTable}>
                        <th>#</th>
                        <th>Người chơi</th>
                        <th>Giá thầu</th>
                        <th>Ngày giờ</th>
                    </tr>
                </thead>
                <tbody>
                    {/* .slice(1, listBetHistory.length) */}
                    {this.props.listBetHistory.map((list ) => { 
                        return (    
                            <tr>    
                                <td>{list.id}</td>
                                <td id="time">{list.userWinner}</td>
                                <td id="author">{list.highestPrice}</td>
                                <td>{list.currentTime}</td>
                            </tr>
                        );
                    })}
        
                </tbody>
            </Table>
        );
    }
} 

export default HistoryTable;