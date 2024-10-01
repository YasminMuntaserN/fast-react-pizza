import { createBrowserRouter } from "react-router-dom"
import Home from "./ui/Home";
import Menu from "./features/Menu";


createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/menu',
    element: <Menu/>
  }
])

function App() {
  return (
    <div>
      hello
    </div>
  )

}


export default App
