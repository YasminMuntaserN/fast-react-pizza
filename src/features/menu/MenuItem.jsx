import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { formatCurrency } from "../utilts/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/updateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch =useDispatch();

  const {id,  name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity =useSelector(getCurrentQuantityById(id));
  const IsInCart =currentQuantity > 0;
  function handleAddToCart(){
    const newItem = 
      {
        pizzaId:id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice * 1,
      };
      dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ?'opacity-70 grayscale' : ''}`}/>
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="font-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase text-stone-500" >Sold out</p>}
        
          { IsInCart && 
          <div className="flex items-center gap-3">
            <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity} />
            <DeleteItem pizzaId={id}/>
          </div>
          }

          {!soldOut && !IsInCart && <Button type="small" onClick={handleAddToCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
