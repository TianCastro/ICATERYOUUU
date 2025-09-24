import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Star, 
  Users, 
  TrendingUp, 
  Calendar, 
  Utensils, 
  MapPin, 
  Smartphone,
  Search,
  CreditCard,
  PartyPopper
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
  user?: { type: 'client' | 'provider' | null; name: string } | null;
}

export function HomePage({ onNavigate, user }: HomePageProps) {
  const stats = [
    { label: "Service Caterers", value: "50+", icon: Utensils },
    { label: "Happy Clients", value: "1000+", icon: Users },
    { label: "Average Rating", value: "4.9★", icon: Star },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book catering services in just a few clicks with real-time availability."
    },
    {
      icon: Utensils,
      title: "Diverse Options",
      description: "Choose from a wide variety of cuisines and specialties from local caterers."
    },
    {
      icon: MapPin,
      title: "Trusted Providers",
      description: "All caterers are verified and reviewed by our community."
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Access our platform anywhere, anytime from any device."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Browse & Compare",
      description: "Explore verified caterers, menus, and pricing options tailored to your event needs."
    },
    {
      number: "2",
      title: "Book & Customize",
      description: "Select your preferred caterer, customize your menu, and book your event date."
    },
    {
      number: "3",
      title: "Enjoy Your Event",
      description: "Relax while professional caterers ensure your event has unforgettable dining."
    }
  ];

  const testimonials = [
    {
      name: "Matthew Goron",
      rating: 5,
      text: "iCATERYou made planning our wedding so much easier! The perfect caterer for our special day.",
      event: "Wedding"
    },
    {
      name: "Maria Santos",
      rating: 5,
      text: "My company's annual party was a huge success thanks to their catering services and easy platform.",
      event: "Corporate Event"
    },
    {
      name: "John Garcia",
      rating: 5,
      text: "Any party is better with great food! iCATERYou connected us with the best caterers in the city.",
      event: "Birthday Party"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 to-pink-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div>
              <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">
                🍽️ Simply delicious
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Delicious Catering
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                  Made Simple
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Connect with trusted catering services in Iloilo City. From intimate gatherings to grand celebrations, find the perfect caterer for your special event.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('services')}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3"
                >
                  Browse Caterers
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('signup')}
                  className="border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-3"
                >
                  Join as Provider
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image/Card */}
            <div className="relative">
              <Card className="bg-white shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Utensils className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Premium Catering</h3>
                        <p className="text-sm text-gray-600">Professional Service</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Available</Badge>
                  </div>
                  
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1595507059318-baf4e186c77f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMGZvb2QlMjBjYXRlcmluZ3xlbnwxfHx8fDE3NTg0NTU4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Premium Catering"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      Serves 50-300 guests
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      Professional service staff
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">₱45,000</div>
                      <div className="text-sm text-gray-600">starting price</div>
                    </div>
                    <Button 
                      onClick={() => {
                        if (!user) {
                          onNavigate('login');
                        } else if (user.type === 'client') {
                          onNavigate('services');
                        } else {
                          alert('Please sign up as a client to book catering services.');
                        }
                      }}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose iCATERYou?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've revolutionized the catering booking experience in Iloilo City with our innovative platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get your event catered in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-8"></div>
                )}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.event}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make Your Event Unforgettable?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust iCATERYou for their catering needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate('services')}
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3"
            >
              Start Browsing
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate('contact')}
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}