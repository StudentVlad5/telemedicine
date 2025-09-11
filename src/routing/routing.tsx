import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../view/layouts/AppLayout";
import { StartPage } from "../view/components/StartPage/startPage";
import { CheckIdProvider } from "../common/providers/CheckIdProvider";
import { CallsPage } from "../view/components/CallsPage/callPage";
import { CallDetails } from "../view/components/CallDetails/callDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <CheckIdProvider>
            <StartPage />
          </CheckIdProvider>
        ),
      },
      {
        path: "/calls",
        element: (
          <CheckIdProvider>
            <CallsPage />
          </CheckIdProvider>
        ),
      },
      {
        path: "/calls/:callId",
        element: (
          <CheckIdProvider>
            <div>
              <CallDetails />
            </div>
          </CheckIdProvider>
        ),
      },
      {
        path: "*",
        element: (
          <CheckIdProvider>
            <StartPage />
          </CheckIdProvider>
        ),
      },
    ],
  },
]);
