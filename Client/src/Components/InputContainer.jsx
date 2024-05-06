import React, { useState } from "react";
import { useProductContext } from "../contexts/productContext";
import inputContainerStyles from "../modules/InputContainer.module.css";
import { validateFormData } from "../utils/validator";
import { FaCircleInfo } from "react-icons/fa6";

const fields = [
  {
    placeholder: "Name",
    type: "text",
    keyname: "name",
  },
  {
    placeholder: "Price",
    type: "number",
    keyname: "price",
  },
  {
    placeholder: "Discount percentage",
    type: "number",
    keyname: "discountPercentage",
  },
];

const InputContainer = () => {
  const { products, setProducts, addProduct, editProduct } =
    useProductContext();
  const [error, setError] = useState({});
  const validateFields = (cbfn) => {
    const validateFlag = validateFormData(products.inputs, setError);
    if (validateFlag) {
      cbfn();
      setError({});
    }
  };
  return (
    <div className={inputContainerStyles.containerBg}>
      <div className={inputContainerStyles.container}>
        {fields.map((field, index) => (
          <>
            <input
              type={field.type}
              placeholder={field.placeholder}
              key={index}
              className={inputContainerStyles.inputField}
              value={products.inputs[field.keyname]}
              onChange={(e) =>
                setProducts({
                  ...products,
                  inputs: {
                    ...products.inputs,
                    [field.keyname]: e.target.value,
                  },
                })
              }
            />
            {error && error[field.keyname] !== undefined && (
              <p className={inputContainerStyles.error}>
                <FaCircleInfo />
                {" " + error[field.keyname]}
              </p>
            )}
          </>
        ))}
        <div className={inputContainerStyles.buttonGroup}>
          <button
            className={inputContainerStyles.cancelButton}
            onClick={() =>
              setProducts({
                ...products,
                inputs: {
                  name: "",
                  price: "",
                  discountPercentage: "",
                },
                enableEdit: false,
                enableBox: !products.enableBox,
              })
            }
          >
            Cancel
          </button>
          {products.enableEdit ? (
            <button
              className={inputContainerStyles.addButton}
              onClick={() => validateFields(() => editProduct(products.editId))}
            >
              Update
            </button>
          ) : (
            <button
              className={inputContainerStyles.addButton}
              onClick={() => validateFields(addProduct)}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputContainer;
