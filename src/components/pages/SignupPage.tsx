import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { 
  Mail, 
  Lock, 
  User, 
  Utensils,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  FileText
} from 'lucide-react';
import { UserType } from '../../App';
import { toast } from 'sonner@2.0.3';

interface SignupPageProps {
  onNavigate: (page: string) => void;
  onSignup: (user: { type: UserType; name: string }) => void;
}

export function SignupPage({ onNavigate, onSignup }: SignupPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('client');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const [clientData, setClientData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [providerData, setProviderData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    location: '',
    description: '',
    password: '',
    confirmPassword: ''
  });

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientData(prev => ({ ...prev, [name]: value }));
  };

  const handleProviderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProviderData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      toast.error('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    const userType = activeTab as UserType;
    let userName = '';

    if (userType === 'client') {
      if (!clientData.firstName || !clientData.lastName || !clientData.email || !clientData.password) {
        toast.error('Please fill in all required fields');
        return;
      }
      if (clientData.password !== clientData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (clientData.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
      userName = `${clientData.firstName} ${clientData.lastName}`;
    } else {
      if (!providerData.businessName || !providerData.ownerName || !providerData.email || !providerData.password) {
        toast.error('Please fill in all required fields');
        return;
      }
      if (providerData.password !== providerData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (providerData.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
      userName = providerData.businessName;
    }

    // Mock signup - in real app this would create account with backend
    onSignup({
      type: userType,
      name: userName
    });

    toast.success(`Welcome to iCATERYou, ${userName}! Your account has been created successfully.`);

    // Navigate to appropriate dashboard
    if (userType === 'client') {
      onNavigate('client-dashboard');
    } else {
      onNavigate('provider-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">iC</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">iCATERYou</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join the best catering platform in Iloilo City
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Client</span>
                </TabsTrigger>
                <TabsTrigger value="provider" className="flex items-center space-x-2">
                  <Utensils className="w-4 h-4" />
                  <span>Provider</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="client" className="space-y-4 mt-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    Create a client account to book catering services
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={clientData.firstName}
                        onChange={handleClientChange}
                        placeholder="John"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={clientData.lastName}
                        onChange={handleClientChange}
                        placeholder="Doe"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={clientData.email}
                        onChange={handleClientChange}
                        placeholder="your.email@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="phone"
                        name="phone"
                        required
                        value={clientData.phone}
                        onChange={handleClientChange}
                        placeholder="+63 123 456 7890"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={clientData.password}
                        onChange={handleClientChange}
                        placeholder="Create a password"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={clientData.confirmPassword}
                        onChange={handleClientChange}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <button type="button" className="text-orange-600 hover:text-orange-500">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-orange-600 hover:text-orange-500">
                        Privacy Policy
                      </button>
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                  >
                    Create Client Account
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="provider" className="space-y-4 mt-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    Create a provider account to offer catering services
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <div className="relative mt-1">
                      <Utensils className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="businessName"
                        name="businessName"
                        required
                        value={providerData.businessName}
                        onChange={handleProviderChange}
                        placeholder="Your Catering Business"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="ownerName"
                        name="ownerName"
                        required
                        value={providerData.ownerName}
                        onChange={handleProviderChange}
                        placeholder="Your full name"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="provider-email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="provider-email"
                        name="email"
                        type="email"
                        required
                        value={providerData.email}
                        onChange={handleProviderChange}
                        placeholder="business@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="provider-phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="provider-phone"
                        name="phone"
                        required
                        value={providerData.phone}
                        onChange={handleProviderChange}
                        placeholder="+63 123 456 7890"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Business Location</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="location"
                        name="location"
                        required
                        value={providerData.location}
                        onChange={handleProviderChange}
                        placeholder="Iloilo City, Philippines"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Business Description</Label>
                    <div className="relative mt-1">
                      <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        id="description"
                        name="description"
                        required
                        value={providerData.description}
                        onChange={handleProviderChange}
                        placeholder="Brief description of your catering services..."
                        rows={3}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="provider-password">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="provider-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={providerData.password}
                        onChange={handleProviderChange}
                        placeholder="Create a password"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="provider-confirmPassword">Confirm Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="provider-confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={providerData.confirmPassword}
                        onChange={handleProviderChange}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="provider-terms" 
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    />
                    <label htmlFor="provider-terms" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <button type="button" className="text-orange-600 hover:text-orange-500">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-orange-600 hover:text-orange-500">
                        Privacy Policy
                      </button>
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                  >
                    Create Provider Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  onClick={() => onNavigate('login')}
                  className="text-orange-600 hover:text-orange-500 font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <button 
            onClick={() => onNavigate('home')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}