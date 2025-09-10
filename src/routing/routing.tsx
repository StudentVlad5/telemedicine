import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../view/layouts/AppLayout";
import { StartPage } from "../view/components/StartPage/startPage";
import { CheckIdProvider } from "../common/providers/CheckIdProvider";
import { RequestPage } from "../view/components/RequestPage/requestPage";
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
        path: "/request",
        element: (
          <CheckIdProvider>
            <RequestPage />
          </CheckIdProvider>
        ),
      },
      {
        path: "/request/:callId",
        element: (
          <CheckIdProvider>
            <div>
              <CallDetails />
            </div>
          </CheckIdProvider>
        ),
      },
    ],
  },
]);
