import {Cancel,BorderHorizontal, GpsFixed, Language
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
                window.location.reload(false);
            })
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

                <span className={Interest.timeBegunBanner}>
                    ⏱ Thời gian:
                    <span className="text-danger"> {props.list.TgBatDau}</span>
                    
                </span>

                <span className={Interest.timePlayBanner}>
                    ⏳ Thời gian đấu giá:
                    <span className="text-danger"> {props.list.tgDauGia} 1 phút</span>
                    
                </span>

                <span className={Interest.priceBegunBanner}>
                    💸 Giá khởi điểm:
                    <span className="text-success"> {props.list.Gia} VNĐ</span>
                </span>
                <span className={Interest.priceJumpBanner}>
                    💰 Bước giá:
                    <span className="text-success"> {props.list.BuocGia} VNĐ</span>
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
    const Title = styled.h3`
    
    padding-top: 6.125rem;
    padding-bottom: 1.875rem;
    font-weight: 600;
    font-size: 25px;
    text-align: center;
    text-transform: uppercase;
`;


const Main = styled.div`
    flex: 1;
    height: 100%;
    margin-top: 3.75rem;
`;

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


const EmptyCart = styled.img`
    margin-bottom: 0.625rem;
    width: 25rem;
    height: 11.25rem;
`;



const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 1.25rem;
`;

const ShopButton = styled.button`
    margin-top: 0.3125rem;
`;

const TopButton = styled.button`
    text-transform: uppercase;
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