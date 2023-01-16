import { useDispatch, useSelector } from "react-redux";

const ProductTile = ({ product, addToCart }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        border: "solid 1px black",
        padding: "10px",
        gap: "10px",
        width: "max-content",
        marginRight: "10px",
        borderRadius: "8px",
      }}
    >
      <span>{product.name}</span>
      <span>{product.price}</span>
      <button onClick={() => addToCart(product.id)}>Add to Cart</button>
    </div>
  );
};

const Products = ({ addToCart }) => {
  const products = useSelector((state) => state.products);

  return (
    <>
      {products.map((product, index) => {
        return (
          <ProductTile addToCart={addToCart} key={index} product={product} />
        );
      })}
    </>
  );
};

export default Products;
