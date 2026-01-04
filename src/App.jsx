import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./layout/Applayout.jsx";
import Landingpage from "./pages/Landingpage.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Joblistening from "./pages/Joblistening.jsx";
import Jobpage from "./pages/Job.jsx";
import Postjob from "./pages/Postjobs.jsx";
import Savedjobs from "./pages/Savedjobs.jsx";
import Myjobs from "./pages/Myjobs.jsx";
import { ThemeProvider } from "./components/ThemeProvider";
import Protectedroute from "./components/ui/Protectedroute.jsx";

const routes = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      { path: "/", element: <Landingpage /> },

      {
        path: "/onboarding",
        element: (
          <Protectedroute>
            <Onboarding />
          </Protectedroute>
        ),
      },

      {
        path: "/jobs",
        element: (
          <Protectedroute>
            <Joblistening />
          </Protectedroute>
        ),
      },

      {
        path: "/job/:id",
        element: (
          <Protectedroute>
            <Jobpage />
          </Protectedroute>
        ),
      },

      {
        path: "/myjobs",
        element: (
          <Protectedroute>
            <Myjobs />
          </Protectedroute>
        ),
      },

      {
        path: "/postjobs",
        element: (
          <Protectedroute>
            <Postjob />
          </Protectedroute>
        ),
      },

      {
        path: "/savedjobs",
        element: (
          <Protectedroute>
            <Savedjobs />
          </Protectedroute>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
};

export default App;
