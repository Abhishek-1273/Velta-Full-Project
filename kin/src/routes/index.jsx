import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import MiniSpinner from '../components/common/MiniSpinner';
import AuthGuard from '../components/common/AuthGuard';
import { AdminProvider, useAdmin } from '../pages/Admin/AdminContext';

// ── Public pages ──────────────────────────────────────────────────────────────
const Home            = lazy(() => import('../pages/Home/Home'));
const Properties      = lazy(() => import('../pages/Properties/Properties'));
const PropertyDetails = lazy(() => import('../pages/PropertyDetails/PropertyDetails'));
const About           = lazy(() => import('../pages/About/About'));
const Blog            = lazy(() => import('../pages/Blog/Blog'));
const BlogDetails     = lazy(() => import('../pages/BlogDetails/BlogDetails'));
const Contact         = lazy(() => import('../pages/Contact/Contact'));
const Wishlist        = lazy(() => import('../pages/Wishlist/Wishlist'));
const NotFound        = lazy(() => import('../pages/NotFound/NotFound'));
const PostProperty    = lazy(() => import('../pages/Services/PostProperty'));
const MyAccount       = lazy(() => import('../pages/Account/MyAccount'));
const PrivacyPolicy   = lazy(() => import('../pages/Legal/PrivacyPolicy'));
const TermsOfService  = lazy(() => import('../pages/Legal/TermsOfService'));
const AuthCallback    = lazy(() => import('../pages/Auth/AuthCallback'));
const FAQPage         = lazy(() => import('../pages/FAQ/FAQPage'));

// ── Service detail pages (new) ────────────────────────────────────────────────
const LegalServicesPage      = lazy(() => import('../pages/Services/LegalServicesPage'));
const RentalAgreementPage    = lazy(() => import('../pages/Services/RentalAgreementPage'));
const PropertyManagementPage = lazy(() => import('../pages/Services/PropertyManagementPage'));
const LoanServicesPage       = lazy(() => import('../pages/Services/LoanServicesPage'));
const PaintingCleaningPage   = lazy(() => import('../pages/Services/PaintingCleaningPage'));


// ── Admin panel pages ─────────────────────────────────────────────────────────
const AdminLogin      = lazy(() => import('../pages/Admin/AdminLogin'));
const AdminLayout     = lazy(() => import('../pages/Admin/AdminLayout'));
const Dashboard       = lazy(() => import('../pages/Admin/Dashboard'));
const BlogsAdmin      = lazy(() => import('../pages/Admin/BlogsAdmin'));
const PropertiesAdmin = lazy(() => import('../pages/Admin/PropertiesAdmin'));
const UsersAdmin      = lazy(() => import('../pages/Admin/UsersAdmin'));
const PartnersAdmin   = lazy(() => import('../pages/Admin/PartnersAdmin'));
const MasterDataAdmin = lazy(() => import('../pages/Admin/MasterDataAdmin'));
const SettingsAdmin   = lazy(() => import('../pages/Admin/SettingsAdmin'));
const AdvisorsAdmin     = lazy(() => import('../pages/Admin/AdvisorsAdmin'));
const TestimonialsAdmin = lazy(() => import('../pages/Admin/TestimonialsAdmin'));
const FaqsAdmin         = lazy(() => import('../pages/Admin/FaqsAdmin'));
const UserListingsAdmin  = lazy(() => import('../pages/Admin/UserListingsAdmin'));
const EnquiriesAdmin     = lazy(() => import('../pages/Admin/EnquiriesAdmin'));
const LeadsList         = lazy(() => import('../pages/Admin/LeadsList'));
const LeadDetail        = lazy(() => import('../pages/Admin/LeadDetail'));
const MyLeads           = lazy(() => import('../pages/Admin/MyLeads'));

// ── Guard: redirect to login if not staff ─────────────────────────────────────
function PanelGuard({ children, requiredRoles }) {
  const { user, loading } = useAdmin();
  if (loading) return <MiniSpinner />;
  if (!user || (user.role !== 'admin' && user.role !== 'management')) {
    return <Navigate to="/panel/login" replace />;
  }
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/panel/dashboard" replace />;
  }
  return children;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<MiniSpinner />}>
      <Routes>
        {/* ── Main public site ─────────────────────────────────────────────── */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetails />} />
          <Route path="contact" element={<Contact />} />
          <Route path="wishlist" element={<Wishlist />} />

          {/* ── Service detail pages (public — no AuthGuard) ── */}
          <Route path="services/legal"               element={<LegalServicesPage />} />
          <Route path="services/loan"              element={<LoanServicesPage />} />
          <Route path="services/rental"             element={<RentalAgreementPage />} />
          <Route path="services/management"        element={<PropertyManagementPage />} />
          <Route path="services/painting-cleaning" element={<PaintingCleaningPage />} />
          <Route path="services/post-property" element={<PostProperty />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="auth/callback" element={<AuthCallback />} />
          <Route path="my-account" element={<AuthGuard><MyAccount /></AuthGuard>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ── Panel ───────────────────────────────────────────────────────── */}
        <Route path="/panel/*" element={
          <AdminProvider>
            <Routes>
              <Route path="login" element={<AdminLogin />} />
              <Route path="" element={
                <PanelGuard>
                  <AdminLayout />
                </PanelGuard>
              }>
                <Route path="dashboard" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <Dashboard />
                  </PanelGuard>
                } />
                <Route path="blogs" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <BlogsAdmin />
                  </PanelGuard>
                } />
                <Route path="properties" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <PropertiesAdmin />
                  </PanelGuard>
                } />
                <Route path="partners" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <PartnersAdmin />
                  </PanelGuard>
                } />
                <Route path="users" element={
                  <PanelGuard requiredRoles={['admin']}>
                    <UsersAdmin />
                  </PanelGuard>
                } />
                <Route path="master-data" element={
                  <PanelGuard requiredRoles={['admin']}>
                    <MasterDataAdmin />
                  </PanelGuard>
                } />
                <Route path="settings" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <SettingsAdmin />
                  </PanelGuard>
                } />
                <Route path="advisors" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <AdvisorsAdmin />
                  </PanelGuard>
                } />
                <Route path="testimonials" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <TestimonialsAdmin />
                  </PanelGuard>
                } />
                <Route path="faqs" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <FaqsAdmin />
                  </PanelGuard>
                } />
                <Route path="user-listings" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <UserListingsAdmin />
                  </PanelGuard>
                } />
                <Route path="enquiries" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <EnquiriesAdmin />
                  </PanelGuard>
                } />
                <Route path="leads" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <LeadsList />
                  </PanelGuard>
                } />
                <Route path="leads/:id" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <LeadDetail />
                  </PanelGuard>
                } />
                <Route path="my-leads" element={
                  <PanelGuard requiredRoles={['admin','management']}>
                    <MyLeads />
                  </PanelGuard>
                } />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>
            </Routes>
          </AdminProvider>
        } />
      </Routes>
    </Suspense>
  );
}
