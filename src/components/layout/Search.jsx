import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();
  const location = useLocation()

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyWord.trim()) {
      navigate(`/search/${keyWord}`);
    } else {
      navigate('/');
    }
  };

  const clearKeyword = ()=>{
    setKeyWord("")
  }

  useEffect(()=>{
    if(location.pathname === '/'){
      clearKeyword()
    }
  },[location])



  return (
    <div className="flex justify-center items-center md:mt-4">
      <form onSubmit={searchHandler} className="">
        <label className="input input-bordered flex items-center md:w-full input-sm md:input-md ">
          <input
            type="text"
            className=""
            placeholder="Enter Product name"
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
          />
          <button type="submit" className="p-2 bg-yellow-500 text-white rounded-r-md">
            <FaSearch />
          </button>
        </label>
      </form>
    </div>
  );
};

export default Search;
