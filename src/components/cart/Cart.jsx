import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import emptyCart from '../../assets/images/emptyCart.png'
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from "../../Redux/slices/cartSlice";
import { MdDelete } from "react-icons/md";

export default function Cart() {
  const { items } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    if (item.quantity >= item.stock) return;
    dispatch(increaseCartItemQty(item.productId));
  };

  const decreaseQty = (item) => {
    if (item.quantity === 1) return;
    dispatch(decreaseCartItemQty(item.productId));
  };

  const removeItem = (item) => {
    dispatch(removeItemFromCart(item.productId));
  };


  const checkoutHandler = () => {
    navigate("/login?redirect=shipping"); //search location handler
  };

  return (
    <Fragment>
      {items.length === 0 ? (
        <div className="flex justify-center items-center h-screen flex-col">
          <img src={emptyCart} width={200} alt="empty cart" />
          <h1 className="text-3xl font-bold">Your Cart is empty</h1>
        </div>
      ) : (
        <Fragment>
          <h2 className="mt-5 text-center">
            Your Cart: <b>{items.length} items</b>
          </h2>
          <div className="flex flex-col lg:flex-row justify-between h-screen">
            <div className="w-full lg:w-2/3">
              {items.map((item) => (
                <Fragment key={item.productId}>
                  <hr className="my-4" />
                  <div className="flex items-center justify-center ">
                    <div className="w-1/4 lg:w-1/6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-28 object-cover"
                      />
                    </div>
                    <div className="w-2/4 lg:w-1/3 ml-4">
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-500"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="w-1/4 lg:w-1/6 mt-4 lg:mt-0">
                      <p className="text-lg">${item.price}</p>
                    </div>
                    <div className="w-1/4 lg:w-1/6 mt-4 lg:mt-0">
                      <div className="flex items-center">
                        <button
                          className="bg-orange-500 text-white px-2 py-1 rounded"
                          onClick={() => decreaseQty(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="mx-2 w-12 text-center"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded"
                          onClick={() => increaseQty(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-1/4 lg:w-1/12 mt-4 lg:mt-0">
                      <MdDelete
                        className="text-red-500 cursor-pointer ms-5 "
                        size={40}
                        onClick={() => removeItem(item)}
                      />
                    </div>
                  </div>
                </Fragment>
              ))}
              <hr className="my-4" />
            </div>

            <div className="w-full lg:w-1/4 my-4 lg:my-0">
              <div className="border p-4 rounded">
                <h4 className="text-lg font-semibold">Order Summary</h4>
                <hr className="my-2" />
                <p className="flex justify-between">
                  Subtotal:{" "}
                  <span>
                    {items.reduce((acc, item) => acc + item.quantity, 0).toFixed(2)}{" "}
                    (Units)
                  </span>
                </p>
                <p className="flex justify-between">
                  Est. total:{" "}
                  <span>
                    $
                    {items.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  </span>
                </p>
                <hr className="my-2" />
                <button
                  onClick={checkoutHandler}
                  className="bg-blue-500 text-white w-full py-2 rounded mt-2"
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
