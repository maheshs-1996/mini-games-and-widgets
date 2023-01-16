import { connect, useSelector } from "react-redux";

const CartTile = ({ product, addToCart, removeFromCart }) => {
    return (
        <div
            style={{
                width: "100%",
                border: "solid 1px black",
                padding: "16px",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <span>{product.name}</span>
            <div>
                <span
                    style={{
                        margin: "0 5px",
                        color: "red",
                    }}
                >
                    {product.quantity}
                </span>
                <button onClick={() => addToCart(product.id)}>+</button>
                <button
                    onClick={() => {
                        const type = product.quantity <= 1 ? "del" : "dec";
                        removeFromCart(product.id, type);
                    }}
                >
                    -
                </button>
                <button onClick={() => removeFromCart(product.id, "del")}>
                    X
                </button>
            </div>
        </div>
    );
};

const Basket = ({ addToCart, removeFromCart }) => {
    const basket = useSelector((state) => state.basket);

    return basket.length ? (
        <div
            style={{
                width: "500px",
                border: "solid 1px #d11243",
                margin: "12px auto",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                padding: "8px",
                gap: "8px",
            }}
        >
            {basket.map((product, index) => {
                return (
                    <CartTile
                        addToCart={addToCart}
                        key={index}
                        product={product}
                        removeFromCart={removeFromCart}
                    />
                );
            })}
        </div>
    ) : null;
};

export default Basket;
