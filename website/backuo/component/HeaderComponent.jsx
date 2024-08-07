import React from 'react';
import { Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './App.css'; // Burada CSS dosyanızdan bahsediyoruz.

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="menu">
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
        <Menu.Item key="3">Contact</Menu.Item>
      </Menu>
      <MenuOutlined className="mobile-menu-icon" />
    </Header>
  );
};

export default HeaderComponent;
