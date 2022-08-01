import { 
    Affix, 
    Avatar, 
    Button,  
    Modal, 
    useMantineTheme, 
    Group, 
    TextInput,
    NumberInput, 
    Select,  
    MultiSelect, 
    Container,
    Space, 
    Text,
} from '@mantine/core';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import { doc, getDoc, updateDoc  } from "firebase/firestore";
import {db} from '../../../firebase';

  function Personal(){
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
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

    
    const [firstName, setFirstName] = useState(userData.firstName)
    const [lastName, setLastName] = useState(userData.lastName)
    const [email, setEmail] = useState(userData.email)
    const [phone, setPhone] = useState(userData.phone)
    const [photo, setPhoto] = useState('')


    const handleUpdateInfo= async(e)=>{

        e.preventDefault();
        const docRef = doc(db, "users", currentUser.uid);
        await updateDoc(docRef, {
            firstName,
            lastName,
            email,
            phone,
            photo,
        })
        setOpened(false)

    }

    return(
        <>
       <Modal
        size="md"
        opened={opened}
        onClose={() => setOpened(false)}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        
        title="Update your personal Info."
      >
        <form onSubmit={handleUpdateInfo} >
            <Group >
               
                <TextInput
                style={{width:'190px'}}
                my="xs"
                label="First Name"
                placeholder={userData.firstName}
                onChange={(e)=>{setFirstName(e.target.value)}}
                />
                <TextInput
                style={{width:'190px'}}
                my="xs"
                label="Last Name"
                placeholder={userData.lastName}
                onChange={(e)=>{setLastName(e.target.value)}}
                />
            </Group>
           
            <TextInput
                
                my="xs"
                label="Phone Number"
                placeholder={userData.phone}
                onChange={(e)=>{setPhone(e.target.value)}}
                
            />
            <TextInput
                
                my="xs"
                label="Photo URL "
                placeholder="Paste URL of your photo"
                onChange={(e)=>{setPhoto(e.target.value)}}
                
            />
             <TextInput
                
                my="xs"
                label="Email "
                disabled
                placeholder={userData.email}
                onChange={(e)=>{setEmail(e.target.value)}}
                
            />
          
            
            
            
            <Group position='right'>
                <Button my="sm" variant="outline" onClick={() => setOpened(false) } >Cancel </Button>
                <Button my="sm" type="submit" >Update </Button>
            </Group>

        </form>
        
  
  
  
      </Modal>

        <Container>
            <Space h="xl"/>
            <Text>First Name:  {userData.firstName} </Text>
            <Space h="xl"/>   
            <Text>Last Name:  {userData.lastName} </Text>
            <Space h="xl"/>
            <Text>Email: {userData.email}</Text>
            <Space h="xl"/>
            { phone && <Text>Phone Number: {userData.phone}</Text>}
            <Space h="xl"/>
            <Space h="xl"/>
            <Button onClick={() => setOpened(true) }>Edit</Button>
        </Container>
        
        
        </>

      )

  }

  export default Personal;