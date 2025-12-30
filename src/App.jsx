import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./layout/Applayout.jsx";
import Landingpage from "./pages/Landingpage.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Joblistening from "./pages/Joblistening.jsx";
import Job from "./pages/Job.jsx";
import Myjobs from "./pages/Myjobs.jsx";
import Savedjobs from "./pages/Savedjobs.jsx";
import Postjobs from "./pages/Postjobs.jsx";
import { ThemeProvider } from "./components/Themeprovider";
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
        path: "/job",
        element: (
          <Protectedroute>
            <Job />
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
        path: "/savedjobs",
        element: (
          <Protectedroute>
            <Savedjobs />
          </Protectedroute>
        ),
      },

      {
        path: "/postjobs",
        element: (
          <Protectedroute>
            <Postjobs />
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
