import React from "react";
import cardStyle from "../modules/card.module.css";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useProductContext } from "../contexts/productContext";
import useAuthContext from "../contexts/authContext";

const Card = ({ data }) => {
  const { _id, name, discountPercentage, price } = data;
  const { setProducts, products, deleteProduct } = useProductContext();
  const { user } = useAuthContext();
  return (
    <div className={cardStyle.container}>
      <p className={cardStyle.cardHeading}>{name}</p>
      <p className={cardStyle.MRP}>${price}</p>
      <p className={cardStyle.discountPercentage}>
        -{discountPercentage}%
        <span className={cardStyle.discountPercentageText}>off</span>
      </p>
      {user.isAdmin && (
        <div className={cardStyle.actions}>
          <FiEdit
            size="1.6em"
            className={cardStyle.editIcon}
            onClick={() =>
              setProducts({
                ...products,
                inputs: {
                  name,
                  price,
                  discountPercentage,
                },
                enableEdit: true,
                editId: _id,
                enableBox: !products.enableBox,
              })
            }
          />
          <MdDeleteOutline
            size="2em"
            className={cardStyle.deleteIcon}
            onClick={() => deleteProduct(_id)}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
