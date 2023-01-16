import { Provider, useDispatch } from "react-redux";
import Cart from "./Basket";
import Products from "./Products";
import store from "./Redux/store";

const Container = () => {
    const dispatch = useDispatch();

    const addToCart = (id) => {
        dispatch({
            type: "ADD_PRODUCT",
            payload: { id },
        });
    };

    const removeFromCart = (id, type) => {
        dispatch({
            type: "REMOVE_PRODUCT",
            payload: {
                id, type
            }
        })
    }

    return (
        <>
            <Products addToCart={addToCart} />
            <Cart removeFromCart={removeFromCart} addToCart={addToCart} />
        </>
    );
};


const Index = () => {
    return (
        <Provider store={store}>
            <Container />
        </Provider>
    );
};

export default Index;
