import { createContext, useContext, useState } from "react";
import { API_URL } from "../constants";

const ProductContext = createContext();

const reset = {
  inputs: {
    name: "",
    price: "",
    discountPercentage: "",
  },
};

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState({
    allProducts: [],
    inputs: {
      name: "",
      price: "",
      discountPercentage: "",
    },
    enableBox: false,
    loading: false,
    enableEdit: false,
    editId: "",
  });

  const fetchAllProducts = async () => {
    try {
      setProducts({
        ...products,
        loading: true,
      });
      const fetchProducts = await fetch(`${API_URL}/products`);
      const responseProductData = await fetchProducts.json();
      if (!fetchProducts.ok) {
        throw responseProductData;
      } else {
        console.log(responseProductData);
        setProducts({
          ...products,
          loading: false,
          allProducts: responseProductData.data ?? [],
        });
      }
    } catch (err) {
      console.error(err);
      setProducts({
        ...products,
        loading: false,
      });
    }
  };

  const addProduct = async () => {
    try {
      setProducts({
        ...products,
        loading: true,
      });
      const addProductResponse = await fetch(`${API_URL}/products/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(products.inputs),
      });
      const resData = await addProductResponse.json();
      if (!addProductResponse.ok) {
        throw resData;
      } else {
        setProducts({
          ...products,
          loading: false,
          inputs: reset.inputs,
          allProducts: [...products.allProducts, resData.data] ?? [],
          enableBox: false,
        });
      }
    } catch (e) {
      console.error(e);
      setProducts({
        ...products,
        loading: false,
      });
    }
  };
  const editProduct = async (productId) => {
    const getToken = localStorage.getItem("token");
    try {
      const editResponse = await fetch(
        `${API_URL}/products/${productId}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            authorization: getToken,
          },
          body: JSON.stringify(products.inputs),
        }
      );
      const responseData = await editResponse.json();
      console.log(editResponse, responseData);
      if (!editResponse.ok) {
        throw responseData;
      } else {
        setProducts({
          ...products,
          allProducts: products.allProducts.map((pro) => {
            if (pro._id === products.editId) {
              pro = Object.assign(pro, responseData.response);
              return pro;
            }
            return pro;
          }),
          editId: "",
          enableEdit: false,
          enableBox: false,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteProduct = async (productId) => {
    const getToken = localStorage.getItem("token");
    try {
      const deleteResponse = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: { authorization: getToken },
      });
      const deleted = await deleteResponse.json();
      if (!deleteResponse.ok) {
        throw deleted;
      } else {
        setProducts({
          ...products,
          allProducts: products.allProducts.filter(
            (pro) => pro._id !== productId
          ),
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        fetchAllProducts,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;

export const useProductContext = () => useContext(ProductContext);
