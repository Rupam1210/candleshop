import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminUpload from './components/AdminUpload';
import AdminCollectionManager from './components/AdminCollectionManager';
import AdminPanel from './components/AdminPanel';
import { Plus, Settings,Mail } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import ContactModal from './components/ContactModal';
import Profile from './pages/Profile';
import ScrollToTop from './components/Scrolltotop';

const AdminButtons = () => {
  const { user } = useAuth();
  const [showAdminUpload, setShowAdminUpload] = useState(false);
  const [showCollectionManager, setShowCollectionManager] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  if (!user || user.role !== 'admin') return null;

  return (
    <>
      {/* Admin Buttons - Fixed position */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
        {/* Contact Messages - For Admin, Seller, Owner */}
        
        <button
          onClick={() => setShowContactModal(true)}
          className="bg-green-700 text-white p-3 rounded-full shadow-lg hover:bg-green-800 transition-colors"
          title="Contact Messages"
        >
          <Mail className="h-5 w-5" />
        </button>
        
        {/* Admin Panel - Only for Admin and Owner */}
        {['admin', 'owner'].includes(user.role) && (
        <button
          onClick={() => setShowAdminPanel(true)}
          className="bg-purple-700 text-white p-3 rounded-full shadow-lg hover:bg-purple-800 transition-colors"
          title="Admin Panel"
        >
          <Settings className="h-5 w-5" />
        </button>
        )}
        
        {/* Collection Manager - For Admin, Seller, Owner */}
        <button
          onClick={() => setShowCollectionManager(true)}
          className="bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-colors"
          title="Manage Collections"
        >
          <Plus className="h-5 w-5" />
        </button>
        
        {/* Product Upload - For Admin, Seller, Owner */}
        <button
          onClick={() => setShowAdminUpload(true)}
          className="bg-amber-700 text-white p-3 rounded-full shadow-lg hover:bg-amber-800 transition-colors"
          title="Add Product"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Admin Modals */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
      <AdminUpload 
        isOpen={showAdminUpload} 
        onClose={() => setShowAdminUpload(false)} 
      />
      <AdminCollectionManager 
        isOpen={showCollectionManager} 
        onClose={() => setShowCollectionManager(false)} 
      />
      <AdminPanel 
        isOpen={showAdminPanel} 
        onClose={() => setShowAdminPanel(false)} 
      />
    </>
  );
};
function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Router>

            <div className="min-h-screen bg-white">
              <ScrollToTop/>
              <Toaster />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:id" element={<ProductDetail />} />
                    <Route path="collections" element={<Collections />} />
                    <Route path="collections/:id" element={<CollectionDetail />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                  </Route>
                </Routes>
              </AnimatePresence>

             
            </div>
             <AdminButtons />
          </Router>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;