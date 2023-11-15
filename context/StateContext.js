import React ,{createContext,useState,useEffect,useContext} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children})=>{
    const [showcart, setshowcart] = useState(false)
    const [cartItems, setcartItems] = useState([])
    const [totalPrice, settotalPrice] = useState(0)
    const [totalQuantities, settotalQuantities] = useState(0)
    const [qty, setqty] = useState(1)

    let foundProduct;
    let index;

    const onAdd = (product,quantity)=>{
        const checkProductInCart = cartItems.find((item)=>item._id === product._id);
        settotalPrice((prevTotalPrice)=>prevTotalPrice+product.price*quantity)
        settotalQuantities((prevTotalQuantity)=>prevTotalQuantity+quantity)
        if(checkProductInCart){
            const updateCartItems  = cartItems.map((cartproduct)=>{
                if(cartproduct._id === product._id) return {
                    ...cartproduct,
                    quantity:cartproduct.quantity+quantity
                }
            })
            setcartItems(updateCartItems);
        }else{
            product.quantity = quantity;
            setcartItems([...cartItems,{...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }

    const toggleCartItemQuantity = (id,value)=>{
        foundProduct = cartItems.find((item)=> item._id === id)
        index = cartItems.findIndex((product)=>product._id === id)
        if(value === 'inc'){
            let newcartItems = [...cartItems,{...product,quantity:product.quantity+=1}]
            setcartItems(newcartItems)
        }else if(value === "dec"){

        }
    }

    const incQty = ()=>{
        setqty((prev)=>prev+1)
    }
    const decQty = ()=>{
        setqty((prev)=>{
            if(prev - 1<1) return 1
            return prev-1
        })
    }
    return(
        <Context.Provider
        value={{
            cartItems,totalPrice,totalQuantities,qty,incQty,decQty,onAdd,showcart, setshowcart
        }}
        >
            {children}
        </Context.Provider>
    )
}
export const useStateContext = ()=> useContext(Context)