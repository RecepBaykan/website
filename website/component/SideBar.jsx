import React from 'react'
import { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';


const items = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: 'Option 1',
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: 'Option 2',
    },
    {
      key: '3',
      icon: <ContainerOutlined />,
      label: 'Option 3',
    },
      
  ];


const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
    return (
      <div
        style={{ backgroundColor:'red',
          width: 256,
        }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
    );
  }

export default SideBar