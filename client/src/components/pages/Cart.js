import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import CartD from '../assets/CartDetail.module.css'
import banner1 from "../images/img-1.png";
import logo from "../images/img-login.png"
//
import axios from "../../api/axios"; 
import { useNavigate } from 'react-router-dom';

const KEY = process.env.REACT_APP_STRIPE;



const Cart = () => {

    let navigate = useNavigate();
    let isAuth = 0;
    useEffect(()=>{
        axios.get("isAuth",)
            .then((Response) => {
            if(Response.data.isAuth){
                isAuth = 1;
            }
            })
            .catch(error => { console.log(error);})
            .then(function () {
            if(isAuth !== 1){
                navigate('/')
            }       
            });
    }, []);

    return (
        <Container>
            <Header isActive={true} />
            <Main className="container">
                <Wrapper>
                    <Title>Giỏ hàng</Title>
                    {/* KHI GIỎ HÀNG TRỐNG */}
                    <Empty>
                        <EmptyCart src={logo} />
                        <TopText className={`text-decoration-none alert-danger ${CartD.cartAlert}`}>Số lượng trong giỏ hàng: 0</TopText>
                        <h4 className={CartD.cartNullTitle}>Bạn hiện không có sản phẩm nào trong giỏ hàng</h4>
                        <Link to="/">
                            <ShopButton className={`btn btn-dark btn-custom ${CartD.btnNullTitle}`}>Đi đến đấu giá!</ShopButton>
                        </Link>
                    </Empty>
                    {/*  */}
                    {/* TOP */}
                    <Top>
                        <Title>Đấu giá của tôi</Title><br></br>
                        <TopTexts >


                        </TopTexts>
                    </Top>
                    {/* BOTTOM */}
                    <Bottom>
                        {/* Thông tin về sản phẩm đấu giá được */}
                        <Info>
                            <>
                                <Hr />
                                <ContainerBody>
                                    <Product>
                                        {/* Ảnh Banner */}
                                        <ProductDetail>
                                            <Image src={banner1} />
                                            <span></span> 
                                        </ProductDetail>
                                    </Product>
                                    <ProductDetail>
                                        <span className={CartD.detailBannerPosition}>Vị trí: </span>
                                        <span className={CartD.detailBannerSize}>Kích thước:</span>
                                        <span className={CartD.detailBannerPrice}>Giá:</span>
                                    </ProductDetail>
                                    <ShopButton className={`btn btn-dark btn-custom ${CartD.btnRemoveItem}`}>Xoá</ShopButton>
                                </ContainerBody>
                                <Hr /> 
                                {/* Nếu nhiều Items thì được ngăn cách    */}
                            </>
                        </Info>
                        {/* TỔNG TIỀN */}
                        <Summary>
                            <SummaryTitle>Thành tiền</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Tổng phụ:</SummaryItemText>
                                <SummaryItemPrice>$ 99</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Phụ phí:</SummaryItemText>
                                <SummaryItemPrice>$ 0</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Tổng cộng:</SummaryItemText>
                                <SummaryItemPrice>$ 99</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                {/* Thêm checkout ngay đây */}
                                <Button className={`btn ${CartD.btnCheckout}`}>
                                    Thanh toán ngay
                                </Button>
                            </SummaryItem>
                        </Summary>
                    </Bottom>
                </Wrapper>
            </Main>
            <Footer></Footer>
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`;

const ContainerBody = styled.div`
    position: relative;
    border: 2px solid #343a40;
    border-radius: 10px;
    margin-left: -65px;
    padding: 20px;
    height: 60vh;
    margin-bottom: 50px;
    margin-right: 20px;
`;

const Main = styled.div`
    flex: 1;
    margin-top: 60px;
`;
const Wrapper = styled.div`
    padding: 20px;
`;
const Title = styled.h3`
    padding-top: 25px;
    padding-bottom: 10px;
    font-weight: 600;
    font-size: 25px;
    text-align: center;
    text-transform: uppercase;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;
const TopButton = styled.button`
    text-transform: uppercase;
`;
const TopTexts = styled.div`
    text-decoration: none !important;
   
`;
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 20px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
   
`;
const Info = styled.div`
    flex: 3;
`;
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 5px !important;
    
`;
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;
const Image = styled.img`
    
    width: 100%;
    height: 250px;
    border-radius: 5px;
    //border: 1px solid rgba(0, 0, 0, 0.3);
   
`;
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
`;
const ProductName = styled.span`
    margin-bottom: 20px;
`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 20px;
`;
const ProductAmount = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;
    font-size: 20px;
    border: 1px solid rgba(0, 0, 0, 0.3);
`;
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`;
const Hr = styled.hr`
    background-color: #000;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-left: 20px;
    padding: 20px;
    height: 50vh;
    margin-bottom: 50px;
`;
const SummaryTitle = styled.h1`
    font-weight: 600;
    font-size: 30px;
    text-align: center;
`;
const SummaryItem = styled.div`
    margin: 35px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "20px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
    width: 100%;
`;
const Empty = styled.div`
    height: 65vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`;
const EmptyCart = styled.img`
    margin-bottom: 10px;
    width: 400px;
    height: 180px;
`;
const ShopButton = styled.button`
    margin-top: 5px;
`;

export default Cart