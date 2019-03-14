import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const HeaderMenu = () => (
    <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['home']}
        style={{ lineHeight: '64px' }}>
        <Menu.Item key="home"><Link to="/">MakerPlans</Link></Menu.Item>
        <Menu.Item key="categories"><Link to="/categories">Categories</Link></Menu.Item>
        <Menu.Item key="articles"><Link to="/articles">Articles</Link></Menu.Item>
    </Menu>
);

export default HeaderMenu;
