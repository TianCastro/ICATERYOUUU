import React, { useState } from 'react';
import yasmin from "./yasmin.jpg";
import matt from "./matt.jpg";
import ranz from "./ranz.jpg";
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Search, 
  Star, 
  Users, 
  MapPin, 
  Heart,
  Utensils,
  Filter
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CatererDetailsDialog } from '../CatererDetailsDialog';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
  user?: { type: 'client' | 'provider' | null; name: string; verified?: boolean } | null;
  onSelectCaterer?: (caterer: any) => void;
  favorites?: any[];
  onAddToFavorites?: (caterer: any) => void;
  onRemoveFromFavorites?: (catererId: string) => void;
  isFavorite?: (catererId: string) => boolean;
  services?: any[];
}

export function ServicesPage({ 
  onNavigate, 
  user, 
  onSelectCaterer, 
  favorites = [], 
  onAddToFavorites, 
  onRemoveFromFavorites, 
  isFavorite,
  services = []
}: ServicesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedCatererForDetails, setSelectedCatererForDetails] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'filipino', label: 'Filipino Cuisine' },
    { value: 'international', label: 'International' },
    { value: 'weddings', label: 'Weddings' },
    { value: 'corporate', label: 'Corporate Events' },
  ];

  const priceRanges = [
    { value: 'all', label: 'All Price Range' },
    { value: 'budget', label: '₱20,000 - ₱40,000' },
    { value: 'mid', label: '₱40,000 - ₱80,000' },
    { value: 'premium', label: '₱80,000+' },
  ];

  const defaultCaterers = [
    {
      id: "1",
      name: "Delicious Delights Catering",
      rating: 4.8,
      reviews: 124,
      description: "Premium catering services specializing in Filipino and international cuisine",
      location: "Iloilo City",
      guests: "50-300",
      categories: ["Filipino", "International", "Weddings"],
      cuisines: ["Filipino", "International", "Asian Fusion"],
      capacity: "50-300",
      experience: "10+ years",
      price: "₱300-500",
      priceRange: { min: 300, max: 500 },
      priceRangeCategory: "mid",
      featured: true,
      contact: {
        phone: "+63 917 123 4567",
        email: "delicious@catering.com"
      },
      image: matt,
    },
    {
      id: "2",
      name: "Iloilo Flavors",
      rating: 4.6,
      reviews: 89,
      description: "Authentic catering services specializing in Filipino and international cuisine",
      location: "Iloilo City",
      guests: "30-200",
      categories: ["Filipino", "International", "Weddings"],
      cuisines: ["Filipino", "Traditional", "Regional"],
      capacity: "30-200",
      experience: "8+ years",
      price: "₱250-400",
      priceRange: { min: 250, max: 400 },
      priceRangeCategory: "budget",
      featured: true,
      contact: {
        phone: "+63 917 234 5678",
        email: "flavors@iloilo.com"
      },
      image: yasmin,
    },
    {
      id: "3",
      name: "Premium Catering Co.",
      rating: 4.9,
      reviews: 156,
      description: "Premium catering services specializing in Filipino and international cuisine",
      location: "Iloilo City",
      guests: "50-500",
      categories: ["Filipino", "International", "Weddings"],
      cuisines: ["International", "French", "Italian"],
      capacity: "50-500",
      experience: "15+ years",
      price: "₱400-600",
      priceRange: { min: 400, max: 600 },
      priceRangeCategory: "premium",
      featured: true,
      contact: {
        phone: "+63 917 345 6789",
        email: "premium@catering.com"
      },
      image: ranz,
    },
    {
      id: "4",
      name: "Modern Events Catering",
      rating: 4.7,
      reviews: 93,
      description: "Contemporary catering services for modern events and celebrations",
      location: "Iloilo City",
      guests: "30-250",
      categories: ["Filipino", "International", "Corporate"],
      cuisines: ["Modern Filipino", "Fusion", "Continental"],
      capacity: "30-250",
      experience: "7+ years",
      price: "₱350-450",
      priceRange: { min: 350, max: 450 },
      priceRangeCategory: "mid",
      featured: false,
      contact: {
        phone: "+63 917 456 7890",
        email: "modern@events.com"
      },
      image: yasmin,
    },
    {
      id: "5",
      name: "Celebration Caterers",
      rating: 4.8,
      reviews: 112,
      description: "Specialized in milestone celebrations and family gatherings",
      location: "Iloilo City",
      guests: "40-300",
      categories: ["Filipino", "International", "Weddings"],
      cuisines: ["Filipino", "Chinese", "International"],
      capacity: "40-300",
      experience: "12+ years",
      price: "₱300-500",
      priceRange: { min: 300, max: 500 },
      priceRangeCategory: "mid",
      featured: false,
      contact: {
        phone: "+63 917 567 8901",
        email: "celebration@caterers.com"
      },
      image: "https://images.unsplash.com/photo-1474221379956-afaf88e3d760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2F0ZXJpbmclMjBlbGVnYW50fGVufDF8fHx8MTc1ODQ1NTg0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "6",
      name: "Budget Friendly Catering",
      rating: 4.6,
      reviews: 87,
      description: "Quality catering services at affordable prices for any occasion",
      location: "Iloilo City",
      guests: "20-150",
      categories: ["Filipino", "International", "Corporate"],
      cuisines: ["Filipino", "Comfort Food", "Simple International"],
      capacity: "20-150",
      experience: "5+ years",
      price: "₱250-400",
      priceRange: { min: 250, max: 400 },
      priceRangeCategory: "budget",
      featured: false,
      contact: {
        phone: "+63 917 678 9012",
        email: "budget@catering.com"
      },
      image: "https://images.unsplash.com/photo-1755862836224-e92f7fbf625b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGJ1ZmZldCUyMHNldHVwfGVufDF8fHx8MTc1ODQ1NTg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  // Combine default caterers with user-added services
  const allCaterers = [
    ...defaultCaterers,
    ...services.map(service => ({
      id: service.id,
      name: service.name,
      rating: service.rating || 0,
      reviews: service.bookings || 0,
      description: service.description,
      location: "Iloilo City",
      guests: service.capacity,
      categories: [service.category],
      cuisines: [service.category],
      capacity: service.capacity,
      experience: "Provider Experience",
      price: service.price,
      priceRange: { min: 250, max: 500 },
      priceRangeCategory: "mid",
      featured: false,
      verified: service.verified || false,
      provider: service.provider,
      contact: {
        phone: "+63 917 XXX XXXX",
        email: "provider@catering.com"
      },
      image: service.image || "https://images.unsplash.com/photo-1474221379956-afaf88e3d760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2F0ZXJpbmclMjBlbGVnYW50fGVufDF8fHx8MTc1ODQ1NTg0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }))
  ];

  const filteredCaterers = allCaterers.filter(caterer => {
    const matchesSearch = caterer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         caterer.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           caterer.categories.some(cat => cat.toLowerCase().includes(selectedCategory));
    const matchesPriceRange = selectedPriceRange === 'all' || caterer.priceRangeCategory === selectedPriceRange;
    
    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  const toggleFavorite = (caterer: any) => {
    if (!user || user.type !== 'client') {
      alert('Please log in as a client to add favorites.');
      return;
    }

    const isCurrentlyFavorite = isFavorite && isFavorite(caterer.id);
    
    if (isCurrentlyFavorite) {
      onRemoveFromFavorites && onRemoveFromFavorites(caterer.id);
    } else {
      onAddToFavorites && onAddToFavorites(caterer);
    }
  };

  const handleBookNow = (caterer: any) => {
    if (!user) {
      // If user is not logged in, redirect to login
      onNavigate('login');
      return;
    }
    
    if (user.type !== 'client') {
      alert('Only clients can book catering services. Please sign up as a client.');
      return;
    }
    
    // Set selected caterer and navigate to booking page
    if (onSelectCaterer) {
      onSelectCaterer(caterer);
    }
    onNavigate('booking');
  };

  const handleViewDetails = (caterer: any) => {
    setSelectedCatererForDetails(caterer);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Caterer
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover trusted catering services in Iloilo City for all your special events and occasions
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search caterers, cuisine, or specialties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="All Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Showing {filteredCaterers.length} caterers in Iloilo City
            </h2>
            <div className="text-sm text-gray-600">
              Sort by: Recommended
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaterers.map((caterer) => (
              <Card key={caterer.id} className="hover:shadow-lg transition-shadow relative">
                {caterer.featured && (
                  <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                    FEATURED
                  </Badge>
                )}
                <button
                  onClick={() => toggleFavorite(caterer)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      isFavorite && isFavorite(caterer.id)
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>
                
                <div className="relative">
                  <ImageWithFallback
                    src={caterer.image}
                    alt={caterer.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-200/20 to-transparent rounded-t-lg"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Utensils className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{caterer.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{caterer.rating}</span>
                      <span className="text-sm text-gray-500">({caterer.reviews} reviews)</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{caterer.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {caterer.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {caterer.guests} guests
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {caterer.categories.map((category, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg">{caterer.price}</div>
                      <div className="text-sm text-gray-600">per person</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(caterer)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleBookNow(caterer)}
                        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCaterers.length === 0 && (
            <div className="text-center py-12">
              <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No caterers found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedPriceRange('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us and we'll help you find the perfect caterer for your event
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('contact')}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
            >
              Call Us
            </Button>
            <Button variant="outline">
              Send Message
            </Button>
          </div>
        </div>
      </section>

      {/* Caterer Details Dialog */}
      <CatererDetailsDialog
        caterer={selectedCatererForDetails}
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        onBookNow={(caterer) => {
          setIsDetailsDialogOpen(false);
          handleBookNow(caterer);
        }}
        user={user}
      />
    </div>
  );
}