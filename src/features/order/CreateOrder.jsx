// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";
import Button from "../ui/Button";

// // https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];
console.log(fakeCart);
function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "isSubmitted";

  const formErrors =useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Lets go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" >

        <div>
          <label>First Name</label>
          <input  className="input" type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input  className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input className="input"
              type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring-offset-2
              focus:outline-none focus:ring focus:ring-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input  type="hidden" name="cart" 
          value={JSON.stringify(cart)}/>
          <Button disabled={isSubmitting}  type="primary" >
            {isSubmitting ? "placing order ... " :"Order now ... "} 
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
    priority : data.priority == "on",
  }
  
  const errors ={}
  if(!isValidPhone(Order.phone)) errors.phone ="please give us your correct phone number !"

  if(Object.keys(errors).length > 0) return errors;

  // if everything is okay , create new order and redirect
  const newOrder=await createOrder(Order);  

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
