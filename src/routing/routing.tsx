import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../view/layouts/AppLayout";
import { StartPage } from "../view/pages/StartPage/startPage";
import { CheckIdProvider } from "../common/providers/CheckIdProvider";
import ManagePageRouter from "../view/pages/ManagePageRouter/managePageRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <CheckIdProvider>
            {" "}
            <StartPage />{" "}
          </CheckIdProvider>
        ),
      },
      {
        path: "/:pointId/:pageId",
        element: (
          <CheckIdProvider>
            <ManagePageRouter />
          </CheckIdProvider>
        ),
      },
    ],
  },
]);
