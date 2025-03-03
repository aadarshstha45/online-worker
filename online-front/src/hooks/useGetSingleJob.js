import { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../features/jobSlice";
import { useParams } from "react-router-dom";

const useGetSingleJob = () => {
  const params = useParams();
  const jobId = params.id;
  const { user } = useSelector((state) => state.auth); // Get all jobs from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/job/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
};

export default useGetSingleJob;
