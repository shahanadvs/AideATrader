/** @format */

import { Menu, Text, Avatar, Group } from "@mantine/core";
import { User, Logout, ChevronDown } from "tabler-icons-react";
import React, {useContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth} from '../../firebase';
import {AuthContext} from  '../../context/AuthContext'

function MenuDrop({ firstName, lastName }) {

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext)

const signingOut = () => {
  signOut(auth).then(() => {
    dispatch({type:"LOGOUT"})
    navigate("/login")
  }).catch((error) => {
    console.log(error);
  })
}

  return (
    <Menu
      placement="end"
      control={
        <Group spacing={7}>
          <Avatar color="cyan" radius="xl"/>
          
         
          <Text weight={500}>
            {firstName} {lastName}
          </Text>
          <ChevronDown size={18} />
        </Group>
      }
    >
      <Menu.Item icon={<User size={16} />}>
        <NavLink to="/profile" style={{color:"#000"}}>Profile</NavLink>
      </Menu.Item>
      <Menu.Item icon={<Logout size={16} />} onClick={signingOut}>
        Sign Out
      </Menu.Item>
    </Menu>
  );
}

export default MenuDrop;
