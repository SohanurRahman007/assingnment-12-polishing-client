import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import ClassesPage from "../pages/ClassesPage/ClassesPage";

// Common Dashboard
import Statistics from "../pages/Dashboard/Common/Statistics";
import Profile from "../pages/Dashboard/Common/Profile";
import AllTrainers from "../pages/AllTrainerPage/AllTrainers";
import TrainerDetailsPage from "../pages/TrainerDetailsPage/TrainerDetailsPage";

// Admin
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AddClass from "../pages/Dashboard/Admin/AddClass";
import RoleRoute from "./RoleRoute";
// import AllTrainersPage from "../pages/AllTainerPage/AllTainerPage";
// import Newsletter from "../pages/Dashboard/Admin/Newsletter";
// import Balance from "../pages/Dashboard/Admin/Balance";

// Trainer
import AddSlot from "../pages/Dashboard/Trainer/AddSlot";
import ManageSlots from "../pages/Dashboard/Trainer/ManageSlots";
import AddForum from "../pages/Dashboard/Trainer/AddForum";
import ForumsPage from "../pages/Forum/ForumsPage";
// import AddForum from "../pages/Dashboard/Trainer/AddForum";

// Member
import ActivityLog from "../pages/Dashboard/Member/ActivityLog";
import BeATrainer from "../pages/BeATrainer/BeATrainer";
import AppliedTrainers from "../pages/Dashboard/Admin/AppliedTrainers";
import TrainerDetails from "../pages/Dashboard/Admin/TrainerDetails";
import TrainerBookingPage from "../pages/TrainerBookingPage/TrainerBookingPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
// import TrainerDetails from "../pages/TrainerDetails/TrainerDetails";
// import ActivityLog from "../pages/Dashboard/Member/ActivityLog";

export const router = createBrowserRouter([
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
        path: "classes",
        element: <ClassesPage />,
      },
      {
        path: "/trainers",
        element: <AllTrainers />,
      },

      {
        path: "/trainer/:id",
        element: <TrainerDetailsPage />,
      },

      {
        path: "/book-trainer/:id/:slot",
        element: <TrainerBookingPage />,
      },

      {
        path: "forum",
        element: <ForumsPage />,
      },

      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Statistics />,
      },

      // ==================== Admin Routes ====================
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "add-class",
        element: (
          <RoleRoute allowedRoles="admin">
            <AddClass />
          </RoleRoute>
        ),
      },

      {
        path: "applied-trainers",
        element: <AppliedTrainers />,
      },
      {
        path: "applied-trainer-details/:id",
        element: <TrainerDetails />,
      },
      // {
      //   path: "newsletter",
      //   element: <Newsletter />,
      // },
      // {
      //   path: "balance",
      //   element: <Balance />,
      // },

      // ==================== Trainer Routes ====================
      {
        path: "add-slot",
        element: (
          <RoleRoute allowedRoles="trainer">
            <AddSlot />
          </RoleRoute>
        ),
      },
      {
        path: "manage-slots",
        element: (
          <RoleRoute allowedRoles="trainer">
            <ManageSlots />
          </RoleRoute>
        ),
      },
      {
        path: "add-forum",
        element: (
          <RoleRoute allowedRoles={["admin", "trainer"]}>
            <AddForum />
          </RoleRoute>
        ),
      },

      // ==================== Member Routes ====================
      // {
      //   path: "booked-trainer",
      //   element: <BookedTrainer />,
      // },
      {
        path: "activity-log",
        element: <ActivityLog />,
      },
      {
        path: "be-a-trainer",
        element: (
          <PrivateRoute>
            <BeATrainer />
          </PrivateRoute>
        ),
      },

      // ==================== Common Routes ====================
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
