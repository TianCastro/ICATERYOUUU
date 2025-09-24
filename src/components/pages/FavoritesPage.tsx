import React, { useState } from 'react';
import { ArrowLeft, Heart, Star, MapPin, Users, Clock, Phone, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CatererDetailsDialog } from '../CatererDetailsDialog';

interface FavoritesPageProps {
  onNavigate: (page: string) => void;
  user: any;
  favorites: any[];
  onRemoveFromFavorites: (catererId: string) => void;
  onSelectCaterer: (caterer: any) => void;
}

export function FavoritesPage({ 
  onNavigate, 
  user, 
  favorites, 
  onRemoveFromFavorites,
  onSelectCaterer 
}: FavoritesPageProps) {
  const [selectedCatererForDetails, setSelectedCatererForDetails] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const handleBookNow = (caterer: any) => {
    if (!user) {
      onNavigate('login');
      return;
    }
    if (user.type !== 'client') {
      alert('Only clients can book catering services.');
      return;
    }
    onSelectCaterer(caterer);
    onNavigate('booking');
  };

  const handleViewDetails = (caterer: any) => {
    setSelectedCatererForDetails(caterer);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('client-dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">My Favorites</h1>
                <p className="text-sm text-gray-600">
                  {favorites.length} saved caterer{favorites.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start browsing caterers and save your favorites here
            </p>
            <Button onClick={() => onNavigate('services')}>
              Browse Caterers
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((caterer) => (
              <Card key={caterer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={caterer.image}
                    alt={caterer.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white"
                      onClick={() => onRemoveFromFavorites(caterer.id)}
                    >
                      <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    </Button>
                  </div>
                  {caterer.featured && (
                    <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{caterer.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {caterer.rating} ({caterer.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {caterer.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {caterer.capacity} people capacity
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {caterer.experience} experience
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {(caterer.cuisines || caterer.categories || []).slice(0, 3).map((cuisine: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {cuisine}
                      </Badge>
                    ))}
                    {(caterer.cuisines || caterer.categories || []).length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{(caterer.cuisines || caterer.categories || []).length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-primary">
                        {caterer.price || `₱${caterer.priceRange?.min}-${caterer.priceRange?.max}`}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">per person</span>
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

                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {caterer.contact?.phone || 'N/A'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

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