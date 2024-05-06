import React, { useEffect } from "react";
import Card from "./Card";
import AddIcon from "@mui/icons-material/Add";
import { useProductContext } from "../contexts/productContext";
import InputContainer from "./InputContainer";

const ProductListing = () => {
  const { products, setProducts, fetchAllProducts } = useProductContext();
  useEffect(() => {
    fetchAllProducts();
  }, []);
  console.log(products);
  return (
    <div>
      <button
        onClick={() =>
          setProducts({
            ...products,
            enableBox: !products.enableBox,
          })
        }
      >
        <AddIcon color="primary" fontSize="large" />
      </button>
      {Array.isArray(products.allProducts) &&
        products.allProducts.length > 0 &&
        products.allProducts.map((pro, index) => (
          <Card data={pro} key={pro._id} />
        ))}
      {products.enableBox && <InputContainer />}
    </div>
  );
};

export default ProductListing;
