import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ProductDetails from './pages/Productdetails';
import AboutUs from './pages/AboutUs';
import StoreDetail from './components/StoreDetail';
import CategoryProducts from './components/CategoryProducts';
import SearchResults from './pages/SearchResults';
import SplitCategory from './components/Category';
import FeaturedProductsPage from './pages/FeaturedProductsPage';
import FeaturedStoresPage from './pages/FeaturedStoresPage';
// SuperAdmin
import SuperAdminLogin from './pages/SuperAdmin/SuperAdminLogin';
import SuperAdminDashboard from './pages/SuperAdmin/SuperAdminDashboard';
import AddStore from './pages/SuperAdmin/AddStore';
import ManageStores from './pages/SuperAdmin/ManageStores';
import ProtectedRoute from './components/ProtectedRoute';

// StoreAdmin
import AdminLogin from './pages/Admin/AdminLogin';
import StoreAdminDashboard from './pages/Admin/StoreAdminDashboard';
import ProtectedRouteForStoreAdmin from './components/ProtectedRouteForStoreAdmin';
import AddProduct from './pages/Admin/AddProduct'; // if needed

// BlogAdmin
import BlogAdminLogin from './pages/BlogAdminLogin';
import AddBlog from './pages/AddBlog';
import BlogAdminProtectedRoute from './components/BlogAdminProtectedRoute'; // ✅ we'll create this below
import Blogs from './pages/Blogs';
import BlogDetails from "./pages/BlogDetails";
import Member from './pages/Member';
import PrimeMembership from './pages/PrimeMembership';

// import CategoryProducts from "./pages/CategoryProducts"

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* <Navbar /> */}

      <Routes>
        {/* Public */}
        
        <Route path="/" element={<Home />} />
        {/* <Route path="/store/:id" element={<StoreDetail />} /> */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/prime-member" element={<PrimeMembership />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/:slug" element={<StoreDetail />} />
        <Route path="/category/:categoryName" element={<CategoryProducts />} />
           <Route path="/" element={<SplitCategory />} />

             {/* <Route path="/products/:category" element={<CategoryProducts />} /> */}
<Route path="/featured-products" element={<FeaturedProductsPage />} />
<Route path='/featured-stores' element={<FeaturedStoresPage />} />
        {/* Blog Admin */}
        <Route path="/blog-admin/login" element={<BlogAdminLogin />} />
        <Route
          path="/admin/add-blog"
          element={
            <BlogAdminProtectedRoute>
              <AddBlog />
            </BlogAdminProtectedRoute>
          }
        />
        <Route path="/blogs" element={<Blogs/>}/>
<Route path="/blog/:id" element={<BlogDetails />} />



        {/* SuperAdmin */}
        <Route path="/superadmin-login" element={<SuperAdminLogin />} />
        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute requireSuperadmin={true}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/add-store"
          element={
            <ProtectedRoute requireSuperadmin={true}>
              <AddStore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/manage-store"
          element={
            <ProtectedRoute requireSuperadmin={true}>
              <ManageStores />
            </ProtectedRoute>
          }
        />

        {/* Store Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRouteForStoreAdmin>
              <StoreAdminDashboard />
            </ProtectedRouteForStoreAdmin>
          }
        />
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
