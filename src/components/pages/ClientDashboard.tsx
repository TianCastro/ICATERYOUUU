import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { 
  Calendar, 
  CreditCard, 
  Star, 
  Clock, 
  MapPin,
  Users,
  Heart,
  Search,
  Filter,
  Plus,
  Check,
  AlertCircle,
  Download,
  Shield,
  AlertTriangle,
  Eye,
  Upload,
  FileText,
  Receipt,
  X,
  Send,
  Image as ImageIcon
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { VerificationBadge } from '../VerificationBadge';
import { CatererDetailsDialog } from '../CatererDetailsDialog';
import { UserType } from '../../App';

interface ClientDashboardProps {
  onNavigate: (page: string) => void;
  user: { type: UserType; name: string; verified?: boolean } | null;
  onSelectCaterer?: (caterer: any) => void;
  favorites?: any[];
}

export function ClientDashboard({ onNavigate, user, onSelectCaterer, favorites = [] }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingFilter, setBookingFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedCatererForDetails, setSelectedCatererForDetails] = useState<any>(null);
  const [isCatererDetailsDialogOpen, setIsCatererDetailsDialogOpen] = useState(false);
  
  // Mock data for bookings
  const [bookings, setBookings] = useState([
    {
      id: 1,
      caterer: "Delicious Delights Catering",
      event: "Wedding Reception",
      date: "2025-02-15",
      time: "6:00 PM",
      venue: "Iloilo Convention Center",
      guests: 150,
      status: "confirmed",
      amount: 75000,
      deposit: 22500,
      balance: 52500,
      paymentMethod: "GCash",
      specialRequests: "Vegetarian options for 20 guests, late night snacks",
      contactPhone: "+63 917 123 4567",
      contactEmail: "client@example.com",
      image: "https://images.unsplash.com/photo-1474221379956-afaf88e3d760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2F0ZXJpbmclMjBlbGVnYW50fGVufDF8fHx8MTc1ODQ1NTg0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      receiptUploaded: false
    },
    {
      id: 2,
      caterer: "Iloilo Flavors",
      event: "Corporate Meeting",
      date: "2025-01-28",
      time: "12:00 PM",
      venue: "Richmonde Hotel Iloilo",
      guests: 50,
      status: "pending",
      amount: 25000,
      deposit: 7500,
      balance: 17500,
      paymentMethod: "Credit Card",
      specialRequests: "Setup by 11:30 AM, business lunch menu",
      contactPhone: "+63 917 123 4567",
      contactEmail: "client@example.com",
      image: "https://images.unsplash.com/photo-1595507059318-baf4e186c77f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMGZvb2QlMjBjYXRlcmluZ3xlbnwxfHx8fDE3NTg0NTU4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      receiptUploaded: false
    },
    {
      id: 3,
      caterer: "Premium Catering Co.",
      event: "Birthday Celebration",
      date: "2025-01-10",
      time: "7:00 PM",
      venue: "Private Residence, Jaro",
      guests: 80,
      status: "completed",
      amount: 40000,
      deposit: 12000,
      balance: 28000,
      paymentMethod: "PayMaya",
      specialRequests: "Birthday cake, kid-friendly menu options",
      contactPhone: "+63 917 123 4567",
      contactEmail: "client@example.com",
      rating: 5,
      review: "Excellent service and delicious food! The team was professional, arrived on time, and the presentation was beautiful. The birthday cake was a huge hit with the kids!",
      image: "https://images.unsplash.com/photo-1755862836224-e92f7fbf625b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjYXRlcmluZyUyMGJ1ZmZldCUyMHNldHVwfGVufDF8fHx8MTc1ODQ1NTg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      receiptUploaded: true
    },
    {
      id: 4,
      caterer: "Manila Bay Caterers",
      event: "Anniversary Dinner",
      date: "2024-12-20",
      time: "6:30 PM",
      venue: "Garden Restaurant, Iloilo",
      guests: 60,
      status: "completed",
      amount: 35000,
      deposit: 10500,
      balance: 24500,
      paymentMethod: "BPI Bank Transfer",
      specialRequests: "Romantic setup, special dietary requirements for 2 guests",
      contactPhone: "+63 917 123 4567",
      contactEmail: "client@example.com",
      rating: 4,
      review: "Great food and ambiance. The romantic setup was perfect for our anniversary. Service was good but could have been a bit faster.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGRpbm5lciUyMGNhdGVyaW5nfGVufDF8fHx8MTc1ODQ1NTg0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      receiptUploaded: true
    },
    {
      id: 5,
      caterer: "Hometown Flavors",
      event: "Graduation Party",
      date: "2024-11-15",
      time: "2:00 PM",
      venue: "University of San Agustin",
      guests: 100,
      status: "completed",
      amount: 50000,
      deposit: 15000,
      balance: 35000,
      paymentMethod: "GCash",
      specialRequests: "Filipino traditional menu, vegetarian options",
      contactPhone: "+63 917 123 4567",
      contactEmail: "client@example.com",
      // No rating yet
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwcGFydHklMjBjYXRlcmluZ3xlbnwxfHx8fDE3NTg0NTU4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      receiptUploaded: false
    }
  ]);

  // Calculate accurate statistics from actual data
  const totalBookings = bookings.length;
  const totalSpent = bookings.reduce((sum, booking) => sum + booking.amount, 0);
  const favoritesCount = favorites.length;
  
  // Calculate average rating from completed bookings that have ratings
  const completedBookingsWithRatings = bookings.filter(booking => 
    booking.status === 'completed' && booking.rating
  );
  const averageRating = completedBookingsWithRatings.length > 0 
    ? (completedBookingsWithRatings.reduce((sum, booking) => sum + booking.rating, 0) / completedBookingsWithRatings.length).toFixed(1)
    : '0.0';

  // Use favorites from props, fallback to mock data if no favorites exist
  const displayFavorites = favorites.length > 0 ? favorites : [
    {
      id: 1,
      name: "Delicious Delights Catering",
      rating: 4.8,
      reviews: 124,
      specialty: "Filipino & International",
      image: "https://images.unsplash.com/photo-1595507059318-baf4e186c77f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMGZvb2QlMjBjYXRlcmluZ3xlbnwxfHx8fDE3NTg0NTU4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      name: "Iloilo Flavors",
      rating: 4.6,
      reviews: 89,
      specialty: "Traditional Filipino",
      image: "https://images.unsplash.com/photo-1474221379956-afaf88e3d760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2F0ZXJpbmclMjBlbGVnYW50fGVufDF8fHx8MTc1ODQ1NTg0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <Check className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'completed': return <Star className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Filter bookings based on status and search query
  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = bookingFilter === 'all' || booking.status === bookingFilter;
    const matchesSearch = searchQuery === '' || 
      booking.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.caterer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setShowDetailsDialog(true);
  };

  const handleDownloadInvoice = (booking: any) => {
    // Generate and download invoice
    const invoiceData = `
INVOICE - iCATERYou

Booking ID: ${booking.id}
Date: ${new Date().toLocaleDateString()}

CLIENT DETAILS:
Name: ${user?.name}
Email: ${booking.contactEmail}
Phone: ${booking.contactPhone}

EVENT DETAILS:
Event: ${booking.event}
Caterer: ${booking.caterer}
Date: ${booking.date}
Time: ${booking.time}
Venue: ${booking.venue}
Guests: ${booking.guests}

PAYMENT DETAILS:
Total Amount: ₱${booking.amount.toLocaleString()}
Deposit Paid: ₱${booking.deposit.toLocaleString()}
Balance Due: ₱${booking.balance.toLocaleString()}
Payment Method: ${booking.paymentMethod}

Special Requests: ${booking.specialRequests}

Thank you for choosing iCATERYou!
    `;
    
    const blob = new Blob([invoiceData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${booking.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReceiptUpload = (booking: any) => {
    setSelectedBooking(booking);
    setShowReceiptDialog(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
    }
  };

  const handleSubmitReceipt = () => {
    if (receiptFile && selectedBooking) {
      // In a real app, you would upload the file to your server
      console.log('Uploading receipt:', receiptFile.name, 'for booking:', selectedBooking.id);
      
      // Update booking to show receipt uploaded
      // For demo purposes, we'll just close the dialog
      setShowReceiptDialog(false);
      setReceiptFile(null);
      alert('Receipt uploaded successfully!');
    }
  };

  const handleSubmitRating = () => {
    if (rating > 0) {
      // Update the booking with the new rating and review
      setBookings(prev => prev.map(booking => 
        booking.id === selectedBooking?.id 
          ? { ...booking, rating: rating, review: review }
          : booking
      ));
      
      // Reset form and close dialog
      setRating(0);
      setReview('');
      setRatingDialogOpen(false);
      setSelectedBooking(null);
    }
  };

  const openRatingDialog = (booking: any) => {
    setSelectedBooking(booking);
    setRating(booking.rating || 0);
    setReview(booking.review || '');
    setRatingDialogOpen(true);
  };

  const handleViewCatererProfile = (caterer: any) => {
    // Convert favorite caterer data to full caterer format
    const fullCatererData = {
      ...caterer,
      description: `Professional catering service specializing in ${caterer.specialty}`,
      location: 'Iloilo City',
      capacity: '50-300',
      experience: '8+ years',
      price: '₱300-500',
      priceRange: { min: 300, max: 500 },
      categories: [caterer.specialty],
      cuisines: caterer.specialty.split(' & '),
      contact: {
        phone: '+63 917 123 4567',
        email: 'info@caterer.com'
      }
    };
    setSelectedCatererForDetails(fullCatererData);
    setIsCatererDetailsDialogOpen(true);
  };

  const handleBookNowFromFavorites = (caterer: any) => {
    if (!user) {
      onNavigate('login');
      return;
    }
    if (user.type !== 'client') {
      alert('Only clients can book catering services.');
      return;
    }
    
    // Convert favorite caterer data to full caterer format for booking
    const fullCatererData = {
      ...caterer,
      description: `Professional catering service specializing in ${caterer.specialty}`,
      location: 'Iloilo City',
      capacity: '50-300',
      experience: '8+ years',
      price: '₱300-500',
      priceRange: { min: 300, max: 500 },
      categories: [caterer.specialty],
      cuisines: caterer.specialty.split(' & '),
      contact: {
        phone: '+63 917 123 4567',
        email: 'info@caterer.com'
      }
    };
    
    if (onSelectCaterer) {
      onSelectCaterer(fullCatererData);
    }
    onNavigate('booking');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user?.name}!
                </h1>
                <VerificationBadge verified={user?.verified || false} />
              </div>
              <p className="text-gray-600">
                Manage your bookings and discover new catering services
              </p>
              {!user?.verified && (
                <div className="mt-1">
                  {(user as any)?.verificationStatus === 'pending' ? (
                    <p className="text-sm text-blue-600 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Verification pending admin review
                    </p>
                  ) : (user as any)?.verificationStatus === 'rejected' ? (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      Verification rejected - please resubmit
                    </p>
                  ) : (
                    <p className="text-sm text-orange-600">
                      Get verified to unlock all booking features and build trust with providers
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              {!user?.verified && (
                <Button 
                  onClick={() => onNavigate('verification')}
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-50"
                  disabled={(user as any)?.verificationStatus === 'pending'}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {(user as any)?.verificationStatus === 'pending' ? 'Review Pending' : 
                   (user as any)?.verificationStatus === 'rejected' ? 'Resubmit Verification' : 
                   'Get Verified'}
                </Button>
              )}
              <Button 
                onClick={() => onNavigate('services')}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">₱{(totalSpent / 1000).toFixed(0)}K</p>
                </div>
                <CreditCard className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Favorite Caterers</p>
                  <p className="text-2xl font-bold text-gray-900">{favoritesCount}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('favorites')}
                  className="p-0"
                >
                  <Heart className="w-8 h-8 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{averageRating}★</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="ratings">Ratings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <ImageWithFallback
                          src={booking.image}
                          alt={booking.caterer}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{booking.event}</h3>
                          <p className="text-sm text-gray-600">{booking.caterer}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(booking.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {booking.guests} guests
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </Badge>
                        <span className="font-semibold">₱{booking.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('bookings')}
                  >
                    View All Bookings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.filter(b => b.status !== 'completed').map((booking) => (
                    <div key={booking.id} className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.event}</h3>
                          <p className="text-sm text-gray-600">{booking.caterer}</p>
                          <p className="text-sm text-orange-600 mt-1">
                            {new Date(booking.date).toLocaleDateString()} • {booking.guests} guests
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">₱{booking.amount.toLocaleString()}</p>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
                  
                  {/* Filter and Search Controls */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Select value={bookingFilter} onValueChange={setBookingFilter}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="relative w-full sm:w-[200px]">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search bookings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                      <p className="text-gray-600 mb-4">
                        {bookingFilter !== 'all' ? `No ${bookingFilter} bookings found.` : 'You haven\'t made any bookings yet.'}
                      </p>
                      <Button onClick={() => onNavigate('services')}>
                        Browse Caterers
                      </Button>
                    </div>
                  ) : (
                    filteredBookings.map((booking) => (
                      <Card key={booking.id} className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex space-x-4">
                            <ImageWithFallback
                              src={booking.image}
                              alt={booking.caterer}
                              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h3 className="text-lg font-semibold mb-1">{booking.event}</h3>
                              <p className="text-gray-600 mb-2">{booking.caterer}</p>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(booking.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {booking.time}
                                </span>
                                <span className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {booking.guests} guests
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {booking.venue}
                                </span>
                              </div>
                              
                              {/* Receipt Status */}
                              {booking.status === 'completed' && (
                                <div className="mt-2">
                                  {booking.receiptUploaded ? (
                                    <Badge className="bg-green-100 text-green-700">
                                      <Receipt className="w-3 h-3 mr-1" />
                                      Receipt Uploaded
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-yellow-100 text-yellow-700">
                                      <AlertCircle className="w-3 h-3 mr-1" />
                                      Receipt Pending
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-left lg:text-right">
                            <Badge className={getStatusColor(booking.status)} size="sm">
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status}</span>
                            </Badge>
                            <p className="text-xl font-bold text-gray-900 mt-2">
                              ₱{booking.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              Deposit: ₱{booking.deposit.toLocaleString()}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mt-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewDetails(booking)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                              
                              {booking.status === 'completed' && (
                                <Button 
                                  size="sm" 
                                  className="bg-orange-500 hover:bg-orange-600"
                                  onClick={() => openRatingDialog(booking)}
                                >
                                  <Star className="w-4 h-4 mr-1" />
                                  {booking.rating ? 'Edit Review' : 'Rate & Review'}
                                </Button>
                              )}

                              
                              {booking.status === 'confirmed' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDownloadInvoice(booking)}
                                >
                                  <Download className="w-4 h-4 mr-1" />
                                  Invoice
                                </Button>
                              )}
                              
                              {booking.status === 'completed' && !booking.receiptUploaded && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleReceiptUpload(booking)}
                                >
                                  <Upload className="w-4 h-4 mr-1" />
                                  Upload Receipt
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ratings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Ratings & Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.filter(booking => booking.status === 'completed').length === 0 ? (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No completed bookings yet</h3>
                    <p className="text-gray-600 mb-4">
                      Complete a booking to rate and review your experience
                    </p>
                    <Button onClick={() => onNavigate('services')}>
                      Browse Caterers
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {bookings.filter(booking => booking.status === 'completed').map((booking) => (
                      <Card key={booking.id} className="p-6">
                        <div className="flex items-start gap-4">
                          <ImageWithFallback
                            src={booking.image}
                            alt={booking.caterer}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                              <div>
                                <h3 className="text-lg font-semibold mb-1">{booking.event}</h3>
                                <p className="text-gray-600 mb-2">{booking.caterer}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                  <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {new Date(booking.date).toLocaleDateString()}
                                  </span>
                                  <span className="flex items-center">
                                    <Users className="w-4 h-4 mr-1" />
                                    {booking.guests} guests
                                  </span>
                                </div>
                                
                                {booking.rating ? (
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            className={`w-4 h-4 ${
                                              star <= booking.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm font-medium">{booking.rating}/5</span>
                                      <Badge className="bg-green-100 text-green-700">
                                        <Check className="w-3 h-3 mr-1" />
                                        Reviewed
                                      </Badge>
                                    </div>
                                    {booking.review && (
                                      <p className="text-sm text-gray-600 italic">"{booking.review}"</p>
                                    )}
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-orange-100 text-orange-700">
                                      <AlertCircle className="w-3 h-3 mr-1" />
                                      Not Rated
                                    </Badge>
                                    <span className="text-sm text-gray-500">Share your experience</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex flex-col gap-2">
                                <Button 
                                  size="sm" 
                                  variant={booking.rating ? "outline" : "default"}
                                  className={!booking.rating ? "bg-orange-500 hover:bg-orange-600" : ""}
                                  onClick={() => openRatingDialog(booking)}
                                >
                                  <Star className="w-4 h-4 mr-1" />
                                  {booking.rating ? 'Edit Review' : 'Add Review'}
                                </Button>

                                
                                {booking.rating && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleViewDetails(booking)}
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Details
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    {/* Rating Summary */}
                    <Card className="p-6 bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Your Review Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-2xl font-bold text-orange-600">
                              {bookings.filter(b => b.status === 'completed' && b.rating).length}
                            </p>
                            <p className="text-sm text-gray-600">Reviews Written</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-orange-600">
                              {bookings.filter(b => b.status === 'completed' && b.rating).length > 0 ? 
                                (bookings.filter(b => b.status === 'completed' && b.rating)
                                  .reduce((sum, b) => sum + b.rating, 0) / 
                                  bookings.filter(b => b.status === 'completed' && b.rating).length).toFixed(1)
                                : '0.0'
                              }★
                            </p>
                            <p className="text-sm text-gray-600">Average Rating Given</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-orange-600">
                              {bookings.filter(b => b.status === 'completed' && !b.rating).length}
                            </p>
                            <p className="text-sm text-gray-600">Unrated Services</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Favorite Caterers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayFavorites.map((caterer) => (
                    <Card key={caterer.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex space-x-4">
                            <ImageWithFallback
                              src={caterer.image}
                              alt={caterer.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-semibold">{caterer.name}</h3>
                              <p className="text-sm text-gray-600">{caterer.specialty}</p>
                              <div className="flex items-center mt-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium ml-1">{caterer.rating}</span>
                                <span className="text-sm text-gray-500 ml-1">({caterer.reviews})</span>
                              </div>
                            </div>
                          </div>
                          <Heart className="w-5 h-5 text-red-500 fill-current" />
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleViewCatererProfile(caterer)}
                          >
                            View Profile
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 bg-orange-500 hover:bg-orange-600"
                            onClick={() => handleBookNowFromFavorites(caterer)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => onNavigate('favorites')}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                  >
                    View All Favorites
                  </Button>
                </div>
                
                {displayFavorites.length === 0 && (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-gray-600 mb-4">Start exploring caterers and add them to your favorites</p>
                    <Button onClick={() => onNavigate('services')}>
                      Browse Caterers
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{booking.event}</h3>
                        <p className="text-sm text-gray-600">{booking.caterer}</p>
                        <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₱{booking.amount.toLocaleString()}</p>
                        <Badge 
                          className={booking.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                        >
                          {booking.status === 'completed' ? 'Paid' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Total Spent This Year</span>
                    <span className="font-semibold">₱{totalSpent.toLocaleString()}</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">65% more than last year</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="details-dialog-description">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription id="details-dialog-description">
              View complete information about your booking including event details, payment information, and contact details.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <ImageWithFallback
                  src={selectedBooking.image}
                  alt={selectedBooking.caterer}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedBooking.event}</h3>
                  <p className="text-gray-600">{selectedBooking.caterer}</p>
                  <Badge className={getStatusColor(selectedBooking.status)} className="mt-2">
                    {getStatusIcon(selectedBooking.status)}
                    <span className="ml-1 capitalize">{selectedBooking.status}</span>
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Event Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span>{new Date(selectedBooking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span>{selectedBooking.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Venue:</span>
                      <span>{selectedBooking.venue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests:</span>
                      <span>{selectedBooking.guests}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Payment Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-semibold">₱{selectedBooking.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deposit Paid:</span>
                      <span className="text-green-600">₱{selectedBooking.deposit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Balance Due:</span>
                      <span>₱{selectedBooking.balance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span>{selectedBooking.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{selectedBooking.contactPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{selectedBooking.contactEmail}</span>
                  </div>
                </div>
              </div>

              {selectedBooking.specialRequests && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3">Special Requests</h4>
                    <p className="text-sm text-gray-600">{selectedBooking.specialRequests}</p>
                  </div>
                </>
              )}

              {selectedBooking.rating && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3">Your Review</h4>
                    <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= selectedBooking.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm font-medium">{selectedBooking.rating}/5</span>
                    </div>
                    {selectedBooking.review && (
                      <p className="text-sm text-gray-600">{selectedBooking.review}</p>
                    )}
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-4">
                {selectedBooking.status === 'confirmed' && (
                  <Button 
                    onClick={() => handleDownloadInvoice(selectedBooking)}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                )}
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Receipt Upload Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent aria-describedby="receipt-dialog-description">
          <DialogHeader>
            <DialogTitle>Upload Payment Receipt</DialogTitle>
            <DialogDescription id="receipt-dialog-description">
              Upload your payment receipt for verification. This helps us confirm your payment and process your booking.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900">{selectedBooking.event}</h4>
                <p className="text-sm text-blue-700">{selectedBooking.caterer}</p>
                <p className="text-sm text-blue-600 mt-1">
                  Amount: ₱{selectedBooking.amount.toLocaleString()}
                </p>
              </div>

              <div>
                <Label htmlFor="receipt-upload">Upload Receipt Image/PDF</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    id="receipt-upload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="receipt-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      {receiptFile ? (
                        <>
                          <FileText className="w-12 h-12 text-green-500 mb-2" />
                          <p className="text-sm font-medium">{receiptFile.name}</p>
                          <p className="text-xs text-gray-500">{(receiptFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Click to upload receipt</p>
                          <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleSubmitReceipt}
                  disabled={!receiptFile}
                  className="flex-1"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Receipt
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowReceiptDialog(false);
                    setReceiptFile(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>

              <div className="text-xs text-gray-500">
                <p>• Upload your payment receipt for verification</p>
                <p>• Accepted formats: PNG, JPG, PDF</p>
                <p>• Maximum file size: 10MB</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent aria-describedby="rating-dialog-description">
          <DialogHeader>
            <DialogTitle>
              {selectedBooking?.rating ? 'Edit Your Review' : 'Rate Your Experience'}
            </DialogTitle>
            <DialogDescription id="rating-dialog-description">
              {selectedBooking?.caterer 
                ? `Share your feedback about ${selectedBooking.caterer} to help other users make informed decisions.`
                : 'Share your feedback about this catering service to help other users make informed decisions.'
              }
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900">{selectedBooking.event}</h4>
                <p className="text-sm text-blue-700">{selectedBooking.caterer}</p>
                <p className="text-sm text-blue-600">
                  {new Date(selectedBooking.date).toLocaleDateString()} • {selectedBooking.guests} guests
                </p>
              </div>
              
              <div>
                <Label>Rating *</Label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer transition-colors ${
                        star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-200'
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Click to rate from 1 to 5 stars</p>
              </div>
              
              <div>
                <Label htmlFor="review">Your Review</Label>
                <Textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience with the food quality, service, presentation, and overall satisfaction..."
                  className="mt-1 min-h-[100px]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Help other clients by sharing details about food quality, service, timeliness, and presentation.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleSubmitRating}
                  disabled={rating === 0}
                  className="flex-1"
                >
                  {selectedBooking.rating ? 'Update Review' : 'Submit Review'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setRating(0);
                    setReview('');
                    setRatingDialogOpen(false);
                    setSelectedBooking(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Caterer Details Dialog */}
      <CatererDetailsDialog
        caterer={selectedCatererForDetails}
        isOpen={isCatererDetailsDialogOpen}
        onClose={() => setIsCatererDetailsDialogOpen(false)}
        onBookNow={(caterer) => {
          setIsCatererDetailsDialogOpen(false);
          handleBookNowFromFavorites(caterer);
        }}
        user={user}
      />
    </div>
  );
}