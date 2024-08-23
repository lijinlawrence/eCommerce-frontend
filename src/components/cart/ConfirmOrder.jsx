    import { Fragment, useEffect } from 'react';
    import { useSelector } from 'react-redux';
    import { Link, useNavigate } from 'react-router-dom';
    import CheckoutSteps from './CheckoutSteps';
    import MetaData from '../utils/MetaData';
import { toast } from 'react-toastify';

    const ConfirmOrder = ()=> {
    const { shippingInfo, items: cartItems } = useSelector((state) => state.cartState);
    const { user } = useSelector((state) => state.authState);
    const navigate = useNavigate();
    let itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    let taxPrice = Number(0.05 * itemsPrice);
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2);
    itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);



    const processToPayment = ()=>{
        const data ={
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data))
        navigate('/payment')
    }


    const validation = (shippingInfo, navigate) => {
        if (
          !shippingInfo.address ||
          !shippingInfo.city ||
          !shippingInfo.state ||
          !shippingInfo.country ||
          !shippingInfo.postalCode ||
          !shippingInfo.phoneNo
        ) {
          toast.error('Please fill all the shipping fields');
          navigate('/shipping');
        }
      };
    
      useEffect(() => {
        validation(shippingInfo, navigate);
      }, [shippingInfo, navigate]);

    
    

    return (
        <>
        <MetaData title={'Confirm Order'} />
        <CheckoutSteps step1 step2  /> 
        <div className="flex justify-between flex-wrap mt-5">
            <div className="w-full lg:w-2/3 mt-5">
            <h4 className="mb-3 text-lg font-bold">Shipping Info</h4>
            <p className="mb-2">
                <b>Name:</b> {user.name}
            </p>
            <p className="mb-2">
                <b>Phone:</b> {shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
                <b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state},{' '}
                {shippingInfo.country}
            </p>

            <hr className="my-4" />
            <h4 className="mt-4 text-lg font-bold">Your Cart Items:</h4>
            {cartItems.map((item, index) => (
                <Fragment key={index}>
                <div className="flex items-center my-2">
                    <div className="w-1/4 lg:w-1/6">
                    <img src={item.image} alt={item.name} className="h-16 w-20 object-cover" />
                    </div>
                    <div className="w-2/4 lg:w-3/6">
                    <Link to={`/product/${item.productId}`} className="text-blue-600 hover:text-blue-800">
                        {item.name}
                    </Link>
                    </div>
                    <div className="w-1/4 lg:w-1/6 mt-4 lg:mt-0">
                    <p>
                        {item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b>
                    </p>
                    </div>
                </div>
                <hr className="my-4" />
                </Fragment>
            ))}
            </div>

            <div className="w-full lg:w-1/4 my-4">
            <div className="bg-white p-4 shadow rounded">
                <h4 className="text-lg font-bold mb-4">Order Summary</h4>
                <hr className="my-2" />
                <p className="flex justify-between">
                Subtotal: <span className="font-semibold">${itemsPrice}</span>
                </p>
                <p className="flex justify-between">
                Shipping: <span className="font-semibold">${shippingPrice}</span>
                </p>
                <p className="flex justify-between">
                Tax: <span className="font-semibold">${taxPrice}</span>
                </p>
                <hr className="my-2" />
                <p className="flex justify-between">
                Total: <span className="font-semibold">${totalPrice}</span>
                </p>
                <hr className="my-4" />
                <button
                
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={processToPayment}
                >
                Proceed to Payment
                </button>
            </div>
            </div>
        </div>
        </>
    );
    }

    export default ConfirmOrder;