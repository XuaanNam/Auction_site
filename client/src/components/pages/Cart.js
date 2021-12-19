/* eslint-disable jsx-a11y/anchor-is-valid */
import {Gavel} from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from '../layout/Footer';
import CartD from '../assets/CartDetail.module.css'
import logo from "../images/auc-img2.png"
import Bill from './Cart/Bill'
import MessageToast from '../pages/ToastMessage/MessageToast' 
//
import axios from "../../api/axios"; 
import { useNavigate } from 'react-router-dom';

function Cart() {

    const [toasts, setToasts] = useState([]);
    const [remove, setRemove] = useState(null);

    const [isEmpty, setIsEmpty] = useState(true);
    const [listProduct, setListProduct] = useState([]);
    const [bill, setBill] = useState('');
    const [tiGia, setTiGia] = useState('');

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
                            if(res.data.results.length > 0){ 
                                setListProduct(res.data.results);  
                                setIsEmpty(false);
                                setToastMessage("success","Thành công", res.data.message);
                            }
                        })
                    
                    axios.get("get/currency")
                        .then((res) => {
                            setTiGia((parseInt(res.data.rates.VND)/parseInt(res.data.rates.USD)).toString());
                        })
                }
            })
            .catch(error => { console.log(error);})
            .then(function () {
                if(isAuth !== 1){
                    navigate('/')
                } 
                axios.get("my/bill")
                    .then((res) =>{ 
                        if(res.data.length > 0 ){                             
                            setBill(convertPrice(res.data[0].sumGT));
                        }
                    })      
            });
    }, []);


    const convertPrice = (price) => { 
        const formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0
        })
          
        return formatter.format(price);
    }
    
    const parseInterger = (intCurrency) => {
        return parseInt(intCurrency.split(',')[0] + intCurrency.split(',')[1] + intCurrency.split(',')[2] + intCurrency.split(',')[3])
    }

    const paymentByPaypal = () => {
        setToastMessage("success","Thành công", "Vui lòng đợi vài giây để thanh toán!");

        const totalUSD = parseInterger(bill) / parseInt(tiGia)
        let listWebsite = '';
        const number = listProduct.length;
        let i = 0;
        for(i; i < listProduct.length;i++){
            listWebsite += listProduct[i].Website + ' + ';
        }
        axios.post("payment/paypal", {
            totalUSD, listWebsite, number
        })
            .then((res) =>{ 
                if(res.data.payment_link){ 
                    //window.open(res.data.payment_link);
                    window.location = res.data.payment_link;
                }
                if(res.data.message){ 
                    setToastMessage("warning","Thất bại", res.data.message);
                }
            })
    }

    const billUSD = (bill) => {

        return (convertPrice(parseInterger(bill) / parseInt(tiGia)));
    }

    const onDelete = (idGD) => {
        const listP = listProduct.filter(list => list.idGD !== idGD); 
        setListProduct(listP); 
        if(listP.length === 0){
            setIsEmpty(true)
        }
    }
    function setToastMessage(status, title, message) {
        setToasts(prevToast => [
            ...prevToast,
            {
                id: new Date().getTime(),
                status,
                title,
                message
            }
        ]); 
    }

    //close
    function handleCloseToast(toast) {
        setToasts(prevToast => prevToast.filter(item => item.id !== toast.id));
    };

    useEffect(() =>{
        if (remove) {
            setToasts(prevToast => prevToast.filter(toast => toast.id !== remove));
        }
    }, [remove]);

    useEffect(() =>{
        if (toasts.length) {
            setTimeout(() => setRemove(toasts[toasts.length - 1].id), 2000);
        }
    }, [toasts]);

    return (
        <Container>
            <Header isActive={true} />
            <Main className="container">
                <Wrapper>
                    
                    {isEmpty ? 
                        <Empty>
                            <Title>Đơn hàng 🛒</Title>
                            <EmptyCart src={logo} />
                            <h4 className={CartD.cartNullTitle}>Bạn hiện không có sản phẩm nào trong đơn hàng 🔄</h4>
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
                                <Title>Đơn hàng 🛒</Title><br></br>
                                <TopTexts >
                              
                                </TopTexts>
                            </Top>
                    
                            <Bottom>
                                <Info>
                                    <>
                                        {listProduct.map(list=>(
                                            <Bill  key={list.idGD}
                                                list={list}
                                                convertPrice ={convertPrice}
                                                setToastMessage={setToastMessage}
                                                onDelete={onDelete}
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
                                        <SummaryItemText><b>Quy đổi:</b></SummaryItemText>
                                        <SummaryItemPrice><b>{(billUSD(bill) + ' USD')}</b></SummaryItemPrice>
                                    </SummaryItem>

                                    <SummaryItem>
                                        <table border='0' cellPadding='0' cellSpacing='0' align='center'>
                                            <tbody>
                                                <tr>
                                                    <td align='center'>
                                                        <a style={{cursor: "pointer"}} onClick={paymentByPaypal}>
                                                            <img src='https://www.paypalobjects.com/webstatic/en_US/i/buttons/buy-logo-large.png' alt ="Thanh toán bằng PayPal"/>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </SummaryItem>
                                </Summary>
                            </Bottom>
                        </span>
                    
                    }
                </Wrapper>
            </Main>
            <MessageToast 
                toasts={toasts}
                setToasts={setToasts}
                handleCloseToast={handleCloseToast}/>

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

const TopTexts = styled.div`
    text-decoration: none !important;
   
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10rem;
    
`;
const Info = styled.div`
    flex: 2;
    height: 100%
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
;
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