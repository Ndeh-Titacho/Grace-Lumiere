
  import { Routes, Route, Link} from 'react-router-dom'
  import { OutletLayout } from './Components/Layout/OutletLayout'
  import { Landing } from './Pages/Landing'
  import { About } from './Pages/About'
  import { Bridal } from './Pages/Bridal'


  function App() {
  

    return (
      <>
      <Routes>
          <Route element={<OutletLayout />}>
            <Route path='/' element={<Landing />} />
            <Route path='/about' element={<About />} />
            <Route path='/bridal' element={<Bridal />} />
            
          </Route>

      </Routes>
      
      </>
    )
  }

  export default App
