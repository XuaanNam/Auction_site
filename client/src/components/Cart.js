//import { Add, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Footer from './Footer'
import Header from './Header'
import '../App.css';
import {Card,Row,Col,Button as bt, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    // const cart = useSelector(state => state.cart);
    // const [stripeToken, setStripeToken] = useState(null);
    // const history = useHistory();

    // const onToken = (token) => {
    //     setStripeToken(token);
    // }
    // useEffect(() => {
    //     const makeRequest = async () => {
    //         try {
    //             const res = await userRequest.post("/checkout/payment", {
    //                 tokenId: stripeToken.id,
    //                 amount: cart.total * 100
    //             });
    //             history.push("/success", { data: res.data });
    //         } catch (err) {

    //         }
    //     };
    //     stripeToken && makeRequest();
    // }, [stripeToken, cart.total, history]);

    // const dispatch = useDispatch();

    // const handleRemove = (product) => {
    //     dispatch(
    //         removeProduct(product)
    //     );
    // }
    // const handleDecrease = (product) => {
    //     dispatch(
    //         decreaseProduct(product)
    //     );
    // }
    // const handleIncrease = (product) => {
    //     dispatch(
    //         increaseProduct(product)
    //     );
    // }

    return (
        <div>
            <Header/>
            <Main className="container">
                
                    <Title>Auction Cart</Title>
                    <Empty>
                        <EmptyCart src="./shopping-cart.png" />
                        <h4>Your cart is currently empty!</h4>
                        <Link to="/">
                            <ShopButton className="btn btn-dark btn-custom">SHOP NOW</ShopButton>
                        </Link>
                    </Empty>
                    <Top>
                        <Link to="/">
                            <TopButton className="btn btn-outline-dark btn-custom">Continue Shopping</TopButton>
                        </Link>
                        <TopTexts>
                            <TopText>Auction Cart</TopText>
                            <TopText>Auction win(0)</TopText>
                        </TopTexts>

                        <TopButton className="btn btn-dark btn-custom">Checkout Now</TopButton>
                    </Top>
                    
                        
                        <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemPrice>$ 0</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Estimated Shipping</SummaryItemText>
                                <SummaryItemPrice>$ 0</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Shipping Discount</SummaryItemText>
                                <SummaryItemPrice>$ 0</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>$     0</SummaryItemPrice>
                            </SummaryItem>
                            
                                <Button className="btn btn-dark btn-custom">Checkout Now</Button>
                        </Summary>    
            </Main>
            <Footer/>
        </div>
        
    )
}

export default Cart