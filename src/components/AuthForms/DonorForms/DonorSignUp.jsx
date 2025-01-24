import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import useMissionarySignUpWithEmailAndPassword from '../../../hooks/useMissionarySignUpWithEmailAndPassword';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import useDonorSignUpWithEmailAndPassword from '../../../hooks/useDonorSignUpWithEmailAndPassword';

function DonorSignUp() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    emailForm:"",
    faithCommunity: "",
    phoneNumber: "",
    pastorName: "",
    pastorPhone: "",
    churchPhone: "",
    password: ""
  });

  const[showPassword, setShowPassword] = useState(false);
  const {signUp, errorMessage, setErrorMessage, loading} = useDonorSignUpWithEmailAndPassword();
  const navigate = useNavigate();
  const toast = useToast();


  const handleSignUp = async () => {
    if(!inputs.emailForm || !inputs.phoneNumber || !inputs.username || !inputs.fullName) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const result = await signUp(inputs);
      if(result.success) {
        navigate("/missionarySignUpSuccess");
      }
    } catch(error) {
      setErrorMessage(error.message);
    }
  };

  const handleInputChange = (e) => {
    const {name, values} = e.target;
    setInputs({
      ...inputs,
      [name]: values,
    });
  };



  const handleInputFocus = () => {
    if(errorMessage) {
      setErrorMessage(null);
    }
  };

  const handlePhoneNumberChange = (value) => {
    setInputs({
      ...inputs,
      phoneNumber: value,
    });
  };

  const handlePastorPhoneChange = (value) => {
    setInputs({
      ...inputs,
      pastorPhone: value,
    });
  };

  const handleAgencyPhoneChange = (value) => {
    setInputs({
      ...inputs,
      agencyPhone: value,
    });
  };

  const handleChurchPhoneNumberChange = (value) => {
    setInputs({
      ...inputs,
      churchPhone: value,
    });
  };

  useEffect(() => {
    //
  }, [inputs, setErrorMessage])


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
    value={inputs.emailForm}
    size={"sm"}
    onChange={(e) => setInputs({...inputs, emailForm: e.target.value})}
    onFocus={handleInputFocus}
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
          onFocus={handleInputFocus}
          />
    
        <InputRightElement h="full">
        <Button varian={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <ViewIcon color={"black"} /> : <ViewOffIcon color={"black"} />}
        </Button>
        </InputRightElement>
    </InputGroup>
    <Box>
      <form>
        <FormControl id='phone' isRequired >
          <FormLabel>Seu telefone pessoal</FormLabel>
          <PhoneInput 
            country={"us"}
            value={inputs.phoneNumber}
            onChange={handlePhoneNumberChange}
            inputStyle={{width: '100%'}}
          />
          
        </FormControl>
      </form>
    </Box>
    <Input 
    placeholder='Nome de usuário'
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
    onFocus={handleInputFocus}
    />
    <Input 
    placeholder='Nome Completo'
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
    onFocus={handleInputFocus}
    />
    <Input 
      placeholder="Comunidade de fé (opcional)"
      sx={{
        "::placeholder": {
          color: "rgba(0, 0, 0, 0.5)",
        },
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      border={"1px solid #b0b0b0"}
      width={"100%"}
      height={"40px"}
      borderRadius={"4px"}
      _hover={{border: "1px solid black"}}
      fontSize={20}
      type="email"
      value={inputs.faithCommunity}
      size={"sm"}
      color={"black"}
      onChange={(e) => setInputs({...inputs, faithCommunity: e.target.value})}
      onFocus={handleInputFocus}
    />
    <Input 
      placeholder="Nome do seu Pastor (opcional)"
      sx={{
        "::placeholder": {
          color: "rgba(0, 0, 0, 0.5)",
        },
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      border={"1px solid #b0b0b0"}
      width={"100%"}
      height={"40px"}
      borderRadius={"4px"}
      _hover={{border: "1px solid black"}}
      fontSize={20}
      type="email"
      value={inputs.pastorName}
      size={"sm"}
      color={"black"}
      onChange={(e) => setInputs({...inputs, pastorName: e.target.value})}
      onFocus={handleInputFocus}
    />
    <Box>
      <form>
        <FormControl id='phone'>
          <FormLabel>Telefone do seu pastor</FormLabel>
          <PhoneInput 
            country={"us"}
            value={inputs.pastorPhone}
            onChange={handlePastorPhoneChange}
            inputStyle={{width: '100%'}}
          />
        </FormControl>
      </form>
    </Box>

    <Box>
      <form>
        <FormControl id='phone' >
          <FormLabel>Telefone da sua igreja</FormLabel>
          <PhoneInput 
            country={"us"}
            value={inputs.churchPhone}
            onChange={handleChurchPhoneNumberChange}
            inputStyle={{width: '100%'}}
          />
        </FormControl>
      </form>
    </Box>

    <Button w="full" 
    background={"#FFA888"} 
    size={"sm"} 
    fontSize={20}
    color={"black"}
    fontFamily={"Inter, sans-serif"}
    _hover={{ background: "#FF8866" }}
    onClick={handleSignUp}
    isLoading={loading}
    >
      Sign up
    </Button>
    {errorMessage && (
      <Alert
      status="error"
      w={"full"}
      fontSize={14}
      >
        <AlertIcon />
        {errorMessage}
      </Alert>
    )}
    </>
  )
}

export default DonorSignUp;