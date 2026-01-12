import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, checkAuth } from '../../auth/model/authSlice';

const calcTotalPrice = (items) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}

const mapCartFromServer = (serverCart) => {
    return serverCart.map((item) => ({
        ...item.product,
        count: item.count
    }))
}

const initialState = {
    items: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find((obj) => obj._id === action.payload._id)

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }

            state.totalPrice = calcTotalPrice(state.items);
        },

        removeItem(state, action) {
            state.items = state.items.filter(obj => obj._id !== action.payload);

            state.totalPrice = calcTotalPrice(state.items);
        },

        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj._id === action.payload);

            if (findItem) {
                findItem.count--;
                if (findItem.count < 1) {
                     state.items = state.items.filter(obj => obj._id !== action.payload);
                }
            }

            state.totalPrice = calcTotalPrice(state.items);
        },

        clearCart(state) {
            state.items = []
            state.totalPrice = 0;
        }
        
    },

    extraReducers: (builder) => {
        
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            if (action.payload?.cart) {
                state.items = mapCartFromServer(action.payload.cart);
                state.totalPrice = calcTotalPrice(state.items);
            }
        });

        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload?.cart) {
                state.items = mapCartFromServer(action.payload.cart);
                state.totalPrice = calcTotalPrice(state.items);
            }
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload?.cart) {
                state.items = mapCartFromServer(action.payload.cart);
                state.totalPrice = calcTotalPrice(state.items);
            }
        });
    }
})

export const { addItem, removeItem, clearCart, minusItem } = cartSlice.actions
export default cartSlice.reducer;