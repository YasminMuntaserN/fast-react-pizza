import { Outlet, useNavigation } from "react-router-dom"
import CartOverview from "../cart/CartOverview"
import Header from "./Header"
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading =navigation.state ==="isLoading";
  return (
    <div className ="grid grid-rows-[auto_1fr_auto] h-screen ">
      {isLoading && <Loader/>}

      <Header />
      <div className="overflow-scroll">
          <main className=" max-w-31xl mx-auto">
            <Outlet/>
          </main>
      </div>
      <CartOverview/>
    </div>
  )
}

export default AppLayout
