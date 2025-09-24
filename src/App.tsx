import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { ServicesPage } from './components/pages/ServicesPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';
import { ClientDashboard } from './components/pages/ClientDashboard';
import { ProviderDashboard } from './components/pages/ProviderDashboard';
import { BookingPage } from './components/pages/BookingPage';
import { FavoritesPage } from './components/pages/FavoritesPage';
import { VerificationPage } from './components/pages/VerificationPage';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

export type UserType = 'client' | 'provider' | 'admin' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<{ type: UserType; name: string; verified?: boolean } | null>(null);
  const [selectedCaterer, setSelectedCaterer] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [pendingVerifications, setPendingVerifications] = useState<any[]>([]);

  // Load favorites, services, and user from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('icateryou_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }

    const savedServices = localStorage.getItem('icateryou_services');
    if (savedServices) {
      try {
        setServices(JSON.parse(savedServices));
      } catch (error) {
        console.error('Error loading services:', error);
      }
    }

    const savedUser = localStorage.getItem('icateryou_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }

    const savedPendingVerifications = localStorage.getItem('icateryou_pending_verifications');
    if (savedPendingVerifications) {
      try {
        setPendingVerifications(JSON.parse(savedPendingVerifications));
      } catch (error) {
        console.error('Error loading pending verifications:', error);
      }
    }

    // Create default admin user if none exists
    const adminExists = localStorage.getItem('icateryou_admin_created');
    if (!adminExists) {
      localStorage.setItem('icateryou_admin_created', 'true');
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('icateryou_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save services to localStorage whenever services change
  useEffect(() => {
    localStorage.setItem('icateryou_services', JSON.stringify(services));
  }, [services]);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('icateryou_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('icateryou_user');
    }
  }, [user]);

  // Save pending verifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('icateryou_pending_verifications', JSON.stringify(pendingVerifications));
  }, [pendingVerifications]);

  const addToFavorites = (caterer: any) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === caterer.id);
      if (isAlreadyFavorite) {
        toast.info('Already in favorites');
        return prev;
      }
      toast.success(`${caterer.name} added to favorites!`);
      return [...prev, caterer];
    });
  };

  const removeFromFavorites = (catererId: string) => {
    setFavorites(prev => {
      const caterer = prev.find(fav => fav.id === catererId);
      if (caterer) {
        toast.success(`${caterer.name} removed from favorites`);
      }
      return prev.filter(fav => fav.id !== catererId);
    });
  };

  const isFavorite = (catererId: string) => {
    return favorites.some(fav => fav.id === catererId);
  };

  const addService = (service: any) => {
    const newService = {
      ...service,
      id: Date.now().toString(),
      provider: user?.name || 'Unknown Provider',
      providerId: user?.name || 'unknown',
      status: 'active',
      bookings: 0,
      rating: 0,
      verified: user?.verified || false
    };
    setServices(prev => [...prev, newService]);
    toast.success('Service added successfully!');
  };

  const updateService = (serviceId: string, updates: any) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, ...updates } : service
    ));
    toast.success('Service updated successfully!');
  };

  const deleteService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    setServices(prev => prev.filter(service => service.id !== serviceId));
    toast.success(`${service?.name || 'Service'} deleted successfully!`);
  };

  const getUserServices = () => {
    return services.filter(service => service.providerId === user?.name);
  };

  const handleVerification = (submittedData: any) => {
    // Instead of immediately verifying, add to pending verifications
    const verificationRequest = {
      userId: user?.name || 'unknown',
      userType: user?.type,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      ...submittedData
    };

    setPendingVerifications(prev => [...prev, verificationRequest]);
    
    // Update user status to show verification is pending
    const updatedUser = { ...user!, verificationStatus: 'pending' };
    setUser(updatedUser);
    toast.success('Verification documents submitted! Awaiting admin approval.');
  };

  const handleApproveVerification = (userId: string) => {
    // Remove from pending verifications
    setPendingVerifications(prev => prev.filter(v => v.userId !== userId));
    
    // If this is the current user, update their verification status
    if (user?.name === userId) {
      const updatedUser = { ...user, verified: true, verificationStatus: 'approved' };
      setUser(updatedUser);
      toast.success('Congratulations! Your account has been verified.');
    } else {
      toast.success(`User ${userId} has been verified successfully.`);
    }
  };

  const handleRejectVerification = (userId: string, reason: string) => {
    // Remove from pending verifications
    setPendingVerifications(prev => prev.filter(v => v.userId !== userId));
    
    // If this is the current user, update their verification status
    if (user?.name === userId) {
      const updatedUser = { ...user, verified: false, verificationStatus: 'rejected', rejectionReason: reason };
      setUser(updatedUser);
      toast.error('Your verification has been rejected. Please check the details and resubmit.');
    } else {
      toast.info(`User ${userId} verification has been rejected.`);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} user={user} />;
      case 'services':
        return (
          <ServicesPage 
            onNavigate={setCurrentPage} 
            user={user} 
            onSelectCaterer={setSelectedCaterer}
            favorites={favorites}
            onAddToFavorites={addToFavorites}
            onRemoveFromFavorites={removeFromFavorites}
            isFavorite={isFavorite}
            services={services}
          />
        );
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} onLogin={setUser} />;
      case 'signup':
        return <SignupPage onNavigate={setCurrentPage} onSignup={setUser} />;
      case 'client-dashboard':
        return <ClientDashboard onNavigate={setCurrentPage} user={user} onSelectCaterer={setSelectedCaterer} favorites={favorites} />;
      case 'provider-dashboard':
        return (
          <ProviderDashboard 
            onNavigate={setCurrentPage} 
            user={user} 
            services={getUserServices()}
            onAddService={addService}
            onUpdateService={updateService}
            onDeleteService={deleteService}
          />
        );
      case 'booking':
        return <BookingPage onNavigate={setCurrentPage} user={user} selectedCaterer={selectedCaterer} />;
      case 'favorites':
        return (
          <FavoritesPage 
            onNavigate={setCurrentPage} 
            user={user} 
            favorites={favorites}
            onRemoveFromFavorites={removeFromFavorites}
            onSelectCaterer={setSelectedCaterer}
          />
        );
      case 'verification':
        return (
          <VerificationPage 
            onNavigate={setCurrentPage} 
            user={user}
            onVerify={handleVerification}
          />
        );
      case 'admin':
        return (
          <AdminDashboard 
            onNavigate={setCurrentPage} 
            user={user}
            pendingVerifications={pendingVerifications}
            onApproveVerification={handleApproveVerification}
            onRejectVerification={handleRejectVerification}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} user={user} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onNavigate={setCurrentPage} 
        currentPage={currentPage}
        user={user}
        onLogout={() => {
          setUser(null);
          localStorage.removeItem('icateryou_user');
          toast.success('Successfully logged out!');
        }}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
      <Toaster 
        position="top-right" 
        richColors 
        expand={false}
        duration={3000}
      />
    </div>
  );
}