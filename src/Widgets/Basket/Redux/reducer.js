import products from "../productData";

const INITIAL_STATE = {
    basket: [],
    products,
};

const Reducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case "ADD_PRODUCT": {
            const prodFinder = (p) => p.id === payload.id;
            let newBasket = [];
            const productToAdd = state.products.find(prodFinder);

            if (state.basket.length) {
                let found = false;

                newBasket = state.basket.map((prod) => {
                    if (prod.id === payload.id) {
                        found = true;
                        return { ...prod, quantity: prod.quantity + 1 };
                    }
                    return prod;
                });

                if (!found) {
                    productToAdd.quantity = 1;
                    newBasket.push(productToAdd);
                }
            } else {
                productToAdd.quantity = 1;
                newBasket.push(productToAdd);
            }

            return {
                ...state,
                basket: newBasket,
            };
        }
        case "REMOVE_PRODUCT": {
            const { id, type } = payload;
            let newBasket = [];
            if (type === "del") {
                newBasket = state.basket.filter((p) => p.id !== id);
            } else {
                newBasket = state.basket.map((prod) => {
                    if (prod.id === payload.id) {
                        return { ...prod, quantity: prod.quantity - 1 };
                    }
                    return prod;
                });
            }
            return { ...state, basket: newBasket };
        }
        default:
            return state;
    }
};

export default Reducer;
