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
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from  '../../context/AuthContext'

export function LoginForm() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext)


  const handleLogin =(e)=> {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      
      const user = userCredential.user;
      dispatch({type:"LOGIN", payload:user})
      navigate("/Dashboard")
    
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(true);
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
        Do not have an account yet?{' '}
        
        <Link to="/signup">Create account</Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput type="email" label="Email" placeholder="you@sample.com" required onChange={(e)=>{setEmail(e.target.value)}} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(e)=>{setPassword(e.target.value)}}/>
        {error &&  <Notification  mt="md" color="red" onClose={()=>{setError(false)}} >
             Wrong email or password!
          </Notification>
        }
        
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}

export default LoginForm;