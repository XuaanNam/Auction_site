import React from 'react';
import '../assets/Footer.css';
//import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h3 className="title-footer">Thông tin</h3>
            <Link to='/'>Về chúng tôi</Link>
            <Link to='/'>Thông tin công ty</Link>
            <Link to='/'>Chính sách bảo mật</Link>
            <Link to='/'>Điều khoản sử dụng</Link>
            
          </div>
          <div className='footer-link-items'>
            <h3 className="title-footer">Phương tiện</h3>
            <Link to='/'>Twitter</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Instagram</Link>
          </div>
          <div className='footer-link-items'>
            <h3 className="title-footer">Liên hệ</h3>
            <Link to='/'>Liên hệ</Link>
            <Link to='/'>Trợ giúp</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
       
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='' style={{color: 'white', fontSize: '16px'}}>
            Có câu hỏi? Chúng tôi muốn nghe từ bạn! <br/>
            Email cho chúng tôi: greypanther@gmail.com
          </div>
          <div className='social-icons'>
            <Link className='social-icon-link facebook' to='/'>
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram' 
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
          <small className='website-rights'>© Copyright 2021 GreyPanther </small>
          
        </div>
      </section>
    </div>
  );
}

export default Footer;