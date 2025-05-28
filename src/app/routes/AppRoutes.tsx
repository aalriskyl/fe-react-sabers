import { Routes, Route } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import HomeView from "../modules/home/View";
import NotFoundView from "../modules/errors/NotFound";
import AboutView from "../modules/about/View";
import ContactView from "../modules/contact-us/View";
import ServiceView from "../modules/service/View";
import LoginView from "../modules/private/login/View";
import { AuthProvider } from "../../context/AuthContext";
import PrivateLayout from "../../components/layout/PrivateLayout";
import DashboardView from "../modules/private/dashboard/View";
import PrivateRoute from "./PrivateRoutes";
import ProjectsView from "../modules/private/projects/View";
import ClientsView from "../modules/private/clients/View";
import ProjectFormView from "../modules/private/projects/FormView";
import CertificationFormView from "../modules/private/certification/FormView";
import CertificationsView from "../modules/private/certification/View";
import ClientsFormView from "../modules/private/clients/FormView";
import SlidersView from "../modules/private/sliders/View";
import SlidersFormView from "../modules/private/sliders/FormView";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomeView />
            </MainLayout>
          }
        />

        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutView />
            </MainLayout>
          }
        />

        <Route
          path="/services"
          element={
            <MainLayout>
              <ServiceView />
            </MainLayout>
          }
        />

        <Route
          path="/contact-us"
          element={
            <MainLayout>
              <ContactView />
            </MainLayout>
          }
        />

        <Route path="/login" element={<LoginView />} />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <DashboardView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <ProjectsView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/new"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <ProjectFormView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <ProjectFormView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/certifications"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <CertificationsView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/certifications/new"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <CertificationFormView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/certifications/:id"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <CertificationFormView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <ClientsView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/clients/new"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <ClientsFormView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/clients/:id"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <ClientsFormView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/sliders"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <SlidersView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/sliders/:id"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <SlidersFormView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/sliders/new"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <SlidersFormView />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        {/* <Route path="/clients/:id" element={
          <PrivateRoute>
            <PrivateLayout>
              <ClientEditView />
            </PrivateLayout>
          </PrivateRoute>
        } /> */}

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
