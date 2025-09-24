import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Mail, 
  Lock, 
  User, 
  Utensils,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserType } from '../../App';
import { toast } from 'sonner@2.0.3';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (user: { type: UserType; name: string }) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('client');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Check for admin credentials
    if (formData.email === 'admin@icateryou.com' && formData.password === 'admin123') {
      onLogin({
        type: 'admin',
        name: 'Admin',
        verified: true
      });
      toast.success('Welcome back, Admin!');
      onNavigate('admin');
      return;
    }
    
    // Mock login - in real app this would authenticate with backend
    const userType = activeTab as UserType;
    const userName = formData.email.split('@')[0];
    
    onLogin({
      type: userType,
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      verified: false
    });

    toast.success(`Welcome back, ${userName.charAt(0).toUpperCase() + userName.slice(1)}!`);

    // Navigate to appropriate dashboard
    if (userType === 'client') {
      onNavigate('client-dashboard');
    } else {
      onNavigate('provider-dashboard');
    }
  };

  const handleDemoLogin = (userType: UserType) => {
    const userName = userType === 'client' ? 'Demo Client' : 'Demo Provider';
    onLogin({
      type: userType,
      name: userName
    });

    toast.success(`Logged in as ${userName}!`);

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
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
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
                    Sign in to book catering services and manage your events
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
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
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
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

                  <div className="flex items-center justify-between">
                    <button type="button" className="text-sm text-orange-600 hover:text-orange-500">
                      Forgot password?
                    </button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                  >
                    Sign In as Client
                  </Button>
                </form>

                <Separator />

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDemoLogin('client')}
                >
                  Try Demo Account
                </Button>
              </TabsContent>

              <TabsContent value="provider" className="space-y-4 mt-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    Sign in to manage your catering services and bookings
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="provider-email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="provider-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="pl-10"
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
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
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

                  <div className="flex items-center justify-between">
                    <button type="button" className="text-sm text-orange-600 hover:text-orange-500">
                      Forgot password?
                    </button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                  >
                    Sign In as Provider
                  </Button>
                </form>

                <Separator />

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDemoLogin('provider')}
                >
                  Try Demo Account
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                  onClick={() => onNavigate('signup')}
                  className="text-orange-600 hover:text-orange-500 font-medium"
                >
                  Sign up here
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