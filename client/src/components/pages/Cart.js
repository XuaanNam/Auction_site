import {Gavel,Cancel,BorderHorizontal, GpsFixed,
   VerifiedUserOutlined, Language} from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import CartD from '../assets/CartDetail.module.css'
import logo from "../images/img-login.png"
import Bill from './Cart/Bill'
//
import axios from "../../api/axios"; 
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [isEmpty, setIsEmpty] = useState(true);
    const [listProduct, setListProduct] = useState([]);
    const [bill, setBill] = useState('');
    const [payment, setPayment] = useState(false);

    let navigate = useNavigate();
    let isAuth = 0;
    useEffect(()=>{
        axios.get("isAuth")
            .then((Response) => {
                if(Response.data.isAuth){
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    isAuth = 1;
                    axios.get("my/cart")
                        .then((res) =>{ 
                            if(res.data.length > 0 ){ 
                                setListProduct(res.data);  
                                setIsEmpty(false);
                            }
                        })
                    axios.get("my/bill")
                        .then((res) =>{ 
                            if(res.data.length > 0 ){ 
                                setBill(convertPrice(res.data[0].sumGT));
                            }
                        })
                }
            })
            .catch(error => { console.log(error);})
            .then(function () {
                if(isAuth !== 1){
                    navigate('/')
                }       
            });
    }, []);

    const handlePay = () => {
        setPayment(true);
    }

    const convertPrice = (price) => { 
        const formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0
        })
          
        return formatter.format(price);
    }
    const parseInterger = (intCurrency) => {
        return parseInt(intCurrency.split(',')[0] + intCurrency.split(',')[1] + intCurrency.split(',')[2] + intCurrency.split(',')[3])
    }
    const total = (totalBill, fee) => { 
        return convertPrice(parseInterger(totalBill) + parseInterger(fee)); 
    }

    return (
        <Container>
            <Header isActive={true} />
            <Main className="container">
                <Wrapper>
                    
                    {isEmpty ? 
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
                    :
                        <span>
                            <Top>
                                <Title>Đấu giá của tôi ️️🏆</Title><br></br>
                                <TopTexts >
                                {/* DESCRIPTION cho trang này nếu có */}
                                </TopTexts>
                            </Top>
                    
                            <Bottom>
                                <Info>
                                    <>
                                        {listProduct.map(list=>(
                                            <Bill  key={list.idGD}
                                                list={list}
                                            />
                                        ))}
                                    </>
                                </Info>
                             
                                {/* TỔNG TIỀN */}
                                <Summary>
                                    <SummaryTitle>Thành tiền</SummaryTitle>
                                    <SummaryItem>
                                        <SummaryItemText><b>Tổng tiền:</b></SummaryItemText>
                                        <SummaryItemPrice><b>{(bill + ' VND')}</b></SummaryItemPrice>
                                    </SummaryItem>

                                    <SummaryItem>
                                        {payment?
                                            <span>
                                                <Button className={`btn ${CartD.btnCheckout}`}>
                                                    
                                                    Paypal
                                                </Button> <br/>
                                                <Button className={`btn ${CartD.btnCheckout}`}>
                                                   
                                                    Credit Card
                                                </Button>
                                            </span>
                                        :    
                                            <Button onClick={handlePay} className={`btn ${CartD.btnCheckout}`}>
                                                <VerifiedUserOutlined class={CartD.iconCheckout}/>
                                                Thanh toán ngay 💳
                                            </Button>
                                        }
                                             
                                    
                                    </SummaryItem>
                                </Summary>
                            </Bottom>
                        </span>
                    
                    }
                </Wrapper>
            </Main>
            <Footer/>
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
    height: 39rem;
    margin-bottom: 3.125rem;
    margin-right: 1.25rem;
    box-shadow: 0 0 10px rgb(52, 58, 64);
    &:hover {
        box-shadow: 0 0 10px rgb(75, 178, 229);
    }
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
    flex: 2;
    height: 39rem;
`;
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 5px !important;
    
`;
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
    padding-top: 2.2rem;
`;
const Image = styled.img`
    
    width: 100%;
    height: 18.625rem;
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
    background-color: #5db1e4;
    border: none;
    height: 1px;
    margin-right: 5rem !important;
    margin-bottom: 2rem !important;
`;

const Summary = styled.div`
 
    flex: 1;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-left: 1.25rem;
    padding: 1.25rem;
    height: 100%;
    margin-bottom: 3.125rem;
    box-shadow: 0 0 10px rgb(52, 58, 64);
    &:hover {
        box-shadow: 0 0 10px rgb(62, 173, 142);
    }
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
    
`;

export default Cart