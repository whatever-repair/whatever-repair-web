import React from 'react';
import {Link} from 'react-router';
import styles from './Header.css';

const MenuItem = ({active, children, to}) => (
    <Link to={to} className={styles["menu-item"]}>
            {children}
    </Link>
)

const Header = () => {
    return (
        <div>
            <div className={styles.logo}></div>
            <div className={styles.menu}>
                <MenuItem to={'/repair'}>수리견적요청</MenuItem>
                <MenuItem to={'/admin'}>관리자 페이지</MenuItem>
            </div>
        </div>
    );
};

export default Header;
