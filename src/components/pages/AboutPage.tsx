import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Heart, Users, Target, Award } from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps = {}) {
  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description: "We partner only with caterers who share our commitment to exceptional quality and service."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Supporting local businesses and bringing the Iloilo community together through food."
    },
    {
      icon: Target,
      title: "Reliability",
      description: "Dependable service you can count on for your most important events."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Striving for excellence in every interaction and every event we help create."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About iCATERYou
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Connecting Iloilo City with the finest catering services for unforgettable events
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Story
            </h2>
            <div className="text-lg text-gray-700 space-y-6 leading-relaxed">
              <p>
                Founded in the heart of Iloilo City, iCATERYou was born from a simple vision: to make exceptional catering 
                services accessible to everyone, whether you're planning an intimate family gathering or a grand corporate 
                event.
              </p>
              <p>
                We understand that food brings people together, and every event deserves to be memorable. That's why 
                we've created a platform that connects you with the best local catering providers, each bringing their unique 
                flavors and expertise to your special occasions.
              </p>
              <p>
                From traditional Filipino cuisine to international delicacies, our network of trusted caterers ensures that your 
                event will be both delicious and unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 bg-orange-50 border-orange-200">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To revolutionize the catering industry in Iloilo City by providing a seamless, reliable platform that connects event 
                  organizers with exceptional caterers, making every celebration memorable and stress-free.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-pink-50 border-pink-200">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become the leading catering marketplace in the Philippines, known for our commitment to quality, 
                  community support, and innovation in event dining experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to connecting Iloilo City with exceptional catering experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Matthew Gorion",
                role: "Founder & CEO",
                description: "Passionate about bringing the best of Iloilo's culinary scene to every event."
              },
              {
                name: "Wayne Christian Castro",
                role: "Technical Lead",
                description: "Leading our technology initiatives to provide innovative solutions for our platform."
              },
              {
                name: "Ranz Saycon",
                role: "Customer Success Manager",
                description: "Dedicated to making every customer experience memorable and seamless."
              },
              {
                name: "Von Joshua Lete",
                role: "Head of Operations",
                description: "Ensuring smooth operations and exceptional service delivery for all our partners."
              }
            ].map((member, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-gray-600">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Trusted Caterers" },
              { number: "1,000+", label: "Happy Clients" },
              { number: "2,500+", label: "Events Catered" },
              { number: "4.9★", label: "Average Rating" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your Perfect Event?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust iCATERYou for their catering needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate?.('services')}
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3"
            >
              Browse Services
            </Button>
            <Button 
              onClick={() => onNavigate?.('contact')}
              variant="outline" 
              size="lg"
              className="border-white text-orange-600 hover:bg-gray-100 px-8 py-3"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}