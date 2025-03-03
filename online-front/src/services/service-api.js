const auth = {
  login: "auth/login",
  register: "auth/register",
};

const jobs = {
  postJob: "job/create",
  customerJobs: ({ page = 1, size = 10 }) =>
    `job/customer?page=${page}&size=${size}`,
  byId: "job/:id",
  all: ({ page = 1, size = 10 }) => `job/allJobs?page=${page}&size=${size}`,
};

const admin = {
  stats: "stats",
  users: ({ page = 1, size = 10 }) => `users?page=${page}&size=${size}`,
  allApplications: ({ page = 1, size = 10 }) =>
    `application/all?page=${page}&size=${size}`,
};

const applications = {
  myApplications: ({ page = 1, size = 10 }) =>
    `application/myApplications?page=${page}&size=${size}`,
  sendApplication: "application/create",
  updateApplication: "application/update/:id",
};

export const api = {
  auth,
  jobs,
  admin,
  applications,
};
