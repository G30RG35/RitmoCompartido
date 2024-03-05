
import { CrearParty } from "../Paginas/CrearParty/CrearParty";
import { Error404 } from "../Paginas/Error404/Error404";
import { Inicio } from "../Paginas/Inicio/Inicio";
import { UnirseParty } from "../Paginas/UnirseParty/UnirseParty";


export const PrivateRoutes = () => {
  return [
    {
      // path: "/",
    //   element: <PrivateRoutesLayout />, // Layout para toda la página
      children: [
        {
          path: "/",
          element: <Inicio />,
        },
        {
          path: "/crear-party",
          element: <CrearParty/> ,
        },
        {
          path: "/unirse-party",
          element: <UnirseParty/> ,
        },
        {
          path: "*",
          element: <Error404/>,
        }
      ],
    },
  ];
};
