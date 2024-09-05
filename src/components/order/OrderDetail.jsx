import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails } from '../../Redux/actions/orderActions';
import Loader from '../utils/Loader';

export default function OrderDetail() {
  const { orderDetails, loading } = useSelector((state) => state.orderState);
  const {
    shippingInfo={} ,
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetails;
 

  const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    
    
    dispatch(getOrderDetails(id));
  }, [id,dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-2/3 mt-5">
              <h1 className="my-5 text-xl font-bold">Order # {orderDetails?._id}</h1>

              <h4 className="mb-4 text-lg font-semibold">Shipping Info</h4>
              <p>
                <b>Name:</b> {user?.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo?.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},{" "}
                {shippingInfo?.postalCode}, {shippingInfo?.state},{" "}
                {shippingInfo?.country}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr className="my-4" />

              <h4 className="my-4 text-lg font-semibold">Payment</h4>
              <p className={isPaid ? "text-green-500" : "text-red-500"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4 text-lg font-semibold">Order Status:</h4>
              <p className={orderStatus && orderStatus.includes('Delivered') ? 'text-green-500' : 'text-red-500'}>
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4 text-lg font-semibold">Order Items:</h4>

              <hr className="my-4" />

              <div className="my-4">
                {orderItems && orderItems.map((item) => (
                  <div key={item.productId} className="flex flex-col lg:flex-row items-center my-5">
                    <div className="lg:w-1/6 mb-4 lg:mb-0">
                      <img src={item.image} alt={item.name} className="h-12 w-16 object-cover" />
                    </div>

                    <div className="lg:w-2/5">
                      <Link to={`/product/${item.productId}`} className="text-blue-500 hover:underline">
                        {item.name}
                      </Link>
                    </div>

                    <div className="lg:w-1/6 mt-4 lg:mt-0">
                      <p>${item.price}</p>
                    </div>

                    <div className="lg:w-1/6 mt-4 lg:mt-0">
                      <p>{item.quantity} Piece(s)</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
