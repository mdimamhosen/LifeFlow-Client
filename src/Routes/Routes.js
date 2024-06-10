import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import Search from "../Pages/Search";
import DontaionRequests from "../Pages/DontaionRequests";
import DashBoard from "../Layout/DashBoard";
import DonorHome from "../Pages/Dashboard/Donor/DonorHome";
import CreateRequestToDonate from "../Pages/Dashboard/Donor/CreateDonationReq";
import DonorProfile from "../Pages/Dashboard/Donor/DonorProfile";
import RequestedDonationDetails from "../Pages/Dashboard/Donor/RequestedDonationDetails ";
import DonationDetails from "../Pages/Dashboard/Donor/DonationDetails";
import MyAllDonations from "../Pages/Dashboard/Donor/MyDonationRequest";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import AdminProfile from "../Pages/Dashboard/Donor/AdminProfile";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AllDonationRequest from "../Pages/Dashboard/Admin/AllDonationRequest";
import ContentManagement from "../Pages/Dashboard/Admin/ContentManagement";
import AddBlog from "../Pages/Dashboard/Admin/AddBlog";
import DetailedBlog from "../Pages/Dashboard/Admin/DetailedBlog";
import EditBlog from "../Pages/Dashboard/Admin/EditBlog";
import VolunteerHome from "../Pages/Dashboard/Volunteer/VolunteerHome";
import VolunteerProfile from "../Pages/Dashboard/Volunteer/VolunteerProfile";
import Blog from "../Pages/Blog";
import DetailBlog from "../Pages/DetailBlog";
import ContactUs from "../Pages/ContactUs";
import Donation from "../Pages/Donation";
import ErrorPage from "../Pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import DonorRoute from "./DonorRoute";
import AdminRoute from "./AdminRoute";
import VolunteerRoute from "./VolunteerRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/donation-requests",
        element: <DontaionRequests />,
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: (
          <PrivateRoute>
            <DetailBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/donation-requests/:id",
        element: (
          <PrivateRoute>
            <DonationDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/giveDonation",
        element: (
          <PrivateRoute>
            <Donation />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "donorHome",
        element: (
          <DonorRoute>
            <DonorHome />
          </DonorRoute>
        ),
      },
      {
        path: "create-donation-request",
        element: (
          <DonorRoute>
            <CreateRequestToDonate />
          </DonorRoute>
        ),
      },
      {
        path: "donorProfile",
        element: (
          <DonorRoute>
            <DonorProfile />
          </DonorRoute>
        ),
      },
      {
        path: "/dashboard/EditDonationRequest/:id",
        element: <RequestedDonationDetails />,
      },
      {
        path: "/dashboard/RequestedDonationDetails/:id",
        element: <DonationDetails />,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyAllDonations />,
      },
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: <AllDonationRequest />,
      },
      {
        path: "content-management",
        element: <ContentManagement />,
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog />,
      },
      {
        path: "content-management/viewBlog/:id",
        element: <DetailedBlog />,
      },
      {
        path: "content-management/edit-blog/:id",
        element: (
          <AdminRoute>
            <EditBlog />
          </AdminRoute>
        ),
      },
      {
        path: "volunteerHome",
        element: (
          <VolunteerRoute>
            <VolunteerHome />
          </VolunteerRoute>
        ),
      },
      {
        path: "volunteerProfile",
        element: (
          <VolunteerRoute>
            <VolunteerProfile />
          </VolunteerRoute>
        ),
      },
    ],
  },
]);
