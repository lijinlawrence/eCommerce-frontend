import React, { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import MetaData from "../utils/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { orderCompleted } from "../../Redux/slices/cartSlice";
import { createOrder } from "../../Redux/actions/orderActions";
import { clearError } from "../../Redux/slices/authSlice";
const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector((state) => state.cartState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Add state to manage success status
  const {error :orderError }= useSelector((state)=>state.orderState)


  const paymentData = {
    amount: Math.round(orderInfo?.totalPrice * 100),
    address: shippingInfo.address,
    city: shippingInfo.city,
    phoneNo: shippingInfo.phoneNo,
    postalCode: shippingInfo.postalCode,
    country: shippingInfo.country,
    state: shippingInfo.state,
    name: user.name,
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
  }

  if(orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice 
    order.shippingPrice = orderInfo.shippingPrice
    order.taxPrice = orderInfo.taxPrice
    order.totalPrice = orderInfo.totalPrice
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

   // Validation Check when Component Mounts



  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiurl = import.meta.env.VITE_APIURL; // to import .env file
      console.log(apiurl);
      const { data } = await axios.post(
        `${apiurl}/api/v1/payment/procces`, // Ensure the endpoint is correct
        paymentData,
        { withCredentials: true }
      );
       setSuccess(data.success)
      
      const clientSecret = data.client_secret;
      const cardElement = elements.getElement(CardNumberElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        { 
          payment_method: {
            card: cardElement, //cardType for get card detailas
            billing_details: {
              name: user.name,
              email: user.email,
            },
          },
        }
      );

      if (error) {
        toast.error(error.message);
      } else {
        if (paymentIntent.status === "succeeded") {
          toast.success("Payment Success!");
          order.paymentInfo = {
            id: paymentIntent.id,
            status:paymentIntent.status
        }
          navigate("/order/success");
          dispatch(createOrder(order))
          console.log(order);
          
          dispatch(orderCompleted())
        } else {
          toast.warn("Please try again!");
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!success){
      validation(shippingInfo, navigate);
    }
    if(orderError){
        toast.error(orderError)
        dispatch(clearError())
    }
     
    }, [shippingInfo, navigate,orderError]);

  return (
    <>
        <MetaData title={'Payment'} />
        <CheckoutSteps step1 step2 step3 /> 
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg  shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <div className="border border-gray-300 rounded-md p-2 relative">
            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <div className="border border-gray-300 rounded-md p-2">
              <CardExpiryElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <div className="border border-gray-300 rounded-md p-2">
              <CardCvcElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white font-bold ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition duration-200`}
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay $${orderInfo?.totalPrice}`}
        </button>
      </form>
    </div>
    </>
  )
};

export default Payment;
