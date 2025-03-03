import { Job } from "../database/models/jobs.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getDataUri } from "../utils/dataUri.js";

const createJob = async (req, res) => {
  const user = req.user;
  if (user.role !== "customer") {
    return res.status(403).json({
      message: "You must be a customer to create a job",
      success: false,
    });
  }
  const {
    title,
    date,
    startTime,
    endTime,
    proposedFees,
    location,
    problemDesc,
    status,
    // categoryId,
  } = req.body;

  try {
    const files = req.files; // req.files contains an array of uploaded files
    const createdBy = req.user._id;
    let cloudResponses = [];
    let imageUrls = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const fileUri = getDataUri(file);
        const uploadResponse = await cloudinary.uploader.upload(
          fileUri.content
        );
        cloudResponses.push(uploadResponse);
      }
      imageUrls = cloudResponses.map((response) => response.secure_url);
    }
    await Job.create({
      title,
      date,
      startTime,
      endTime,
      proposedFees,
      location,
      problemDesc,
      image: imageUrls.length ? imageUrls : [],
      createdBy,
      // categoryId,
      status,
    });

    return res.status(201).json({
      message: "Job created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const updateJob = async (req, res) => {
  const user = req.user;

  if (user.role !== "customer") {
    return res.status(403).json({
      message: "You must be a customer to update a job",
      success: false,
    });
  }

  const {
    title,
    date,
    startTime,
    endTime,
    proposedFees,
    problemDesc,
    location,
  } = req.body;

  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this job",
        success: false,
      });
    }

    const files = req.files; // req.files contains an array of uploaded files
    let cloudResponses = [];
    let imageUrls = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const fileUri = getDataUri(file);
        const uploadResponse = await cloudinary.uploader.upload(
          fileUri.content
        );
        cloudResponses.push(uploadResponse);
      }
      imageUrls = cloudResponses.map((response) => response.secure_url);
    }

    await Job.findByIdAndUpdate(req.params.id, {
      title,
      date,
      startTime,
      endTime,
      proposedFees,
      problemDesc,
      location,
      image: imageUrls.length ? imageUrls : job.image || [],
    });

    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
const getCustomerJobs = async (req, res) => {
  const { page, size } = req.query;
  try {
    const createdBy = req.user._id;
    const allJobs = await Job.find({ createdBy });
    const jobs = await Job.find({ createdBy, status: "open" })
      .sort({ createdAt: -1 })

      .limit(size * 1)
      .skip((page - 1) * size)
      .exec();

    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      data: jobs,
      pagination: {
        total: allJobs.length,
        perPage: +size,
        currentPage: +page,
        lastPage: Math.ceil(allJobs.length / size),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const getAllJobs = async (req, res) => {
  const { page, size } = req.query;
  try {
    const allJobs = await Job.find();
    const jobs = await Job.find()
      .sort({ createdAt: -1 })

      .limit(size * 1)
      .skip((page - 1) * size)
      .populate("createdBy")
      .exec();

    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      data: jobs,
      pagination: {
        total: allJobs.length,
        perPage: +size,
        currentPage: +page,
        lastPage: Math.ceil(allJobs.length / size),
      },
    });
  } catch (error) {
    return res.status(404).json({
      message: "No jobs found",
      success: false,
      error: error.message,
    });
  }
};

const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    return res.status(200).json({
      message: "Job fetched successfully",
      success: true,
      data: job,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Job not found",
      success: false,
      error: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this job",
        success: false,
      });
    }
    await Job.findByIdAndUpdate(req.params.id, { status: "closed" });

    return res.status(200).json({
      message: "Job closed successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
export { createJob, deleteJob, getAllJobs, getCustomerJobs, getJob, updateJob };
