import {Gavel,Cancel,BorderHorizontal, GpsFixed,
    Timer, CheckCircleOutline,VerifiedUserOutlined} from '@material-ui/icons';
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



function Cart() {

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
                    
                    {/* KHI GIỎ HÀNG TRỐNG */}
                    <Empty>
                    <Title>Giỏ hàng ️🛒</Title>
                        <EmptyCart src={logo} />
                        <TopText className={`text-decoration-none alert-danger ${CartD.cartAlert}`}>Số lượng trong giỏ hàng: 0</TopText>
                        <h4 className={CartD.cartNullTitle}>Bạn hiện không có sản phẩm nào trong giỏ hàng 🔄</h4>
                        <Link to="/">
                            <ShopButton className={`btn btn-dark btn-custom ${CartD.btnNullTitle}`}>
                               <Gavel className="mr-1"/>
                                Đi đến đấu giá!
                                </ShopButton>
                        </Link>
                    </Empty>


                    {/* Khi có sản phẩm */}
                    {/*  */}
                    {/* TOP */}
                    <Top>
                        <Title>Đấu giá của tôi ️️🏆</Title><br></br>
                        <TopTexts >
                        {/* DESCRIPTION cho trang này nếu có */}
                        </TopTexts>
                    </Top>
                    {/* BOTTOM */}
                    <Bottom>
                        {/* Thông tin về sản phẩm đấu giá được */}
                        <Info>
                            <>
                                {/* item bắt đầu */}
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
                                        <span className={CartD.detailBannerPosition}>
                                            <GpsFixed/>
                                             Vị trí: <span className="text-danger">TOP BANNER</span>
                                            </span>

                                        <span className={CartD.detailBannerSize}>
                                            <BorderHorizontal className="mr-1"/>
                                             Kích thước: <span className="text-danger">1200 x 300</span>
                                            </span>

                                        <span className={CartD.detailBannerPrice}>
                                            💸 Giá: <span className="text-danger">15.000.000 VND</span>
                                            </span>

                                    </ProductDetail>
                                    <ShopButton className={`btn btn-dark btn-custom ${CartD.btnRemoveItem}`}>
                                        <Cancel className="mr-2"/>
                                        Xoá
                                        </ShopButton>
                                </ContainerBody>

                                {/* Nếu nhiều Items thì được ngăn cách    */}

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
                                        <span className={CartD.detailBannerPosition}>
                                            <GpsFixed/>
                                             Vị trí: <span className="text-danger">TOP BANNER</span>
                                            </span>

                                        <span className={CartD.detailBannerSize}>
                                            <BorderHorizontal className="mr-1"/>
                                             Kích thước: <span className="text-danger">1200 x 300</span>
                                            </span>

                                        <span className={CartD.detailBannerPrice}>
                                            💸 Giá: <span className="text-danger">15.000.000 VND</span>
                                            </span>

                                    </ProductDetail>
                                    <ShopButton className={`btn btn-dark btn-custom ${CartD.btnRemoveItem}`}>
                                        <Cancel className="mr-2"/>
                                        Xoá
                                        </ShopButton>
                                </ContainerBody>

                                {/* test */}

                                

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
                                    <VerifiedUserOutlined class={CartD.iconCheckout}/>
                                    Thanh toán ngay 💳
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
    border-radius: 0.625rem;
    margin-left: -4.125rem;
    padding: 1,25rem;
    height: 30rem;
    margin-bottom: 3.125rem;
    margin-right: 1.25rem;
`;

const Main = styled.div`
    flex: 1;
    margin-top: 3.75rem;
`;
const Wrapper = styled.div`
    padding: 3.25rem;
`;
const Title = styled.h3`
    padding-top: 2rem;
    padding-bottom: 1.625rem;
    font-weight: 600;
    font-size: 1.5625rem;
    text-align: center;
    text-transform: uppercase;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem;
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
    margin: 0 1.25rem;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10rem;
   
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
    height: 15.625rem;
    border-radius: 5px;
    //border: 1px solid rgba(0, 0, 0, 0.3);
   
`;
const Details = styled.div`
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
`;
const ProductName = styled.span`
    margin-bottom: 1.25rem;
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
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
`;
const ProductAmount = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.1875rem;
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
    margin-left: 1.25rem;
    padding: 1.25rem;
    height: 100%;
    margin-bottom: 3.125rem;
`;
const SummaryTitle = styled.h1`
    font-weight: 600;
    font-size: 30px;
    text-align: center;
`;
const SummaryItem = styled.div`
    margin: 2.1875rem 0;
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
    height: 100%;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`;
const EmptyCart = styled.img`
    margin-bottom: 0.625rem;
    width: 25rem;
    height: 11.25rem;
`;
const ShopButton = styled.button`
    margin-top: 0.3125rem;
`;

export default Cart