import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { CollectionProvider } from './hooks/useCollection.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CollectionProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CollectionProvider>
  </StrictMode>,
)
