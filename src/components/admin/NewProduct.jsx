import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNewProduct } from "../../Redux/actions/productActions";
import { clearProductCreated } from "../../Redux/slices/productSlice";
import { clearError } from "../../Redux/slices/authSlice";

const NewProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: 0,
    seller: "",
    images: [],
  });
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProductCreated, error } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const handleInputChange = (e) =>
    setProductData({ ...productData, [e.target.name]: e.target.value });

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setProductData((prev) => ({
            ...prev,
            images: [...prev.images, file],
          }));
        }
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    });
  };

  console.log(productData.images);
  
  const removeImage = (indexToRemove) => {
    // Filter out the image and preview that need to be removed
    const updatedImages = productData.images.filter(
      (_, index) => index !== indexToRemove
    );
    const updatedPreviews = imagesPreview.filter(
      (_, index) => index !== indexToRemove
    );

    setProductData((prev) => ({ ...prev, images: updatedImages }));
    setImagesPreview(updatedPreviews);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key !== "images") formData.append(key, productData[key]);
    });
    productData.images.forEach((image) => formData.append("images", image));
    dispatch(createNewProduct(formData));
  };

  useEffect(() => {
    if (isProductCreated) {
      toast.success("Product Created Successfully!");
      navigate("/admin/products");
      dispatch(clearProductCreated());
     
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
     
    }
  }, [dispatch, isProductCreated, error, navigate]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/5 h-full md:fixed overflow-hidden">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 md:ml-[20%] px-4 overflow-y-auto h-screen md:mt-5">
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <h1 className="text-2xl font-bold mb-4">New Product</h1>

          {/* Two-column layout for input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "price", "stock", "seller"].map((field, index) => (
              <div key={field} className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                  htmlFor={`${field}_field`}
                >
                  {field}
                </label>
                <input
                  type={
                    field === "price" || field === "stock" ? "number" : "text"
                  }
                  id={`${field}_field`}
                  name={field}
                  value={productData[field]}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="category_field"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category_field"
                  name="category"
                  className="select select-bordered w-full"
                  onChange={handleInputChange}
                  value={productData.category}
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images
                </label>
                <input
                  type="file"
                  name="images"
                  className="file-input file-input-bordered w-full"
                  multiple
                  onChange={onImagesChange}
                />
                {/* Image preview section */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {imagesPreview.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-md border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description_field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description_field"
                name="description"
                rows="4"
                className="textarea textarea-bordered w-full"
                onChange={handleInputChange}
                value={productData.description}
              />
            </div>
          </div>
          <div className="md:flex md:justify-end ">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-1/5 py-2 mt-4 font-bold"
            >
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
