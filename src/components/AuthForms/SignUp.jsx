import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
{/* import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword'; */}


function SignUp() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email:"",
    password:"",
  });

  const[showPassword, setShowPassword] = useState(false)


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
    onChange={(e) => setInputs({...inputs, email: e.target.value})}
    />
    <Input 
    placeholder='Username'
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
    value={inputs.username}
    size={"sm"}
    onChange={(e) => setInputs({...inputs, username: e.target.value})}
    />
    <Input 
    placeholder='Full Name'
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
    value={inputs.fullName}
    size={"sm"}
    onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
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
      type={showPassword ? "text" : "password"}
      value={inputs.password}
      size={"sm"}
      onChange={(e) => setInputs({...inputs, password:e.target.value})}
      />

      <InputRightElement h="full">
        <Button varian={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <ViewIcon color={"black"} /> : <ViewOffIcon color={"black"} />}
        </Button>
      </InputRightElement>
    </InputGroup>

    <Button w="full" 
    background={"#FFA888"} 
    size={"sm"} 
    fontSize={20}
    color={"black"}
    fontFamily={"Inter, sans-serif"}
    _hover={{ background: "#FF8866" }}
    >
      Sign up
    </Button>
    </>
  )
}

export default SignUp