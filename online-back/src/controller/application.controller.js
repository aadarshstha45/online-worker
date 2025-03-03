import { Application } from "../database/models/application.model.js";
import { Job } from "../database/models/jobs.model.js";

const addApplication = async (req, res) => {
  const { job } = req.body;
  const user = req.user;
  if (user.role !== "worker") {
    return res.status(403).json({
      message: "You must be a worker to apply for a job",
      success: false,
    });
  }

  const jobStatus = await Job.findById(job);
  if (!jobStatus || jobStatus.status !== "open") {
    return res.status(400).json({
      message: "Job is not available",
      success: false,
    });
  }

  const existingApplication = await Application.findOne({
    job,
    applicant: user._id,
  });
  if (existingApplication) {
    return res.status(400).json({
      message: "You have already applied for this job",
      success: false,
    });
  }

  try {
    const application = await Application.create({
      job,
      applicant: user._id,
    });

    return res.status(201).json({
      message: "Application created successfully",
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
const getAllApplications = async (req, res) => {
  const { page, size } = req.query;
  const user = req.user;
  if (user.role !== "admin") {
    return res.status(403).json({
      message: "You must be an admin to view all applications",
      success: false,
    });
  }

  try {
    const totalApplications = await Application.find();
    const applications = await Application.find()
      .sort({ createdAt: -1 })

      .limit(size * 1)
      .skip((page - 1) * size)
      .populate("job")
      .exec();

    return res.status(200).json({
      message: "Applications fetched successfully",
      success: true,
      data: applications,
      pagination: {
        total: totalApplications.length,
        perPage: +size,
        currentPage: +page,
        lastPage: Math.ceil(totalApplications.length / size),
      },
    });
  } catch (error) {
    return res.status(404).json({
      message: "No applications found",
      success: false,
      error: error.message,
    });
  }
};

const getMyApplications = async (req, res) => {
  const { page, size } = req.query;
  const user = req.user;
  try {
    let applications;
    let myApplications;
    if (user.role === "customer") {
      const createdBy = user._id;
      const jobs = await Job.find({ createdBy });
      applications = await Application.find({
        job: { $in: jobs.map((job) => job._id) },
      }).populate("job");
      myApplications = await Application.find({
        job: { $in: jobs.map((job) => job._id) },
      })
        .sort({ createdAt: -1 })
        .limit(size * 1)
        .skip((page - 1) * size)
        .populate("job")
        .populate("applicant")
        .exec();
    } else if (user.role === "worker") {
      const applicant = user._id;
      applications = await Application.find({ applicant });
      myApplications = await Application.find({ applicant })
        .sort({ createdAt: -1 })

        .limit(size * 1)
        .skip((page - 1) * size)
        .populate({
          path: "job",
          populate: {
            path: "createdBy",
          },
        })
        .exec();
    } else {
      return res.status(403).json({
        message: "Invalid role",
        success: false,
      });
    }

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No applications found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applications fetched successfully",
      success: true,
      data: myApplications,
      pagination: {
        total: applications.length,
        perPage: +size,
        currentPage: +page,
        lastPage: Math.ceil(applications.length / size),
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

const updateApplication = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = req.user;
  if (user.role !== "customer") {
    return res.status(403).json({
      message: "You must be an customer to update an application",
      success: false,
    });
  }

  try {
    const application = await Application.findByIdAndUpdate(id, {
      status,
    });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    if (status === "accepted") {
      await Job.findByIdAndUpdate(application.job, { status: "closed" });
    }

    return res.status(200).json({
      message: "Application updated successfully",
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export {
  addApplication,
  getAllApplications,
  getMyApplications,
  updateApplication,
};
