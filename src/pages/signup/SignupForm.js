import React, { useContext, useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Notification,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from  '../../context/AuthContext'
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../../firebase'


export function SignUpForm() {
  const [error, setError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
 
  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext)


  const createUserCollection = async (user)=>{
    await setDoc(doc(db, "users", user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: "",
    });
    
    
    
    navigate("/Dashboard")
  }


  const handleSignUp =(e)=> {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      
      const user = userCredential.user;
      dispatch({type:"LOGIN", payload:user})
      createUserCollection(user)
    
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errore: ", errorMessage)
      
    });
  }
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Link to="/login">Sign In</Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <TextInput type="text" label="First Name" placeholder="Happy" required onChange={(e)=>{setFirstName(e.target.value)}} />
      <TextInput type="text" label="Last Name" placeholder="Joe" required mt="md" onChange={(e)=>{setLastName(e.target.value)}} />
        <TextInput type="email" label="Email" placeholder="happyjoe@sample.com" required mt="md" onChange={(e)=>{setEmail(e.target.value)}} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(e)=>{setPassword(e.target.value)}}/>
        <PasswordInput label="Confirm Password" placeholder="Rewrite Your password" required mt="md" onChange={(e)=>{e.target.value===password ? setError(false): setError(true)}}/>
        {error &&  <Notification  mt="md" color="red" onClose={()=>{setError(false)}} >
             Password doesnot match!
          </Notification>
        }
        <Group position="left" mt="md">
          <Checkbox label="Accept Agreement" onChange={()=>{setAgreement(!agreement)}}/>
        </Group>
        <Button fullWidth mt="xl" disabled={agreement ? false: true} onClick={handleSignUp}>
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
}

export default SignUpForm;