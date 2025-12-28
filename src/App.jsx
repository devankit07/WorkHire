import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Applayout from "./layout/Applayout.jsx"
import Landingpage from "./pages/Landingpage.jsx"
import Onboarding from "./pages/Onboarding.jsx";
import Joblistening from "./pages/Joblistening.jsx";
import Job from "./pages/Job.jsx";
import Myjobs from "./pages/Myjobs.jsx";
import Savedjobs from "./pages/Savedjobs.jsx";
import Postjobs from "./pages/Postjobs.jsx";
import { ThemeProvider } from "./components/Themeprovider";



const routes = createBrowserRouter([
  {
    element:<Applayout/>,
    children:[
      {
        path:"/",
        element:<Landingpage/>
      },
      {
        path:"/Onboarding",
        element:<Onboarding/>
      },
      {
        path:"/Joblistening",
        element:<Joblistening/>
      },
      {
        path:"/Job",
        element:<Job/>
      },
      {
        path:"/Myjob",
        element:<Myjobs/>
      },
      {
        path:"/SavedJobs",
        element:<Savedjobs/>
      },
      {
        path:"/Postjobs",
        element:<Postjobs/>
      },
    ]
  }
])


const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
};


export default App
