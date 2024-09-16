import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import emptyCart from '../../assets/images/emptyCart.png';
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
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {items.length === 0 ? (
        <div className="flex justify-center items-center h-screen flex-col">
          <img src={emptyCart} width={200} alt="empty cart" />
          <h1 className="text-2xl lg:text-3xl font-bold">Your Cart is empty</h1>
        </div>
      ) : (
        <Fragment>
          <h2 className="mt-5 text-center text-xl lg:text-2xl">
            Your Cart: <b>{items.length} items</b>
          </h2>
          <div className="flex flex-col lg:flex-row justify-between min-h-screen">
            {/* Cart Items Section */}
            <div className="w-full lg:w-2/3 px-2 lg:px-6">
              {items.map((item) => (
                <Fragment key={item.productId}>
                  <hr className="my-4" />
                  <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                    <div className="w-full lg:w-1/6 flex justify-center lg:justify-start">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-28 object-cover"
                      />
                    </div>

                    <div className="w-full lg:w-1/3 text-center lg:text-left">
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-500 text-sm lg:text-base"
                      >
                        {item.name}
                      </Link>
                    </div>

                    <div className="w-full lg:w-1/6 text-center">
                      <p className="text-lg">${item.price}</p>
                    </div>

                    <div className="w-full lg:w-1/6 flex justify-center lg:justify-start">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="bg-orange-500 text-white px-2 py-1 rounded"
                          onClick={() => decreaseQty(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-12 text-center border border-gray-300 rounded-md"
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

                    <div className="w-full lg:w-1/12 text-center">
                      <MdDelete
                        className="text-red-500 cursor-pointer"
                        size={30}
                        onClick={() => removeItem(item)}
                      />
                    </div>
                  </div>
                </Fragment>
              ))}
              <hr className="my-4" />
            </div>

            {/* Order Summary Section */}
            <div className="w-full lg:w-1/4 px-2 lg:px-6 mt-6 lg:mt-0">
              <div className="border p-4 rounded-lg bg-gray-50">
                <h4 className="text-lg font-semibold">Order Summary</h4>
                <hr className="my-2" />
                <p className="flex justify-between text-sm">
                  Subtotal:{" "}
                  <span>
                    {items.reduce((acc, item) => acc + item.quantity, 0)} Units
                  </span>
                </p>
                <p className="flex justify-between text-sm">
                  Est. total:{" "}
                  <span>
                    $
                    {items.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    ).toFixed(2)}
                  </span>
                </p>
                <hr className="my-2" />
                <button
                  onClick={checkoutHandler}
                  className="bg-blue-500 text-white w-full py-2 rounded mt-2 text-sm lg:text-base"
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
