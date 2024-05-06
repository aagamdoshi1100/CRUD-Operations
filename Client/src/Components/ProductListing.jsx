import React, { useEffect } from "react";
import Card from "./Card";
import AddIcon from "@mui/icons-material/Add";
import { useProductContext } from "../contexts/productContext";
import InputContainer from "./InputContainer";
import useAuthContext from "../contexts/authContext";
import { IoLogOutOutline } from "react-icons/io5";

const ProductListing = () => {
  const { products, setProducts, fetchAllProducts } = useProductContext();
  const { user, logoutHandler } = useAuthContext();
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div>
      {user.isAdmin && (
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
      )}
      <IoLogOutOutline size="2em" onClick={logoutHandler} />
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
