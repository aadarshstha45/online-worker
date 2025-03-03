import { useEffect } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setApplicants } from "../features/applicationSlice";

const useGetApplicants = () => {
  const params = useParams();
  const applicantId = params.id;
  const { user } = useSelector((state) => state.auth); // Get all jobs from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/applicants/${applicantId}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setApplicants(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, [applicantId, dispatch, user?._id]);
};

export default useGetApplicants;
