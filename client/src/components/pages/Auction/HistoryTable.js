import React, { Component } from "react";
import "../../assets/Auction.css";
import { Table } from "react-bootstrap";


class HistoryTable extends Component {
    render() {
        if(this.props.listBetHistory.length === 0) {
            return(<span></span>);
        } else {
            return (
                <Table responsive className="auction-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Người chơi</th>
                            <th>Giá thầu</th>
                            <th>Ngày giờ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.listBetHistory
                            .sort((a, b) => {return parseInt(a.id) > parseInt(b.id) ? -1 : 1})
                            .map((list ) => { 
                            return (    
                                <tr>    
                                    <td>{list.id}</td>
                                    <td>{list.userWinner}</td>
                                    <td>{list.highestPrice}</td>
                                    <td>{list.currentTime}</td>
                                </tr>
                            );
                        })}
            
                    </tbody>
                </Table>
            );
        }
        
    }
} 

export default HistoryTable;