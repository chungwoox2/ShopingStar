

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
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
  );
};

export default Header;
