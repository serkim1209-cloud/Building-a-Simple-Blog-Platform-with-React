import { BrowserRouter,Route,Routes } from 'react-router-dom'
import {lazy,Suspense} from 'react'
import Loading from './Component/Loadinf'
import Main from './Component/Main'
import Navigation from './Component/Navigation'
import Header from './Component/Header'

import './App.css'

function App() {
  

  return (
 <>
 <Navigation/>
<Header/>
<Main/>

 </>
  )
}

export default App
