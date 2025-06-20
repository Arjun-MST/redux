import React from 'react'
import { BrowserRouter , Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Task from './components/Task'
import { Provider } from 'react-redux'
import Store from './redux/store'

function App() {

  return (
    <Provider store={Store}>

<BrowserRouter>
<Routes>
        <Route path="/edit" element={<Task/>} />
        <Route path="/" element={<  Home/>} />
      </Routes>
</BrowserRouter>
    </Provider>
  )
}

export default App