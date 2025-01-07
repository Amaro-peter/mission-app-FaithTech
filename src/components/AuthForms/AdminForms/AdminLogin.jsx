import { Alert, AlertIcon, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react'
import useLogin from '../../../hooks/useLogin';
import useLoginAdmin from '../../../hooks/useLoginAdmin';


function AdminLogin() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const {loading, error, setError, login} = useLoginAdmin();

  const handleInputFocus = () => {
    if(error) {
      setError(null);
    }
  };

  return (
    <>
      <Input
      placeholder='Email'
      sx={{
        '::placeholder': {
          color: 'rgba(0, 0, 0, 0.5)', // Gray blended with black
        },
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Softer shadow
      }}
      border={"1px solid #b0b0b0"}
      width="100%" // Responsive width
      height= '40px' // Fixed height
      borderRadius= '4px' // Rounded corners
      _hover={{border: "1px solid black"}}
      _focus={{border: "1px solid black", outline: "none"}}
      fontSize={20}
      type='email'
      value={inputs.email}
      size={"sm"}
      color={"black"}
      onChange={(e) => setInputs({...inputs, email: e.target.value})}
      />

      <Input
      placeholder='Password'
      sx={{
        '::placeholder': {
          color: 'rgba(0, 0, 0, 0.5)', // Gray blended with black
        },
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Softer shadow
      }}
      border={"1px solid #b0b0b0"}
      width="100%" // Responsive width
      height= '40px' // Fixed height
      borderRadius= '4px' // Rounded corners
      _hover={{border: "1px solid black"}}
      _focus={{border: "1px solid black", outline: "none"}}
      fontSize={20}
      type='password'
      value={inputs.password}
      size={"sm"}
      onChange={(e) => setInputs({...inputs, password: e.target.value})}
      />

      {error && (
        <Alert status='error' w={"full"} fontSize={"14"}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Button
      w={"full"}
      height={"50px"}
      borderRadius={10}
      background={"#FFA888"}
      color={"black"}
      size={"sm"}
      fontSize={"20"}
      fontFamily={"Inter, sans-serif"}
      _hover={{ background: "#FF8866" }}
      isLoading={loading}
      onClick={() => login(inputs)}
      >
        Login
      </Button>
    </>
  )
}

export default AdminLogin;