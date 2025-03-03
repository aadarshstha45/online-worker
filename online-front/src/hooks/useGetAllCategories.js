import { useEffect } from "react";
import axios from "axios";
import { CATEGORY_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAllCategories } from "../features/categorySlice";

const useGetAllCategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get(`${CATEGORY_API_END_POINT}/`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllCategories(res.data.categories));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useGetAllCategories;
