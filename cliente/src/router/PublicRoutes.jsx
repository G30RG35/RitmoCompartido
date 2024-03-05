import { Navigate } from "react-router-dom";

import { Inicio } from "../Paginas/Inicio/Inicio";
import { UnirseParty } from "../Paginas/UnirseParty/UnirseParty";

export const PublicRoutes = () => {

  return [
    {
    //   element: <PublicRoutesLayout />,
      children: [
        {
          path: "/Inicio",
          element: <Inicio />,
        },
        {
          path: "/unirse-party",
          element: <UnirseParty/> ,
        },

        {
          path: "*",
          element: <Inicio />,
        },
      ],
    },
  ];
};