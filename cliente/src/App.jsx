import React, { Suspense, useEffect, useState } from "react";
import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./router/PrivateRoutes";
import { PublicRoutes } from "./router/PublicRoutes";

export const App = () => {
  const [router, setRouter] = useState(null);

  useEffect(() => {
    setRouter(
      createBrowserRouter([...(true ? PrivateRoutes() : PublicRoutes())])
    );
  }, []);

  const theme = createTheme({
    palette: {
      black: {
        main: "#000000",
        light: "#333333",
        contrastText: "#FFFFFF",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        {router === null ? (
          <Suspense fallback={<CircularProgress />}></Suspense>
        ) : (
          <RouterProvider router={router} />
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
