import {CheckCircle, Close, Error, ListAlt} from '@material-ui/icons';
import Coming from '../../assets/isComing.module.css'
import React, { Component} from 'react';

function MessageToast({toasts, handleCloseToast}) {

    const status = toasts.status === "success" ? "Coming.toast__success" : "Coming.toast__error";
  

    return (
        <div className={Coming.toast__container}>
            {
                toasts.map((toast) => (
                    <div key={toast.id} className={`${Coming.toast_top} ${Coming[`toast__${toast.status}`]}`}>
                        <div className={Coming.toast__icon}>
                            {/* icon */}
                            {/* Truyền icon CheckCircle hoặc Error */}
                            {/* { toast.status === "success"? <CheckCircle /> : <Error />} */}
                            {toast.status === "success"? <CheckCircle/> : (toast.status === "info"? <ListAlt/> : <Error/>)}
                        
                        </div>
                        <div className={Coming.toast__body}>
                            {/* Truyền props title */}
                            <h3 className={Coming.toast_title}>{toast.title}</h3>
                            {/* Truyền message */}
                            <p className={Coming.toast__msg}>{toast.message}</p>
                        </div>
                        <div className={Coming.toast__close} 
                            onClick={() => {handleCloseToast(toast); }}>
                            <Close/>
                        </div>
                    </div>
                ))
            }
        </div>
    );
    
}

export default MessageToast;