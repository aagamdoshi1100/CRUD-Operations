import React, { useEffect } from "react";
import Card from "./Card";
import { MdAdd } from "react-icons/md";
import { useProductContext } from "../contexts/productContext";
import InputContainer from "./InputContainer";
import useAuthContext from "../contexts/authContext";
import { IoLogOutOutline } from "react-icons/io5";
import listingStyle from "../modules/productListing.module.css";

const ProductListing = () => {
  const { products, setProducts, fetchAllProducts } = useProductContext();
  const { user, logoutHandler } = useAuthContext();
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div className={listingStyle.container}>
      {user.isAdmin && (
        <button
          className={listingStyle.floatingAddIcon}
          onClick={() =>
            setProducts({
              ...products,
              enableBox: !products.enableBox,
            })
          }
        >
          <MdAdd size="2em" />
        </button>
      )}
      <IoLogOutOutline
        size="2em"
        onClick={logoutHandler}
        className={listingStyle.floatingLogoutIcon}
      />
      {Array.isArray(products.allProducts) &&
        products.allProducts.length > 0 &&
        products.allProducts.map((pro, index) => (
          <>
            <Card data={pro} key={pro._id} />
          </>
        ))}
      {products.enableBox && <InputContainer />}
    </div>
  );
};

export default ProductListing;
