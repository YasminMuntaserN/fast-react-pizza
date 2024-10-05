// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../utilts/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// // https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const[withPriority , setWithPriority]=useState(false);

  const {
    userName  ,
    status:addressStatus ,
    position ,
    address,
    errorAddress
    } =useSelector(state =>state.user);

  const isLoadingAddress =addressStatus === "loading";
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "isSubmitted";

  const formErrors =useActionData();
  const dispatch = useDispatch();

  const cart=useSelector(getCart);
  const totalCartPrice =useSelector(getTotalCartPrice);
  const priorityPrice=withPriority? totalCartPrice * 0.2 : 0;
  const totalPrice =totalCartPrice+priorityPrice;

  if(!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>
      
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" >

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input  className="input w-full" type="text" defaultValue={userName} name="customer" required />
        </div>

    <div className="mb-5 flex gap-2 flex-col sm:flex-row  sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input  className="input w-full" type="text" name="phone" required />
          </div>
          {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 rounded-md">{formErrors.phone}</p>}
    </div>

    <div className="mb-5 flex gap-2 flex-col sm:flex-row  sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full sm:h-[34px] lg:h-[52px] "
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAddress} />
            {addressStatus === "error" &&
              <p className="text-xs mt-2 text-red-700 bg-red-100 rounded-md">{errorAddress}</p>}

          </div>
    {
      !position.latitude && !position.longitude &&
      (
        <span className ="absolute right-[2px] top-[1px] z-50 sm:right-[2px] sm:top-[1.5px]">
          <Button type="small"
            disabled={isLoadingAddress || isSubmitting} 
            onClick={(e)=>{
              e.preventDefault();
              dispatch(fetchAddress())}}>
              Get Position
          </Button>
      </span>
      )
    }
    </div>

        <div  className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring-offset-2
              focus:outline-none focus:ring focus:ring-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div className="grow">
          <input  type="hidden" name="cart" 
          value={JSON.stringify(cart)}/>
          <input  type="hidden" name="position" 
          value={position.latitude && position.longitude
            ?`${position.latitude} ,${position.longitude} `:""}/>
          <Button disabled={isSubmitting || isLoadingAddress}  type="primary" >
            {isSubmitting ? "placing order ... " :`Order now from ${  formatCurrency(totalPrice)}`} 
          </Button>
        </div>
      </Form>
    </div>
  );
}
/*whenever this form here will be
submitted behind the scenes, react router will then call this action
function and it will pass in the request that was submitted.*/ 
export  async function action({request}){
  // من خلال هدول السطرين بنجيب كل الداتا الي بالفورم عنا 
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const Order ={
    ...data ,
    cart: JSON.parse(data.cart),
    priority : data.priority == 'true',
  }
  
  const errors ={}
  if(!isValidPhone(Order.phone)) errors.phone ="please give us your correct phone number !"

  if(Object.keys(errors).length > 0) return errors;

  // if everything is okay , create new order and redirect
  const newOrder=await createOrder(Order);  

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
