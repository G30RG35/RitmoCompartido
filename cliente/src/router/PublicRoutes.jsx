import { Navigate } from "react-router-dom";

import { Inicio } from "../Paginas/Inicio/Inicio";
import { UnirseParty } from "../Paginas/UnirseParty/UnirseParty";
import { Prueba } from "../Paginas/Prueba/Prueba";

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
          path: "/prueba",
          element: <Prueba/> ,
        },
        {
          path: "*",
          element: <Inicio />,
        },
      ],
    },
  ];
};