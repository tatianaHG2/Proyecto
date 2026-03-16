import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import CardForm from './pages/formulario.tsx';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <App/>
    
  </BrowserRouter>,
)
