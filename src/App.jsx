import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./components/product/ProductDetails";
import SearchProducts from "./components/product/SearchProducts";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./Redux/actions/userActions";
import MyProfile from "./components/user/MyProfile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdateProfilePassword from "./components/user/UpdateProfilePassword";
import ForgetPassword from "./components/user/ForgetPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import OrderSuccess from "./components/cart/OrderSuccess";
import UserOrders from "./components/order/UserOrders";
import New from "./components/layout/New";
import OrderDetail from "./components/order/OrderDetail";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import UpdateOrder from "./components/admin/UpdateOrder";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ReviewList from "./components/admin/ReviewList";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const apiurl = import.meta.env.VITE_APIURL;

  useEffect(() => {
    store.dispatch(loadUser());
    console.log(apiurl);

    const getStripeApiKey = async () => {
      const { data } = await axios.get(`${apiurl}/api/v1/stripeapi`, {
        withCredentials: true,
      });
      setStripeApiKey(data.stripeApiKey);
    };
    getStripeApiKey();
  }, []);
  console.log(stripeApiKey);

  return (
    <>
      <Router>
        <HelmetProvider>
          <Header />
          <div className="w-3/4 mx-auto ">
            <ToastContainer theme="dark" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<SearchProducts />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/myProfile"
                element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myProfile/update"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myProfile/update/password"
                element={
                  <ProtectedRoute>
                    <UpdateProfilePassword />
                  </ProtectedRoute>
                }
              />
              <Route path="/password/forget" element={<ForgetPassword />} />
              <Route path="/password/reset" element={<ResetPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/new" element={<New />} />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myOrders"
                element={
                  <ProtectedRoute>
                    <UserOrders />
                  </ProtectedRoute>
                }
              />
              {stripeApiKey && (
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                      </Elements>
                    </ProtectedRoute>
                  }
                />
              )}
            </Routes>
          </div>
{/* admin routes */}
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <NewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/product/update/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute isAdmin={true}>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders/update/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UserList/>
                </ProtectedRoute>
              }
            />
                <Route
                  path="/admin/user/update/:id"
                  element={
                    <ProtectedRoute isAdmin={true}>
                      <UpdateUser/>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/reviews"
                  element={
                    <ProtectedRoute isAdmin={true}>
                      <ReviewList/>
                    </ProtectedRoute>
                  }
                />
              </Routes>

          <Footer />
        </HelmetProvider>
      </Router>
    </>
  );
}

export default App;
