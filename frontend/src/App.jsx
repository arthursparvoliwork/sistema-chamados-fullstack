import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingScreen from "./components/LoadingScreen";
import PageWrapper from "./components/PageWrapper";
import RouteProgress from "./components/RouteProgress";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chamados = lazy(() => import("./pages/Chamados"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

function App() {
  const location = useLocation();

  return (
    <>
      <RouteProgress />

      <Suspense fallback={<LoadingScreen />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            <Route
              path="/"
              element={
                <PageWrapper>
                  <Login />
                </PageWrapper>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Dashboard />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/chamados"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Chamados />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <AdminDashboard />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

export default App;