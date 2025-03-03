import { Flex, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { appRoutes, authorizedRoutes, unauthorizedRoutes } from "./routes";
import {
  Authorities,
  getRole,
  useAuthentication,
} from "./services/service-auth";

const renderRoutes = (children, role) => {
  return children
    ?.filter((childRoute) => {
      // Include routes if they have no accessor or the role is included in the accessor
      return (
        !childRoute.accessor || (role && childRoute.accessor.includes(role))
      );
    })
    .map((childRoute, childIndex) => (
      <Route
        key={childIndex}
        path={childRoute.path}
        element={childRoute.element}
        index={childRoute.index}
      />
    ));
};

function App() {
  const {
    data: isAuthenticated,
    isPending: isAuthLoading,
    isError,
  } = useAuthentication();

  const { isAdmin, isCustomer, isWorker } = getRole();

  if (isAuthLoading && !isError) {
    return (
      <Flex h={"100dvh"} w={"100dvw"} justify={"center"} align={"center"}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
      />
      <BrowserRouter>
        <Routes>
          {appRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children?.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={child.path}
                  index={child.index}
                  element={child.element}
                />
              ))}
            </Route>
          ))}
          {isAuthenticated
            ? authorizedRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children &&
                    renderRoutes(
                      route.children,
                      isAdmin
                        ? Authorities.Admin
                        : isCustomer
                          ? Authorities.Customer
                          : isWorker
                            ? Authorities.Worker
                            : null
                    )}
                </Route>
              ))
            : unauthorizedRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}

          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
