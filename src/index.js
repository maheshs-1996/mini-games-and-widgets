import { lazy, Suspense } from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Wordle = lazy(() => import("./Widgets/Wordle"));
const Folder = lazy(() => import("./Widgets/Folder"));
const BasketComponent = lazy(() => import("./Widgets/Basket"));
const StopWatch = lazy(() => import("./Widgets/Stopwatch"));
const Database = lazy(() => import("./Widgets/Database"));
const XOX = lazy(() => import("./Widgets/XOX"));
const OTPInput = lazy(() => import("./Widgets/OTPInput"));
const Home = lazy(() => import("./Widgets/Home"));

const paths = {
  Wordle: "/wordle",
  OTPInput: "/otp-input",
  Database: "/database",
  Folder: "/folder",
  BasketComponent: "/basket",
  Stopwatch: "/stopwatch",
  XOX: "/xox",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <Home paths={paths} />
      </Suspense>
    ),
  },
  {
    path: paths.Wordle,
    element: (
      <Suspense>
        <Wordle guesses={6} wordLength={5} />
      </Suspense>
    ),
  },
  {
    path: paths.OTPInput,
    element: (
      <Suspense>
        <OTPInput length={6} />
      </Suspense>
    ),
  },
  {
    path: paths.Database,
    element: (
      <Suspense>
        <Database />
      </Suspense>
    ),
  },
  {
    path: paths.Folder,
    element: (
      <Suspense>
        <Folder />
      </Suspense>
    ),
  },
  {
    path: paths.BasketComponent,
    element: (
      <Suspense>
        <BasketComponent />
      </Suspense>
    ),
  },
  {
    path: paths.Stopwatch,
    element: (
      <Suspense>
        <StopWatch />
      </Suspense>
    ),
  },
  {
    path: paths.XOX,
    element: (
      <Suspense>
        <XOX length={5} />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
