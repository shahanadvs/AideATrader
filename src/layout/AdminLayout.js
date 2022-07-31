import React, { useState, useContext, useEffect } from 'react';
import { Outlet, NavLink } from "react-router-dom";
import 'antd/dist/antd.css';
import './AdminLayout.css';
import MenuDrop from './components/Menu';
import logo from './123.png'
import logo2 from './1234.png'

import { LayoutDashboard,  ReportAnalytics, User, Article, Notification } from 'tabler-icons-react';

import { Paper, Group, Container, Space, Image} from '@mantine/core';
import { Layout, Menu } from 'antd';
import Dashboard from '../pages/dashboard/Dashboard'
import Trade from '../pages/trade/Trade';
import Profile from '../pages/profile/Profile';
import Analysis from '../pages/analysis/Analysis';

import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, updateDoc  } from "firebase/firestore";
import {db} from '../firebase';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<NavLink to="/dashboard">Dashboard</NavLink>, '1', <LayoutDashboard
  size={20}
  strokeWidth={2}
  
/>),
  getItem(<NavLink to="/trade">Trades</NavLink>, '2', <Article
  size={20}
  strokeWidth={2}
  
/>),
  getItem(<NavLink to="/analysis">Analysis</NavLink>, '3', <ReportAnalytics
  size={20}
  strokeWidth={2}
  
/>),
  getItem(<NavLink to="/profile">Profile</NavLink>, '4', <User
  size={20}
  strokeWidth={2}
  
/>),
];

const AdminLayout = () => {
  const [userData, setUserData] = useState({});
    const {currentUser} = useContext(AuthContext);
   
    const getUserData = async() => {
       
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data())
        
    }
        
    useEffect(()=>{
        getUserData()
    },[])
  const [collapsed, setCollapsed] = useState(false);


  return (
    <Layout
      style={{
        minHeight: '100vh',
      }} 
    >
      <Sider theme ="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" ><Space h="lg"/><Image width={collapsed === true ? 50 : 150} src={collapsed === true ? logo : logo2} alt="logo"  /> </div>
        <Space h="xl"/>
        <Space h="xl"/>
        
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        
        <Paper p="md" shadow="sm" radius="md" mt="lg" mx="xl">
          <Group position="right" spacing="xs">
          <Notification size={24} />
         
          
          <MenuDrop {...userData}/>
          

          </Group>
        </Paper>

        <Content>
          
           <Outlet />
         
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Aide A Trader © 2022 
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;