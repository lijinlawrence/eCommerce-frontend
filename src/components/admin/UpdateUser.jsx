import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError } from "../../Redux/slices/authSlice";
import { clearUserUpdated } from "../../Redux/slices/userSlice";
import { getUser, updateUser } from "../../Redux/actions/userActions"; // Ensure updateUser is imported

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id: userId } = useParams(); // Correct parameter naming

  const { loading, isUserUpdated, error, user } = useSelector(
    (state) => state.userState
  );
  const { user: authuser } = useSelector((state) => state.authState);
  console.log(authuser._id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // to check is admin
  const isAdmin =
    user && authuser && user._id === authuser._id && authuser.role === "admin";

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch the update action here
    dispatch(updateUser(userId, { name, email, role }));
  };

  useEffect(() => {
    if (!user || (user && user._id !== userId)) {
      dispatch(getUser(userId));
    } else {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "");
    }

    if (isUserUpdated) {
      toast.success("User Updated Successfully!");
      navigate("/admin/users"); // Correct the navigation path
      dispatch(clearUserUpdated());
      return;
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
      return;
    }
  }, [dispatch, isUserUpdated, error, navigate, userId, user]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/5 h-full md:fixed overflow-hidden">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 md:ml-[20%] px-4 overflow-y-auto h-screen md:mt-5">
        <form onSubmit={submitHandler}>
          <h1 className="text-2xl font-bold mb-4">Update User</h1>
          {/* Two-column layout for input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="name_field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name_field"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email_field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="role_field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <select
                id="role_field"
                className="select select-bordered w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isAdmin}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="md:flex md:justify-end">
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

export default UpdateUser;
