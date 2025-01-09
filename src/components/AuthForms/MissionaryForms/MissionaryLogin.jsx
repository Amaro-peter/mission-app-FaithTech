import { Alert, AlertIcon, Button, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import useLogin from '../../../hooks/useLogin';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';


function MissionaryLogin() {

  const [showPassword, setShowPassword] = useState(false);
  
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const {loading, error, setError, login} = useLogin();

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
      <InputGroup>
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
        type= {showPassword ? 'text' : 'password'}
        value={inputs.password}
        size={"sm"}
        onChange={(e) => setInputs({...inputs, password: e.target.value})}
        />
        <InputRightElement width="4.5rem">
          <IconButton 
          h = {"1.75rem"}
          size={"sm"}
          onClick={handlePasswordVisibility}
          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
          />
        </InputRightElement>
      </InputGroup>
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

export default MissionaryLogin;