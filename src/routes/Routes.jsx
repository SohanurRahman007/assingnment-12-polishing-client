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
import AddForum from "../pages/Dashboard/AddForum";
// import AddForum from "../pages/Dashboard/Trainer/AddForum";

// Member
// import BookedTrainer from "../pages/Dashboard/Member/BookedTrainer";
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
      // {
      //   path: "/trainers",
      //   element: <AllTrainersPage />,
      // },
      // {
      //   path: "/trainers/:id",
      //   element: (
      //     <PrivateRoute>
      //       <TrainerDetailsPage />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/booking/:id",
      //   element: (
      //     <PrivateRoute>
      //       <BookingPage />
      //     </PrivateRoute>
      //   ),
      // },
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
          <RoleRoute allowedRole="admin">
            <AddClass />
          </RoleRoute>
        ),
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
          <RoleRoute allowedRole="trainer">
            <AddSlot />
          </RoleRoute>
        ),
      },
      {
        path: "manage-slots",
        element: (
          <RoleRoute allowedRole="trainer">
            <ManageSlots />
          </RoleRoute>
        ),
      },
      {
        path: "add-forum",
        element: <AddForum />,
      },

      // ==================== Member Routes ====================
      // {
      //   path: "booked-trainer",
      //   element: <BookedTrainer />,
      // },
      // {
      //   path: "activity-log",
      //   element: <ActivityLog />,
      // },

      // ==================== Common Routes ====================
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
