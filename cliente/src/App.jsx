import React, { Suspense, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./router/PrivateRoutes";
import { PublicRoutes } from "./router/PublicRoutes";
// import io from "socket.io-client"

// const socket = io("http://localhost:3000")

export const App = () => {
  const [router, setRouter] = useState(null);

  useEffect(() => {
    setRouter(createBrowserRouter([
      ...(true ? PrivateRoutes() : PublicRoutes()),
   ]));
  }, [])



  return (
    <>
      {
        router === null
        ? <Suspense fallback={<CircularProgress />}></Suspense>
        : <RouterProvider router={router}  />
      }
    </>
  );
};

export default App;
