
  import { Routes, Route, Link} from 'react-router-dom'
  import { OutletLayout } from './Layout/OutletLayout'
  import { Landing } from './Pages/Landing'
  import { About } from './Pages/About'


  function App() {
  

    return (
      <>
      <Routes>
          <Route element={<OutletLayout />}>
            <Route path='/' element={<Landing />} />
            <Route path='/about' element={<About />} />
            
          </Route>

      </Routes>
      
      </>
    )
  }

  export default App
