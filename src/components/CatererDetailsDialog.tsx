import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Star,
  MapPin,
  Users,
  Clock,
  Phone,
  Mail,
  Award,
  Utensils,
  ChefHat,
  Calendar,
  Heart,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CatererDetailsDialogProps {
  caterer: any;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (caterer: any) => void;
  user?: {
    type: "client" | "provider" | null;
    name: string;
  } | null;
}

export function CatererDetailsDialog({
  caterer,
  isOpen,
  onClose,
  onBookNow,
  user,
}: CatererDetailsDialogProps) {
  const descriptionId = React.useId();

  const menuItems = [
    {
      category: "Appetizers",
      items: [
        "Lumpia Shanghai",
        "Cheese Sticks",
        "Chicken Wings",
        "Fresh Spring Rolls",
      ],
    },
    {
      category: "Main Courses",
      items: [
        "Lechon Kawali",
        "Beef Caldereta",
        "Chicken Adobo",
        "Grilled Fish",
      ],
    },
    {
      category: "Rice & Noodles",
      items: [
        "Garlic Rice",
        "Pancit Canton",
        "Seafood Fried Rice",
        "Bihon Guisado",
      ],
    },
    {
      category: "Desserts",
      items: [
        "Leche Flan",
        "Ube Halaya",
        "Buko Pie",
        "Chocolate Cake",
      ],
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Maria Santos",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely amazing service! The food was delicious and the presentation was beautiful. Perfect for our wedding reception.",
      event: "Wedding Reception",
    },
    {
      id: 2,
      name: "John Rivera",
      rating: 5,
      date: "1 month ago",
      comment:
        "Professional service and excellent food quality. Our corporate event was a huge success thanks to their team.",
      event: "Corporate Event",
    },
    {
      id: 3,
      name: "Lisa Cruz",
      rating: 4,
      date: "2 months ago",
      comment:
        "Great variety of dishes and very accommodating to our dietary restrictions. Highly recommended!",
      event: "Birthday Party",
    },
  ];

  const facilities = [
    "Professional Kitchen Equipment",
    "Serving Staff Available",
    "Table Setup & Decoration",
    "Audio Visual Equipment",
    "Event Coordination",
    "Cleanup Service",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] max-h-[95vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {caterer?.name || "Caterer Details"}
          </DialogTitle>
          <DialogDescription>
            View detailed information about this caterer
            including menu, reviews, and booking options.
          </DialogDescription>
        </DialogHeader>

        {caterer && (
        <div className="space-y-6">
          {/* Hero Section - New Layout */}
          <div className="space-y-4">
            {/* Image with overlays */}
            <div className="relative">
              <ImageWithFallback
                src={caterer.image}
                alt={caterer.name}
                className="w-full h-64 lg:h-72 object-cover rounded-lg"
              />
              {/* Featured badge */}
              <div className="absolute top-3 left-3">
                {caterer.featured && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs">
                    FEATURED
                  </Badge>
                )}
              </div>
              {/* Rating inside image */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold text-sm">
                      {caterer.rating}
                    </span>
                  </div>
                  <span className="text-gray-600 text-xs">
                    ({caterer.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price below image */}
            <div className="text-center bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {caterer.price}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                per person
              </div>
              <Button
                onClick={() => onBookNow(caterer)}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-2"
              >
                Book Now
              </Button>
            </div>

            {/* About section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                About
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed break-words">
                {caterer.description}
              </p>
            </div>

            {/* Contact info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="break-words">
                  {caterer.location}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{caterer.guests} guests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>+63 123 456 7890</span>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="break-all">
                  info@{caterer.name.toLowerCase().replace(/\s+/g, "")}.com
                </span>
              </div>
            </div>

            {/* Quick Info - Now with full width */}
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Quick Info
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="font-medium text-gray-900">2 hours</div>
                  <div className="text-gray-600">Response Time</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="font-medium text-gray-900">7 days</div>
                  <div className="text-gray-600">Advance Booking</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="font-medium text-gray-900">48 hours</div>
                  <div className="text-gray-600">Cancellation</div>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities & Services */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <Award className="w-4 h-4 mr-2 text-orange-500" />
              Facilities & Services
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1.5"></div>
                  <span className="text-sm leading-relaxed break-words">
                    {facility}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <ChefHat className="w-5 h-5 mr-2 text-orange-500" />
              Sample Menu
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3"
                >
                  <h4 className="font-semibold mb-2">
                    {category.category}
                  </h4>
                  <ul className="space-y-1">
                    {category.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-sm text-gray-600 flex items-start"
                      >
                        <Utensils className="w-4 h-4 mr-2 text-orange-400 flex-shrink-0 mt-0.5" />
                        <span className="break-words leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3 break-words leading-relaxed">
              *Menu can be customized based on your
              preferences and dietary requirements
            </p>
          </div>

          {/* Customer Reviews Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Customer Reviews
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {review.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold break-words">
                          {review.name}
                        </div>
                        <div className="text-sm text-gray-500 break-words">
                          {review.event} • {review.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 break-words leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-3 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 text-sm py-2"
            >
              Close
            </Button>
            <Button
              onClick={() => onBookNow(caterer)}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-sm py-2"
            >
              Book This Caterer
            </Button>
          </div>
        </div>
        )}
      </DialogContent>
    </Dialog>
  );
}