import {Cancel,BorderHorizontal, GpsFixed,
     } from '@material-ui/icons';
import React, {  useState } from 'react'
import styled from 'styled-components';
import Interest from '../../assets/Interested.module.css'

//
import axios from "../../../api/axios"; 

function ProductLoved (props) {
    const [idQT] = useState(props.list.idQT);

    const handleDeleteLoved = () => { console.log(idQT)
        axios.post("delete/my/loved", {idQT: idQT })
            .then((res) =>{ 
                window.location.reload(false);
            })
    }

    return(
        <Having>
            <Image src={props.list.HinhAnh} />
            <ProductDetail>
                <span className={Interest.positionBanner}>
                    <GpsFixed className="mr-1"/>
                    Website: 
                    <span className="text-warning">{props.list.Website}</span>
                </span>

                <span className={Interest.positionBanner}>
                    <GpsFixed className="mr-1"/>
                    Vị trí: 
                    <span className="text-warning">{props.list.ViTri}</span>
                </span>

                <span className={Interest.sizeBanner}>
                    <BorderHorizontal className="mr-1"/>
                    Kích thước:
                    <span className="text-warning">{props.list.KichThuoc}</span>
                </span>

                <span className={Interest.timeBegunBanner}>
                    ⏱ Thời gian:
                    <span className="text-warning">{props.list.TgBatDau}</span>
                    
                </span>

                <span className={Interest.timeBegunBanner}>
                    ⏱ Thời gian Đấu giá:
                    <span className="text-warning">{props.list.tgDauGia}</span>
                    
                </span>

                <span className={Interest.priceBegunBanner}>
                    💸 Giá khởi điểm:
                    <span className="text-warning">{props.list.Gia}</span>
                </span>
                <span className={Interest.priceBegunBanner}>
                    💸 Bước giá:
                    <span className="text-warning">{props.list.BuocGia}</span>
                </span>

                <button onClick={handleDeleteLoved} class={`btn btn-dark ${Interest.btnRemoveIn}`}>
                    XOÁ KHỎI YÊU THÍCH 
                    <Cancel className="ml-1"/>
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
    padding: 1.25rem 1.25rem 5rem 1.25rem;
    height: 100%;
    margin-bottom: 4.125rem;
    margin-right: 1.25rem;
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
    
    width: 75%;
    height: 16rem;
    border-radius: 5px;
    //border: 1px solid rgba(0, 0, 0, 0.3);
   
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;



export default ProductLoved