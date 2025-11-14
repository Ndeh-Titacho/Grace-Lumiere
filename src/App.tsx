
  import { Routes, Route, Link} from 'react-router-dom'
  import { OutletLayout } from './Components/Layout/OutletLayout'
  import { Landing } from './Pages/Landing'
  import { About } from './Pages/About'
  import { Bridal } from './Pages/Bridal'
  import { Collection } from './Pages/Collection'
  import { Boutique } from './Pages/Boutique'
  import { ProductDetail } from './Pages/ProductDetail'


  function App() {
  

    return (
      <>
      <Routes>
          <Route element={<OutletLayout />}>
            <Route path='/' element={<Landing />} />
            <Route path='/about' element={<About />} />
            <Route path='/bridal' element={<Bridal />} />
            <Route path='/boutique' element={<Boutique />} />
            <Route path='/collection/:category/:collectionId' element={<Collection />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            
          </Route>

      </Routes>
      
      </>
    )
  }

  export default App
