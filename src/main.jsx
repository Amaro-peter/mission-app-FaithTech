import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'
import { BrowserRouter } from 'react-router-dom'
import { TabProvider } from './context/TabContext.jsx'
import { PathContextProvider } from './context/PreviousPathContext.jsx'

const styles = {
  global: (props) => ({
    body: {
      bg: "#f5f5f5",
      color:"black"
    }
  })
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config, styles })


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PathContextProvider>
        <ChakraProvider theme={theme}>
          <TabProvider>
            <App />
          </TabProvider>
        </ChakraProvider>
      </PathContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
