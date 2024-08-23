import { useDispatch, useSelector } from "react-redux";
import { useState, Fragment } from "react";
import { countries } from "countries-list";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../../Redux/slices/cartSlice";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../utils/MetaData";




const Shipping = () => {
  const { shippingInfo  } = useSelector((state) => state.cartState);
  const [formData, setFormData] = useState({
    address: shippingInfo.address || "",
    city: shippingInfo.city || "",
    phoneNo: shippingInfo.phoneNo || "",
    postalCode: shippingInfo.postalCode || "",
    country: shippingInfo.country || "",
    state: shippingInfo.state || "",
  });
  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   console.log(countryList);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { address, city, phoneNo, postalCode, country, state } = formData;
    if (!address || !city || !phoneNo || !postalCode || !country || !state) {
      toast.error("Please fill all the shipping fields");
    } else {
      dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country, state }));
      navigate("/order/confirm");
    }
  };



  return (
    <Fragment>
      <MetaData title="Shipping Info" />
      <CheckoutSteps step1={true}/> 
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="mb-4 text-2xl font-bold">Shipping Info</h1>
            {[
              { label: "Address", name: "address", type: "text" },
              { label: "City", name: "city", type: "text" },
              { label: "Phone No", name: "phoneNo", type: "phone" },
              { label: "Postal Code", name: "postalCode", type: "number" },
              { label: "State", name: "state", type: "text" },
            ].map(({ label, name, type }) => (
              <div className="mb-4" key={name}>
                <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <div className="mb-4">
              <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
                Country
              </label>
              <select
                id="country"
                name="country"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.country}
                onChange={handleChange}
                required
              >
                {countryList.map((country, i) => (
                  <option key={i} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
