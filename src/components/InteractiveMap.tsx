import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  Plus, 
  Minus, 
  Navigation,
  Search,
  Coffee,
  UtensilsCrossed,
  Building2,
  Car
} from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  type: 'office' | 'partner' | 'landmark';
  x: number;
  y: number;
  address: string;
  description?: string;
}

const mockLocations: MapLocation[] = [
  {
    id: '1',
    name: 'iCATERYou Headquarters',
    type: 'office',
    x: 50,
    y: 50,
    address: 'Gen. Luna Street, Iloilo City',
    description: 'Our main office and customer service center'
  },
  {
    id: '2',
    name: 'Megaworld Boulevard',
    type: 'landmark',
    x: 65,
    y: 35,
    address: 'Megaworld Boulevard, Iloilo Business Park',
    description: 'Major business district'
  },
  {
    id: '3',
    name: 'Jaro Plaza',
    type: 'landmark',
    x: 35,
    y: 60,
    address: 'Jaro District, Iloilo City',
    description: 'Historic town square'
  },
  {
    id: '4',
    name: 'Partner Caterer - Flavors of Iloilo',
    type: 'partner',
    x: 40,
    y: 40,
    address: 'Iznart Street, Iloilo City',
    description: 'Authentic Ilonggo cuisine specialist'
  },
  {
    id: '5',
    name: 'Partner Caterer - Garden Delights',
    type: 'partner',
    x: 70,
    y: 55,
    address: 'Mandurriao District, Iloilo City',
    description: 'Premium event catering services'
  },
  {
    id: '6',
    name: 'SM City Iloilo',
    type: 'landmark',
    x: 80,
    y: 45,
    address: 'Mandurriao, Iloilo City',
    description: 'Major shopping center'
  }
];

export function InteractiveMap() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const filteredLocations = mockLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'office':
        return <Building2 className="w-4 h-4" />;
      case 'partner':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'landmark':
        return <MapPin className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'office':
        return 'bg-orange-500 border-orange-600';
      case 'partner':
        return 'bg-blue-500 border-blue-600';
      case 'landmark':
        return 'bg-gray-500 border-gray-600';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setPan(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const centerOnLocation = (location: MapLocation) => {
    const mapWidth = mapRef.current?.offsetWidth || 400;
    const mapHeight = mapRef.current?.offsetHeight || 400;
    
    setPan({
      x: (mapWidth / 2) - (location.x * zoom * 4),
      y: (mapHeight / 2) - (location.y * zoom * 4)
    });
    setSelectedLocation(location);
    setSearchQuery('');
    setShowSearch(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <div className="bg-white rounded-lg shadow-md p-2 flex flex-col gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={handleZoomIn}
            className="w-8 h-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleZoomOut}
            className="w-8 h-8 p-0"
          >
            <Minus className="w-4 h-4" />
          </Button>
        </div>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowSearch(!showSearch)}
          className="bg-white shadow-md"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Search Panel */}
      {showSearch && (
        <div className="absolute top-4 left-20 z-20 bg-white rounded-lg shadow-lg p-4 w-64">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredLocations.map(location => (
              <div
                key={location.id}
                onClick={() => centerOnLocation(location)}
                className="p-2 hover:bg-gray-50 cursor-pointer rounded border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  {getLocationIcon(location.type)}
                  <span className="font-medium text-sm">{location.name}</span>
                </div>
                <p className="text-xs text-gray-600">{location.address}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Map Container */}
      <div 
        ref={mapRef}
        className="relative w-full h-96 bg-gradient-to-br from-green-100 via-blue-50 to-green-200 overflow-hidden cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Map Background Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            backgroundImage: `
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Rivers/Streets */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
          }}
        >
          <div className="absolute bg-blue-300 opacity-60 h-2 w-80 top-32 left-10 rounded"></div>
          <div className="absolute bg-blue-300 opacity-60 h-2 w-60 top-48 left-40 rounded transform rotate-45"></div>
          <div className="absolute bg-gray-400 opacity-40 h-1 w-96 top-40 left-0 rounded"></div>
          <div className="absolute bg-gray-400 opacity-40 h-1 w-72 top-60 left-20 rounded"></div>
        </div>

        {/* Location Markers */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
          }}
        >
          {mockLocations.map(location => (
            <div
              key={location.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-125 ${
                selectedLocation?.id === location.id ? 'scale-125 z-10' : ''
              }`}
              style={{
                left: `${location.x * 4}px`,
                top: `${location.y * 4}px`
              }}
              onClick={() => setSelectedLocation(location)}
            >
              <div className={`w-8 h-8 rounded-full border-2 text-white flex items-center justify-center shadow-lg ${getLocationColor(location.type)}`}>
                {getLocationIcon(location.type)}
              </div>
              {selectedLocation?.id === location.id && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 w-48 z-20">
                  <h4 className="font-semibold text-sm mb-1">{location.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{location.address}</p>
                  {location.description && (
                    <p className="text-xs text-gray-500">{location.description}</p>
                  )}
                  <Badge variant="outline" className="mt-2 text-xs">
                    {location.type === 'office' ? 'Our Office' : 
                     location.type === 'partner' ? 'Partner' : 'Landmark'}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-3">
          <h4 className="font-semibold text-sm mb-2">Legend</h4>
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                <Building2 className="w-2 h-2 text-white" />
              </div>
              <span>Our Office</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <UtensilsCrossed className="w-2 h-2 text-white" />
              </div>
              <span>Partners</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500 flex items-center justify-center">
                <MapPin className="w-2 h-2 text-white" />
              </div>
              <span>Landmarks</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2">
          <p className="text-xs text-gray-600">Click and drag to pan • Click markers for details</p>
        </div>
      </div>
    </div>
  );
}