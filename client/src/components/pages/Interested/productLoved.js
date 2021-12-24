import {BorderHorizontal, GpsFixed, Language
     } from '@material-ui/icons';
import React, {  useState } from 'react'
import styled from 'styled-components';
import Interest from '../../assets/Interested.module.css'

//
import axios from "../../../api/axios"; 

function ProductLoved (props) {
    const [idQT] = useState(props.list.idQT);

    const handleDeleteLoved = () => {
        axios.delete("delete/my/loved", {data: {idQT}})
            .then((res) =>{ 
                res.data.message && props.setToastMessage('success', 'Thành công', res.data.message);
                props.onDelete(idQT);
            })
    }

    const convertPrice = (price) => { 
        const formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0
        })
          
        return formatter.format(price);
    }

    return(
        <Having> 
            <a href={("/auction/" + props.list.idDG)}>
                <Image src={props.list.HinhAnh} />
            </a>
            <ProductDetail>
                <span className={Interest.urlWebsiteBanner}>
                    <Language className="mr-1"/>
                    Website URL: <span className="text-danger">
                        <a href={props.list.Website} target="_blank" rel="noreferrer"> 
                        {/* BIDING ở đây */}
                        {props.list.Website}
                        </a>
                    </span>
                </span>

                <span className={Interest.positionBanner}>
                    <GpsFixed className="mr-1"/>
                    Vị trí: 
                    <span className="text-warning"> {props.list.ViTri}</span>
                </span>

                <span className={Interest.sizeBanner}>
                    <BorderHorizontal className="mr-1"/>
                    Kích thước:
                    <span className="text-warning"> {props.list.KichThuoc}</span>
                </span>
                <span className={Interest.timeDuration}>
                    <BorderHorizontal className="mr-1"/>
                    Thời hạn:
                    <span className="text-warning"> {props.list.ThoiHan} tháng</span>
                </span>
                <span className={Interest.timeBegunBanner}>
                    ⏱ Thời gian:
                    <span className="text-danger"> {props.list.TgBatDau}</span>
                    
                </span>

                <span className={Interest.timePlayBanner}>
                    ⏳ Thời gian đấu giá:
                    <span className="text-danger"> {props.list.TgDauGia} phút</span>
                    
                </span>

                <span className={Interest.priceBegunBanner}>
                    💸 Giá khởi điểm:
                    <span className="text-success"> {convertPrice(props.list.Gia)} VNĐ</span>
                </span>
                <span className={Interest.priceJumpBanner}>
                    💰 Bước giá:
                    <span className="text-success"> {convertPrice(props.list.BuocGia)} VNĐ</span>
                </span>

                <span className={Interest.notifyInterest}>
                    <span className=""> HÃY CHỜ ĐẾN PHIÊN ĐẤU GIÁ !!</span>
                </span>

                <button onClick={handleDeleteLoved} class={`btn btn-dark ${Interest.btnRemoveIn}`}>
                        ❌
                </button>
            </ProductDetail>
        </Having>
    );
}


const Having = styled.div`
    position: relative;
    border: 2px solid #343a40;
    border-radius: 10px;
    margin-left: -4.125rem;
    padding: 2.25rem 1.25rem 5rem 1.25rem;
    height: 27rem;
    margin-bottom: 4.125rem;
    margin-right: 1.25rem;
    box-shadow: 0 0 10px rgb(73, 60, 74);
    &:hover {
        box-shadow: 0 0 10px rgb(154, 65, 162);
        border: 2px solid rgb(154, 65, 162);
    }
`;


const Image = styled.img`
    
    width: 65%;
    height: 23rem;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.9);
   
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;



export default ProductLoved