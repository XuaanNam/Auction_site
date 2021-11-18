import {useState, useEffect} from "react";
import axios from "../../api/axios"; 
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get("isAuth")
            .then((Response) => {
            if(Response.data.isAuth) {            
                navigate('/home');    
            }
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <h1>this is home page</h1>
    )
}
