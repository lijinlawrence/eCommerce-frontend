import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError } from "../../Redux/slices/authSlice";
import { clearProductupdated } from "../../Redux/slices/productSlice";
import { getProduct, updateProduct } from "../../Redux/actions/productActions";

const UpdateProduct = () => {
  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );

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
  const [imagesCleared, setImagesCleared] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

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

  const clearAllImages = () => {
    setImagesPreview([]);
    setProductData((prev) => ({ ...prev, images: [] }));
    setImagesCleared(true);  // Set imagesCleared to true when clearing all images
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key !== "images") formData.append(key, productData[key]);
    });
    productData.images.forEach((image) => formData.append("images", image));
    formData.append("imagesCleared", imagesCleared);
    dispatch(updateProduct(id, formData));
  };

  useEffect(() => {
    // Fetch product data when component mounts if not already fetched
    if (!product || (product && product._id !== id)) {
      dispatch(getProduct(id));
    } else {
      setProductData({
        name: product?.name || "",
        price: product?.price || "",
        description: product?.description || "",
        category: product?.category || "",
        stock: product?.stock || 0,
        seller: product?.seller || "",
        images: product?.images || [],
      });

      // Assuming product.images is an array of URLs
      const initialPreviews = product.images.map((img) => img.image || img); // Adjust as needed based on the structure of your images
      setImagesPreview(initialPreviews);
    }

    // anothor way 
//     let images = [];
//     product.images.forEach( image => {
//         images.push(image.image)
//     });
//     setImagesPreview(images)
// }



    //    imagesPreview.forEach((image) => console.log(image.image));

    if (isProductUpdated) {
      toast.success("Product Updated Successfully!");
      navigate("/admin/products");
      dispatch(clearProductupdated());
      return;
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
      return;
    }
  }, [dispatch, isProductUpdated, error, navigate, id, product]);

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
                  <button
                  type="button"
                  onClick={clearAllImages}
                  className="btn btn-warning mt-2"
                >
                  Clear All Images
                </button>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
