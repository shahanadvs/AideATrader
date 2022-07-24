import {
    Container,
    Group,
    Space,
    Text,
    Button,
  } from '@mantine/core';
  import React from 'react';


  function Setting(){
    const currency = "₹";

    return(
        <>
        

        <Container>
            <Space h="xl"/>
            <Text>Currency:  {currency} </Text>
            <Space h="xl"/>
            <Button>Change Password</Button>
        </Container>
        
        
        </>

      )

  }

  export default Setting;