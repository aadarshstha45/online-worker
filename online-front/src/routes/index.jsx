import LayoutWrapper from "@/layouts";
import AdminWrapper from "@/layouts/AdminLayout";
import { lazy } from "react";
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Services = lazy(() => import("@/pages/Services"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const SignUp = lazy(() => import("@/pages/Auth/SignUp"));
const PostJob = lazy(() => import("@/pages/Customer/Jobs/Form"));
const PostedJobs = lazy(() => import("@/pages/Customer/Jobs"));
const Dashboard = lazy(() => import("@/pages/Admin/Dashboard"));
const Users = lazy(() => import("@/pages/Admin/Users"));
const Applications = lazy(() => import("@/pages/Admin/Applications"));
const Jobs = lazy(() => import("@/pages/Jobs"));
const WorkerApplications = lazy(() => import("@/pages/Workers/Applications"));
const AdminJobs = lazy(() => import("@/pages/Admin/Jobs"));
const CustomerApplications = lazy(
  () => import("@/pages/Customer/Applications")
);
const Profile = lazy(() => import("@/pages/Profile"));
const authorizedRoutes = [
  {
    path: "/admin",
    element: <AdminWrapper />,
    accessor: ["admin"],
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "jobs",
        element: <AdminJobs />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        path: "/post-job",
        element: <PostJob />,
        accessor: ["customer"],
      },
      {
        path: "/edit-job/:id",
        element: <PostJob />,
        accessor: ["customer"],
      },
      {
        path: "/my-jobs",
        element: <PostedJobs />,
        accessor: ["customer"],
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "my-applications",
        element: <WorkerApplications />,
        accessor: ["worker"],
      },
      {
        path: "job-applications",
        element: <CustomerApplications />,
        accessor: ["customer"],
      },
      {
        path: "profile",
        element: <Profile />,
        accessor: ["customer", "worker"],
      },
    ],
  },
];

const unauthorizedRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];

const appRoutes = [
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "services",
        element: <Services />,
      },
    ],
  },
];

export { appRoutes, authorizedRoutes, unauthorizedRoutes };
