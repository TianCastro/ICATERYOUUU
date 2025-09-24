import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { 
  Plus, 
  TrendingUp, 
  Calendar, 
  Star, 
  Users,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { VerificationBadge } from '../VerificationBadge';
import { UserType } from '../../App';

interface ProviderDashboardProps {
  onNavigate: (page: string) => void;
  user: { type: UserType; name: string; verified?: boolean } | null;
  services: any[];
  onAddService: (service: any) => void;
  onUpdateService: (serviceId: string, updates: any) => void;
  onDeleteService: (serviceId: string) => void;
}

export function ProviderDashboard({ onNavigate, user, services, onAddService, onUpdateService, onDeleteService }: ProviderDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [isViewServiceOpen, setIsViewServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isViewBookingOpen, setIsViewBookingOpen] = useState(false);
  const [isMessageClientOpen, setIsMessageClientOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [messageText, setMessageText] = useState('');
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    capacity: '',
    image: ''
  });

  // Add some default image options
  const imageOptions = [
    "https://images.unsplash.com/photo-1474221379956-afaf88e3d760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2F0ZXJpbmclMjBlbGVnYW50fGVufDF8fHx8MTc1ODQ1NTg0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1595507059318-baf4e186c77f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMGZvb2QlMjBjYXRlcmluZ3xlbnwxfHx8fDE3NTg0NTU4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1755862836224-e92f7fbf625b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGJ1ZmZldCUyMHNldHVwfGVufDF8fHx8MTc1ODQ1NTg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Mock data for bookings
  const bookings = [
    {
      id: 1,
      clientName: "Maria Santos",
      event: "Wedding Reception",
      service: "Premium Wedding Package",
      date: "2025-02-15",
      guests: 150,
      status: "confirmed",
      amount: 75000,
      message: "Looking forward to an amazing wedding celebration!"
    },
    {
      id: 2,
      clientName: "John Corporation",
      event: "Annual Meeting",
      service: "Corporate Event Catering",
      date: "2025-01-28",
      guests: 50,
      status: "pending",
      amount: 25000,
      message: "Need vegetarian options for some attendees."
    },
    {
      id: 3,
      clientName: "Ana Garcia",
      event: "Birthday Party",
      service: "Birthday Party Special",
      date: "2025-01-20",
      guests: 80,
      status: "completed",
      amount: 32000,
      message: "Thank you for the wonderful service!"
    }
  ];

  const handleAddService = () => {
    if (!newService.name || !newService.description || !newService.price || !newService.category || !newService.capacity) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!user?.verified) {
      alert('Please complete your provider verification before adding services. Contact support for verification.');
      return;
    }

    const serviceData = {
      ...newService,
      image: newService.image || imageOptions[Math.floor(Math.random() * imageOptions.length)]
    };
    
    onAddService(serviceData);
    setIsAddServiceOpen(false);
    setNewService({
      name: '',
      description: '',
      price: '',
      category: '',
      capacity: '',
      image: ''
    });
  };

  const handleEditService = (service: any) => {
    setSelectedService(service);
    setNewService(service);
    setIsEditServiceOpen(true);
  };

  const handleUpdateService = () => {
    if (selectedService) {
      onUpdateService(selectedService.id, newService);
      setIsEditServiceOpen(false);
      setSelectedService(null);
      setNewService({
        name: '',
        description: '',
        price: '',
        category: '',
        capacity: '',
        image: ''
      });
    }
  };

  const handleViewService = (service: any) => {
    setSelectedService(service);
    setIsViewServiceOpen(true);
  };

  const handleDeleteService = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      onDeleteService(serviceId);
    }
  };

  const handleViewBookingDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsViewBookingOpen(true);
  };

  const handleMessageClient = (booking: any) => {
    setSelectedBooking(booking);
    setIsMessageClientOpen(true);
    setMessageText('');
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      alert('Please enter a message before sending.');
      return;
    }
    
    // In a real app, this would send the message to the client
    alert(`Message sent to ${selectedBooking?.clientName}: "${messageText}"`);
    setIsMessageClientOpen(false);
    setMessageText('');
    setSelectedBooking(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'inactive':
        return 'bg-red-100 text-red-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access the provider dashboard.</p>
          <Button onClick={() => onNavigate('login')}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (user.type !== 'provider') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Provider Access Only</h2>
          <p className="text-gray-600 mb-4">This dashboard is only available for catering providers.</p>
          <Button onClick={() => onNavigate('home')}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.name} Dashboard
              </h1>
              <VerificationBadge verified={user?.verified || false} />
            </div>
            <p className="text-gray-600 mt-1">
              Manage your catering services and bookings
            </p>
            {!user.verified && (
              <p className="text-sm text-orange-600 mt-2">
                Complete verification to start adding services and receiving bookings.
              </p>
            )}
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            {!user.verified && (
              <Button 
                onClick={() => onNavigate('verification')}
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50"
              >
                <Shield className="w-4 h-4 mr-2" />
                Get Verified
              </Button>
            )}
            <Button 
              onClick={() => setIsAddServiceOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
              disabled={!user.verified}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Services</p>
                  <p className="text-2xl font-bold text-gray-900">{services.filter(s => s.status === 'active').length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{services.reduce((total, service) => total + (service.bookings || 0), 0)}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₱50K</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Service Bookings</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Customer Satisfaction</span>
                        <span>4.8/5.0</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {services.filter(s => s.status === 'active').slice(0, 3).map((service) => (
                      <div key={service.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-600">{service.bookings || 0} bookings</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">{service.rating || 0}</span>
                        </div>
                      </div>
                    ))}
                    {services.filter(s => s.status === 'active').length === 0 && (
                      <p className="text-gray-500 text-center py-4">No active services yet. Add your first service!</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm">New booking inquiry for Wedding Package</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm">Received 5-star review from Maria Santos</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm">Corporate event booking confirmed</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Services</CardTitle>
                  <Button 
                    onClick={() => setIsAddServiceOpen(true)}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {services.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No services yet</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first catering service</p>
                    <Button 
                      onClick={() => setIsAddServiceOpen(true)}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Service
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <Card key={service.id} className="hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <ImageWithFallback
                            src={service.image || imageOptions[0]}
                            alt={service.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge 
                            className={`absolute top-4 right-4 ${getStatusColor(service.status)}`}
                          >
                            {service.status}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{service.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Price:</span>
                              <span className="font-medium">{service.price}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Capacity:</span>
                              <span>{service.capacity}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Bookings:</span>
                              <span>{service.bookings || 0}</span>
                            </div>
                            {service.rating > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Rating:</span>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                  <span>{service.rating}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleEditService(service)}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleViewService(service)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteService(service.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.event}</h3>
                          <p className="text-gray-600">{booking.clientName}</p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          <span className="flex items-center space-x-1">
                            {getStatusIcon(booking.status)}
                            <span className="capitalize">{booking.status}</span>
                          </span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Service</p>
                          <p className="font-medium">{booking.service}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Date</p>
                          <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Guests</p>
                          <p className="font-medium">{booking.guests}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="font-bold text-lg">₱{booking.amount.toLocaleString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMessageClient(booking)}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewBookingDetails(booking)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      {booking.message && (
                        <div className="mt-4 p-3 bg-gray-50 rounded">
                          <p className="text-sm text-gray-700">"{booking.message}"</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Service Dialog */}
      <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
        <DialogContent className="max-w-md" aria-describedby="add-service-description">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription id="add-service-description">
              Fill in the details below to add a new catering service to your portfolio.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="service-name">Service Name</Label>
              <Input
                id="service-name"
                value={newService.name}
                onChange={(e) => setNewService({...newService, name: e.target.value})}
                placeholder="Enter service name"
              />
            </div>
            <div>
              <Label htmlFor="service-description">Description</Label>
              <Textarea
                id="service-description"
                value={newService.description}
                onChange={(e) => setNewService({...newService, description: e.target.value})}
                placeholder="Describe your service..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="service-price">Price Range</Label>
              <Input
                id="service-price"
                value={newService.price}
                onChange={(e) => setNewService({...newService, price: e.target.value})}
                placeholder="e.g., ₱300-500 per person"
              />
            </div>
            <div>
              <Label htmlFor="service-category">Category</Label>
              <Input
                id="service-category"
                value={newService.category}
                onChange={(e) => setNewService({...newService, category: e.target.value})}
                placeholder="e.g., Weddings, Corporate"
              />
            </div>
            <div>
              <Label htmlFor="service-capacity">Capacity</Label>
              <Input
                id="service-capacity"
                value={newService.capacity}
                onChange={(e) => setNewService({...newService, capacity: e.target.value})}
                placeholder="e.g., 50-200 guests"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsAddServiceOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddService}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Add Service
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={isEditServiceOpen} onOpenChange={setIsEditServiceOpen}>
        <DialogContent className="max-w-md" aria-describedby="edit-service-description">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription id="edit-service-description">
              Update the details of your catering service below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-service-name">Service Name</Label>
              <Input
                id="edit-service-name"
                value={newService.name}
                onChange={(e) => setNewService({...newService, name: e.target.value})}
                placeholder="Enter service name"
              />
            </div>
            <div>
              <Label htmlFor="edit-service-description">Description</Label>
              <Textarea
                id="edit-service-description"
                value={newService.description}
                onChange={(e) => setNewService({...newService, description: e.target.value})}
                placeholder="Describe your service..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-service-price">Price Range</Label>
              <Input
                id="edit-service-price"
                value={newService.price}
                onChange={(e) => setNewService({...newService, price: e.target.value})}
                placeholder="e.g., ₱300-500 per person"
              />
            </div>
            <div>
              <Label htmlFor="edit-service-category">Category</Label>
              <Input
                id="edit-service-category"
                value={newService.category}
                onChange={(e) => setNewService({...newService, category: e.target.value})}
                placeholder="e.g., Weddings, Corporate"
              />
            </div>
            <div>
              <Label htmlFor="edit-service-capacity">Capacity</Label>
              <Input
                id="edit-service-capacity"
                value={newService.capacity}
                onChange={(e) => setNewService({...newService, capacity: e.target.value})}
                placeholder="e.g., 50-200 guests"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsEditServiceOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateService}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Update Service
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Service Dialog */}
      <Dialog open={isViewServiceOpen} onOpenChange={setIsViewServiceOpen}>
        <DialogContent className="max-w-2xl" aria-describedby="view-service-description">
          <DialogHeader>
            <DialogTitle>Service Details</DialogTitle>
            <DialogDescription id="view-service-description">
              Complete information about your catering service.
            </DialogDescription>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-6 py-4">
              <div className="relative">
                <ImageWithFallback
                  src={selectedService.image || imageOptions[0]}
                  alt={selectedService.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Badge 
                  className={`absolute top-4 right-4 ${getStatusColor(selectedService.status)}`}
                >
                  {selectedService.status}
                </Badge>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-2">{selectedService.name}</h3>
                <p className="text-gray-600 mb-4">{selectedService.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-gray-700">Category:</label>
                  <p className="text-gray-600">{selectedService.category}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Price:</label>
                  <p className="text-gray-600">{selectedService.price}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Capacity:</label>
                  <p className="text-gray-600">{selectedService.capacity}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Bookings:</label>
                  <p className="text-gray-600">{selectedService.bookings || 0}</p>
                </div>
                {selectedService.rating > 0 && (
                  <div>
                    <label className="font-medium text-gray-700">Rating:</label>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{selectedService.rating}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewServiceOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Booking Details Dialog */}
      <Dialog open={isViewBookingOpen} onOpenChange={setIsViewBookingOpen}>
        <DialogContent className="max-w-2xl" aria-describedby="view-booking-description">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription id="view-booking-description">
              Complete details for this booking request.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-4">Event Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="font-medium text-gray-700">Event Type:</label>
                      <p className="text-gray-600">{selectedBooking.event}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700">Client Name:</label>
                      <p className="text-gray-600">{selectedBooking.clientName}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700">Service:</label>
                      <p className="text-gray-600">{selectedBooking.service}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700">Event Date:</label>
                      <p className="text-gray-600">{new Date(selectedBooking.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-4">Booking Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="font-medium text-gray-700">Number of Guests:</label>
                      <p className="text-gray-600">{selectedBooking.guests}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700">Status:</label>
                      <Badge className={getStatusColor(selectedBooking.status)}>
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(selectedBooking.status)}
                          <span className="capitalize">{selectedBooking.status}</span>
                        </span>
                      </Badge>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700">Total Amount:</label>
                      <p className="text-gray-600 font-bold text-lg">₱{selectedBooking.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedBooking.message && (
                <div>
                  <h4 className="font-semibold text-lg mb-2">Client Message</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">"{selectedBooking.message}"</p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewBookingOpen(false)}
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    setIsViewBookingOpen(false);
                    handleMessageClient(selectedBooking);
                  }}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Client Dialog */}
      <Dialog open={isMessageClientOpen} onOpenChange={setIsMessageClientOpen}>
        <DialogContent className="max-w-md" aria-describedby="message-client-description">
          <DialogHeader>
            <DialogTitle>Send Message to Client</DialogTitle>
            <DialogDescription id="message-client-description">
              Send a message to {selectedBooking?.clientName} regarding their booking.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="message-text">Your Message</Label>
              <Textarea
                id="message-text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={`Write your message to ${selectedBooking?.clientName}...`}
                rows={4}
                className="resize-none"
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setIsMessageClientOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSendMessage}
                className="bg-orange-500 hover:bg-orange-600"
                disabled={!messageText.trim()}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}