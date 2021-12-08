
export default function tabHappening (props) {

    return(
 
        <div className="tabs">
            <div className="tab-item active">
                <span className="auction-title">Đang diễn ra</span>
            </div>
            <div onClick={props.handleSwitchTab} className="tab-item">
                <span className="auction-title">Sắp được đấu giá</span>
            </div>
        </div>
   
    );
}

