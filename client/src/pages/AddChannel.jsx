import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function AddChannel({ onClose, id }) {


  const [name, setname] = useState(null);
  const [price, setprice] = useState(null);
  const [description, setdescription] = useState(null);
  const [CategoryId, setCategoryId] = useState(null);
  const [imgUrl, setimgUrl] = useState(null);


  async function fetchOneCuisine(id) {
    try {
      const response = await axios.get(`https://fase2_c1.raframa.my.id/pub/cuisine/${id}`)
      let cuisine = response.data
      console.log(cuisine)
      setname(cuisine.name)
      setprice(cuisine.price)
      setdescription(cuisine.description)
      setCategoryId(cuisine.CategoryId)
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
    }
  }

  const [categories, setCategories] = useState([])
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`https://fase2_c1.raframa.my.id/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`
        }
      })
      console.log(response.data)
      setCategories(response.data)
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
    }
  }



  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchOneCuisine(id)
    }
  }, []);


  async function handlePostCuisine(e) {
    e.preventDefault();

    try {
      const cuisineData = {
      name,
      price,
      imgUrl,
      description,
      CategoryId
    };
    
    let response;
    if (id) {
      response = await axios.put(`https://fase2_c1.raframa.my.id//cuisine/${id}`, cuisineData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
    } else {
      response = await axios.post('https://fase2_c1.raframa.my.id//cuisine', cuisineData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
    }
    
    console.log(response.data);
    onClose();
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Cuisine</h3>
          <button
            onClick={onClose}
            className="bg-red-700 text-white hover:text-gray-700"
          >
            <span>X</span>
          </button>
        </div>
        {/* Modal body */}
        <form className="p-4 md:p-5" onSubmit={handlePostCuisine}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required=""
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image
              </label>
              <input
                type="file"
                name="imgUrl"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="upload image"
                accept="image/*"
                value={imgUrl}
                onChange={(e) => setimgUrl(e.target.value)}
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="30000"
                required=""
                value={price}
                onChange={(e) => setprice(e.target.value)}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category" name='CategoryId'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={CategoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option selected="">Select category</option>
                {categories.map(category => (

                  <option value={category.id} >{category.name}</option>

                ))}

              </select>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Description
              </label>
              <textarea
                id="description"
                name='description'
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write product description here"
                defaultValue={""}
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add new product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddChannel