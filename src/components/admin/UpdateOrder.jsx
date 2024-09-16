import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminUpdateOrder, getOrderDetails } from '../../Redux/actions/orderActions';
import Loader from '../utils/Loader';
import { toast } from 'react-toastify'; // Don't forget to import toast

const UpdateOrder = () => {
  const { loading, isOrderUpdated, error, orderDetails } = useSelector(state => state.orderState);
  const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {} } = orderDetails;
  const isPaid = paymentInfo.status === 'succeeded' ? true : false;
  const [orderStatus, setOrderStatus] = useState('Processing');
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if(isOrderUpdated){
      return navigate('admin/orders')
    }
    const orderData = {};
    orderData.orderStatus = orderStatus;
    dispatch(adminUpdateOrder(orderId, orderData));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      toast.success('Order Updated Successfully!');
      return;
    }

    if (error) {
      toast.error(error);
      return;
    }

    dispatch(getOrderDetails(orderId));
  }, [isOrderUpdated, error, dispatch]);

  useEffect(() => {
    if (orderDetails._id) {
      setOrderStatus(orderDetails.orderStatus);
    }
  }, [orderDetails]);

  return (
    <Fragment>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
      ) : (
        <Fragment>
          <div className="flex flex-col lg:flex-row gap-3 justify-between w-3/4 mx-auto">
            <div className="w-full lg:w-2/3 mt-5">
              <h1 className="my-5 text-xl font-bold">Order # {orderDetails._id}</h1>

              <h4 className="mb-4 text-lg font-semibold">Shipping Info</h4>
              <p>
                <b>Name:</b> {user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}
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
            <div className="w-full lg:w-1/3 mt-10  ">
              <h4 className="text-xl font-bold mb-4">Order Status</h4>
              <div className="flex flex-col space-y-4">
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={e => setOrderStatus(e.target.value)}
                  value={orderStatus}
                  name="status"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <div className='flex justify-start'>
                <button
                  disabled={loading}
                  onClick={submitHandler}
                  className="btn btn-primary btn-md"
                >
                  Update Status
                </button>

                </div>
             
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateOrder;
