import { useSelector } from "react-redux";
import CreateUser from "../user/CreateUser";  
import Button from "./Button";
function Home() {
  const userName =useSelector(state =>state.user.userName);
  return (
    <div className="my-8  mt-10 text-center sm:my-16 sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl ">
        The best pizza.
        <br />
        <span className="text-yellow-400">Straight out of the oven, straight to you.</span>
      </h1>
      {userName =="" ?<CreateUser />:<Button to="/menu" type="primary" >Continue ordering ,{userName}</Button>}
    </div>
  );
}

export default Home;
