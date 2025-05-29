import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import MainLayout from './Component/MainLayout.jsx';
import Home from './Component/Home.jsx';
import Login from './Component/Login.jsx';
import Register from './Component/Register.jsx';

import AddTask from './Component/AddTask.jsx';
import MyAddTask from './Component/MyAddTask.jsx';
import AuthProvider from './Component/AuthProvider.jsx';
import UpdatePage from './Component/UpdatePage.jsx';
import PrivateRoute from './Component/PrivateRoute.jsx';
import AddGoal from './Component/AddGoal.jsx';
import MyAddGoal from './Component/MyAddGoal.jsx';
import DailyTask from './Component/DailyTask.jsx';
import GoalUpdate from './Component/GoalUpdate.jsx';
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      
      {
        path: "/addTask",
        element: <PrivateRoute><AddTask></AddTask></PrivateRoute>,
      },
      {
        path: "/dailyTask",
        element: <PrivateRoute><DailyTask></DailyTask></PrivateRoute>,
      },
      {
        path: "/addGoal",
        element: <PrivateRoute><AddGoal></AddGoal></PrivateRoute>,
      },
      {
        path: "/myAddTask",
        element: <PrivateRoute><MyAddTask></MyAddTask></PrivateRoute>,
      },
      {
        path: "/myAddGoal",
        element: <PrivateRoute><MyAddGoal></MyAddGoal></PrivateRoute>,
      },
      {
        path: "/update/:id",
        element: <PrivateRoute><UpdatePage></UpdatePage></PrivateRoute>,
      },
      {
        path: "/goalUpdatePage/:id",
        element: <PrivateRoute><GoalUpdate></GoalUpdate></PrivateRoute>,
      },
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
