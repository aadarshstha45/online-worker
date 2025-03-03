import { Application } from "../database/models/application.model.js";
import { Job } from "../database/models/jobs.model.js";
import { User } from "../database/models/users.model.js";

export const allStats = async (req, res) => {
  const user = req.user;
  if (user.role !== "admin") {
    return res.status(403).json({
      message: "You must be an admin to view the stats",
      success: false,
    });
  }
  try {
    const users = await User.find({
      role: { $ne: "admin" },
    });
    const jobs = await Job.find();
    const applications = await Application.find();
    const stats = {
      totalUsers: users.length,
      totalJobs: jobs.length,
      totalApplications: applications.length,
    };

    return res.status(200).json({
      message: "Stats fetched successfully",
      success: true,
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
