import { Suspense, useEffect, useState } from "react";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { appRoutes } from "./appRoutes";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthenticated,
  setUser,
  setWasLoggedOutManually,
  unsetUser,
} from "./features/auth/authorizationSlice";
import { hideOverlay, showOverlay } from "./features/overlay/overlaySlice";
import Feedback from "./components/Feedback";
import { jwtDecode } from "jwt-decode";
import { resetLogout } from "./features/auth/logoutUserSlice";
import getUser from "./utils/getUser";
import scrollToTop from "./utils/scrollTop";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, wasLoggedOutManually } = useSelector(
    (state) => state.authorization
  );

  const navigate = useNavigate();
  const location = useLocation();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [loading, setLoading] = useState(true);


  const { error, message } = useSelector((state) => state.logout);

  useEffect(() => {
   if (isAuthenticated) {
    const fetchUser = async () => {
      const getUserResult = await getUser();

      if (getUserResult.success) {

        dispatch(setUser(getUserResult.user.user));
      }
    };

    fetchUser();
   }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    let timer;

    if (message || error) {
      timer = setTimeout(() => {
        if (message) {
          dispatch(resetLogout());
          dispatch(setIsAuthenticated(false));
          dispatch(setWasLoggedOutManually(false));
          localStorage.removeItem("MbPeShVmY");
          dispatch(unsetUser());
          navigate("/login");
        } else if (error) {
          dispatch(resetLogout());
        }
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [dispatch, error, message, navigate]);

  useEffect(() => {
    const storedToken = localStorage.getItem("MbPeShVmY");
    const now = Math.floor(Date.now() / 1000);

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);

        if (decoded.exp > now) {
          dispatch(setIsAuthenticated(true));
          if (location.pathname === "/") {
            navigate("/home", { replace: true });
          }
        } else {
          localStorage.removeItem("MbPeShVmY");
          dispatch(setIsAuthenticated(false));
          dispatch(unsetUser());
          scrollToTop()
        }
      } catch (error) {
        console.error("Token decode error:", error);
        localStorage.removeItem("MbPeShVmY");
        dispatch(unsetUser());
        scrollToTop()
      } finally {
        setLoading(false);
      }
    } else {
      dispatch(setIsAuthenticated(false));
      dispatch(unsetUser());

      setLoading(false);
      scrollToTop()
    }
  }, [dispatch, navigate, location.pathname]);

  useEffect(() => {
    if (location.pathname === "/" || wasLoggedOutManually) return;

    const storedToken = localStorage.getItem("MbPeShVmY");

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const now = Math.floor(Date.now() / 1000);
        const remainingTime = (decoded.exp - now) * 1000;
        console.log("remainingTime", remainingTime);

        if (remainingTime > 0) {
          const timeoutId = setTimeout(() => {
            // Show error immediately
            setSessionExpired(true);
            dispatch(showOverlay());

            // After 3 seconds, logout and navigate
            setTimeout(() => {
              localStorage.removeItem("MbPeShVmY");
              dispatch(setIsAuthenticated(false));
              dispatch(unsetUser());

              setSessionExpired(false);
              dispatch(hideOverlay());
              navigate("/login");
            }, 3000);
          }, remainingTime);

          return () => clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }
  }, [dispatch, navigate, location.pathname, wasLoggedOutManually]);


  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <span className="text-gray-700 text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {sessionExpired && !wasLoggedOutManually && (
        <Feedback isSuccess={false} message="Your session has expired." />
      )}

      {error && <Feedback isSuccess={false} message={error} />}
      {message && <Feedback isSuccess={true} message={message} />}

      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              <span className="text-gray-700 text-lg">Loading...</span>
            </div>
          </div>
        }
      >
        <Routes>
          {appRoutes.map((route) => {
            if ("requireAuth" in route) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    isAuthenticated ? (
                      <route.component />
                    ) : (
                      <Navigate replace to="/login" />
                    )
                  }
                />
              );
            } else {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              );
            }
          })}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
