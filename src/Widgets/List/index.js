import { useEffect, useState } from "react";
import "./styles.css";

const useProducts = () => {
    const [results, setResults] = useState([]);
    const fetchProducts = async () => {
        const productsResp = await fetch(`https://dummyjson.com/products`);

        const productsJSON = await productsResp.json();
        setResults(productsJSON?.products || []);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return results;
};

const ListComponent = () => {
    const [searched, setSearched] = useState("");
    const products = useProducts();
    const [selected, selectProduct] = useState({});

    const results = products?.filter((prod) =>
        prod?.title?.toLowerCase()?.includes(searched?.toLowerCase())
    );

    console.log("results", results);

    return (
        <section className="wrapper">
            <input
                type="search"
                className="search_box"
                placeholder="Search product"
                value={searched}
                onChange={(e) => setSearched(e.target.value)}
            />

            {results.length > 0 && (
                <ul className="search_results">
                    {results?.map((result) => (
                        <li
                            className={`${
                                selected?.title === result.title
                                    ? `selected`
                                    : ``
                            }`}
                            onClick={() => selectProduct(result)}
                        >
                            <span>{result.title}</span>
                        </li>
                    ))}
                </ul>
            )}

            <span className="clicked"></span>
        </section>
    );
};

export default ListComponent;
