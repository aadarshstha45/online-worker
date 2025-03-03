import { useEffect } from "react";
import axios from "axios";
import { CATEGORY_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCategory } from "../features/categorySlice";

const useGetCategoryById = (categoryId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCategory = async () => {
      try {
        const res = await axios.get(`${CATEGORY_API_END_POINT}/category/${categoryId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleCategory(res.data.category));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCategory();
  }, [categoryId, dispatch]);
};

export default useGetCategoryById;
