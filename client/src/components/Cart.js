import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import logo from "../images/img-login.jpg";
const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`;
const Main = styled.div`
    flex: 1;
    margin-top: 60px;
`;
const Wrapper = styled.div`
    padding: 20px;
`;
const Title = styled.h3`
    font-weight: 400;
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
    
`;
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;
const Image = styled.img`
    width: 200px;
    height: 250px;
   
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
    padding: 20px;
    height: 50vh;
`;
const SummaryTitle = styled.h1`
    font-weight: 200;
    font-size: 30px;
    text-align: center;
`;
const SummaryItem = styled.div`
    margin: 24px 0;
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
    height: 30vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`;
const EmptyCart = styled.img`
    width: 175px;
    height: 180px;
`;
const ShopButton = styled.button`
    margin-top: 5px;
`;

const Cart = () => {


    return (
        <Container>
            <Header></Header>
            <Main className="container">
                <Wrapper>
                    <Title>Auction Cart</Title>
                    <Empty>
                        <EmptyCart src={logo} />
                        <h4>Giỏ hàng hiện tại đang trống!</h4>
                        <Link to="/">
                            <ShopButton className="btn btn-dark btn-custom">Đấu giá ngay!</ShopButton>
                        </Link>
                    </Empty>
                    <Top>
                        <Link to="/">
                            <TopButton className="btn btn-outline-dark btn-custom">Tiếp tục đấu giá</TopButton>
                        </Link>
                        <TopTexts >
                            <TopText className="text-decoration-none alert-danger">Số lượng trong giỏ hàng(SL)</TopText>
                            <TopText className="text-decoration-none alert-warning">Bạn đã thắng(0)</TopText>
                        </TopTexts>
                    </Top>
                    <Bottom>
                        {/* Thông tin về sản phẩm đấu giá được */}
                        <Info>
                            <>
                                <Hr />
                                <Product>
                                    <ProductDetail>
                                        <Image src="" />
                                        <Details>
                                            <ProductName><b>Banner: </b>Title</ProductName>
                                            <Button value="" className="btn btn-dark btn-custom btn-remove">Xoá</Button>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <a className="amount-custom btn-custom">
                                                xoá
                                            </a>
                                            <ProductAmount>1</ProductAmount>
                                            <a className="amount-custom btn-custom">
                                                thêm
                                            </a>
                                        </ProductAmountContainer>
                                        <ProductPrice>Tổng tiền:  $ 49.5</ProductPrice>
                                    </PriceDetail>
                                </Product>
                                <Hr />
                                <Product>
                                    <ProductDetail>
                                        <Image src="" />
                                        <Details>
                                            <ProductName><b>Banner: </b>Title</ProductName>
                                            <Button value="" className="btn btn-dark btn-custom btn-remove">Xoá</Button>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <a className="amount-custom btn-custom">
                                                xoá
                                            </a>
                                            <ProductAmount>1</ProductAmount>
                                            <a className="amount-custom btn-custom">
                                                thêm
                                            </a>
                                        </ProductAmountContainer>
                                        <ProductPrice>Tổng tiền: $ 49.5</ProductPrice>
                                    </PriceDetail>
                                </Product>
                                
                                
                            </>
                        </Info>
                        
                        <Summary>
                            <SummaryTitle>Tóm tắt đơn hàng</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Tổng phụ</SummaryItemText>
                                <SummaryItemPrice>$ 99</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Phụ phí + Thuế</SummaryItemText>
                                <SummaryItemPrice>$ 0</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Tổng cộng</SummaryItemText>
                                <SummaryItemPrice>$ 99</SummaryItemPrice>
                            </SummaryItem>
                        </Summary>
                    </Bottom>
                </Wrapper>
            </Main>
            <Footer></Footer>
        </Container>
    )
}

export default Cart