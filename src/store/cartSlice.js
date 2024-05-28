import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalProduct: 0,
        totalPrice: 0
    },
    reducers: {
        saveInCartAction: (state, action) => {

            let copyCart = [...state.cart];
            
            // LOGIKA
            let findIndex = null;
            // ovde proveravam da li postoji u korpi(cart)
            copyCart.find((item,index) => {
                if(item.id === action.payload.id){
                    findIndex = index;
                    return;
                }
            })

            // DODAJ NOVI PROZIVOD ILI UVECAJ POSTOJECI!!
            if(findIndex === null){
               copyCart.push({...action.payload, count: 1,cartTotal: action.payload.price})
               state.totalProduct++;
               state.totalPrice += Math.floor(action.payload.price);
            }else{
                copyCart[findIndex].count++;
            }



            state.cart = copyCart;
            localStorage.setItem('cart_item', JSON.stringify(copyCart))
            localStorage.setItem('total_item', JSON.stringify(state.totalProduct));
        },
        deleteItemCartAction: (state, action) => {
            // console.log(action.payload);
            let copyCart = [...state.cart];

               // LOGIKA
               let findIndex = null;
               // ovde proveravam da li postoji u korpi(cart)
               copyCart.find((item,index) => {
                   if(item.id === action.payload.id){
                       findIndex = index;
                       return;
                   }
               })


               if(findIndex !== null){
                copyCart.splice(findIndex, 1);
                state.totalProduct--;
                state.totalPrice = subTotal(copyCart)
               }
               console.log(copyCart);



            state.cart = copyCart;
            localStorage.setItem('cart_item', JSON.stringify(copyCart))
            localStorage.setItem('total_item', JSON.stringify(state.totalProduct));


        },
        setPriceHandlerAction: (state, action) => {
            const {increment, index} = action.payload;
            console.log(action.payload);
            let copyCart = [...state.cart];
            console.log(copyCart)

            copyCart[index].cartTotal += copyCart[index].price * increment;
            state.totalPrice = subTotal(copyCart)

            if(copyCart[index].count === 1 && increment === -1){
                copyCart.splice(index,1);
                state.totalProduct--;
            }else{
                copyCart[index].count += increment;
            }


            state.cart = copyCart;
            localStorage.setItem('cart_item', JSON.stringify(copyCart))
            localStorage.setItem('total_item', JSON.stringify(state.totalProduct));
        }
    }
})

// helper func
function subTotal(arrayCart) {
    return arrayCart.reduce((acc, current) => {
        return acc + current.cartTotal;
    }, 0)
}


export const {saveInCartAction,deleteItemCartAction,setPriceHandlerAction} = cartSlice.actions;
export default cartSlice.reducer;