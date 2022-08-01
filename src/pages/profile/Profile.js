import {
    Container,
    Paper,
    Grid,
    Stack,
    Avatar,
    Title,
    Text,
    Tabs,
  } from '@mantine/core';
import React, {useContext, useEffect, useState}  from 'react';
import { Photo, MessageCircle, Settings } from 'tabler-icons-react';
import Personal from './components/Personal';
import Notification from './components/Notifications';
import Setting from './components/Setting';
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import {db} from '../../firebase';

function Profile(){
    const [userData, setUserData] = useState({});

    const {currentUser} = useContext(AuthContext);
   
    const getUserData = async() => {
       
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data())
        
    }
        
    useEffect(()=>{
        return()   => {
            getUserData()
        }
    },[])
    
    return(
        <Container fluid={true}  mx="xs" mt="md">
            <Paper shadow="sm" style={{height:"530px"}} p="md" radius="md">
                <Grid>
                    <Grid.Col span={4}>
                        <Stack align="center" justify="center">
                            <Avatar size="xl" radius="xl"/>
                            <Title order={4}>{userData.firstName} {userData.lastName}</Title>
                            <Text>{userData.email}</Text>
                            
                        </Stack>
                    </Grid.Col>
                    
                    <Grid.Col span={8} >
                        <Tabs  >
                            <Tabs.Tab label="Personal" icon={<Photo size={14} />}><Personal/></Tabs.Tab>
                            {/* <Tabs.Tab label="Notifications" icon={<MessageCircle size={14} />}><Notification/></Tabs.Tab> */}
                            <Tabs.Tab label="Settings" icon={<Settings size={14} />}><Setting/></Tabs.Tab>
                        </Tabs> 
                    </Grid.Col>
                </Grid>
            </Paper>
        </Container>
    )
  }

  export default Profile;