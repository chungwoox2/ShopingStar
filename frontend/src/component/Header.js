

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div>
      <ul className='header-userbox'>
      <div className="header-login">
        로그인
      </div>
        <Link to="/signup" style={{ textDecoration: 'none' }}>회원가입</Link>

        <div>
        <Link to="/mypage">
          <button className="header-mypage">
            <FontAwesomeIcon icon={faUser} />
            마이페이지
          </button>
        </Link>
        </div>

        <Link to="/cart">
          <button className="header-shopping-basket">
            <FontAwesomeIcon icon={faShoppingCart} />
            장바구니
          </button>
        </Link>
      </ul>
    

    <div className="header-container">
      <div className="header-container2">
        <span>
          <img src="/images/logo_text4.png" alt="" className="header-logo-image" />
        </span>

        <div className="header-border">
          <input
            type="text"
            className="header-search-input"
            placeholder="찾고 싶은 상품을 검색해보세요!"
          />
          <button className="header-search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      </div>
    </div>
  );
};

export default Header;
