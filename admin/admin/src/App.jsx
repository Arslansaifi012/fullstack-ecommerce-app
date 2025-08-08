import Navbar from "./components/Navbar";
import SidebarPanel from "../src/components/sidebarPanel"

const App = () =>{
  return (
    <div className="bg-grey-50 min-h-screen">
      <>
         <Navbar></Navbar>
         <hr />

         <div className="flex w-full">

          <SidebarPanel></SidebarPanel>

         </div>

      </>
 
    </div>
  )
} ;


export default App ;