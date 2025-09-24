import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Badge } from '../ui/badge';
import { 
  Calendar as CalendarIcon, 
  Users, 
  MapPin, 
  Clock,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Utensils,
  Smartphone,
  Wallet,
  Building,
  Shield
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { GCashIcon, PayMayaIcon, GrabPayIcon, BPIIcon, BDOIcon, MetrobankIcon } from '../PaymentMethodIcons';

interface BookingPageProps {
  onNavigate: (page: string) => void;
  user: { type: 'client' | 'provider' | null; name: string } | null;
  selectedCaterer?: any;
}

export function BookingPage({ onNavigate, user, selectedCaterer }: BookingPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  const [bookingData, setBookingData] = useState({
    eventType: '',
    guestCount: '',
    eventDate: '',
    eventTime: '',
    venue: '',
    specialRequests: '',
    contactPhone: '',
    contactEmail: user?.name ? `${user.name.toLowerCase().replace(' ', '.')}@example.com` : ''
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentData, setPaymentData] = useState({
    // Credit/Debit Card
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Digital Wallets
    phoneNumber: '',
    accountNumber: '',
    pin: '',
    
    // Installment options
    installmentPlan: ''
  });

  // Mock caterer data if none selected
  const caterer = selectedCaterer || {
    id: 1,
    name: "Delicious Delights Catering",
    rating: 4.8,
    reviews: 124,
    description: "Premium catering services specializing in Filipino and international cuisine",
    location: "Iloilo City",
    guests: "50-300",
    price: "₱300-500",
    image: "https://images.unsplash.com/photo-1595507059318-baf4e186c77f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMGZvb2QlMjBjYXRlcmluZ3xlbnwxfHx8fDE3NTg0NTU4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };

  const eventTypes = [
    'Wedding Reception',
    'Corporate Event',
    'Birthday Party',
    'Anniversary',
    'Baby Shower',
    'Graduation Party',
    'Holiday Celebration',
    'Other'
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  const paymentMethods = [
    {
      id: 'gcash',
      name: 'GCash',
      icon: GCashIcon,
      lucideIcon: Smartphone,
      type: 'digital_wallet',
      description: 'Pay securely with your GCash account',
      color: 'bg-blue-500',
      popular: true
    },
    {
      id: 'paymaya',
      name: 'PayMaya',
      icon: PayMayaIcon,
      lucideIcon: Wallet,
      type: 'digital_wallet',
      description: 'Quick payment with PayMaya',
      color: 'bg-green-500'
    },
    {
      id: 'grab_pay',
      name: 'GrabPay',
      icon: GrabPayIcon,
      lucideIcon: Wallet,
      type: 'digital_wallet',
      description: 'Pay with GrabPay wallet',
      color: 'bg-emerald-600'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      lucideIcon: CreditCard,
      type: 'card',
      description: 'Visa, Mastercard, and other cards',
      color: 'bg-gray-600'
    },
    {
      id: 'bpi',
      name: 'BPI Online',
      icon: BPIIcon,
      lucideIcon: Building,
      type: 'bank',
      description: 'Bank of the Philippine Islands',
      color: 'bg-red-600'
    },
    {
      id: 'bdo',
      name: 'BDO Online',
      icon: BDOIcon,
      lucideIcon: Building,
      type: 'bank',
      description: 'Banco de Oro online banking',
      color: 'bg-blue-700'
    },
    {
      id: 'metrobank',
      name: 'Metrobank',
      icon: MetrobankIcon,
      lucideIcon: Building,
      type: 'bank',
      description: 'Metrobank online banking',
      color: 'bg-yellow-600'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const getSelectedPaymentMethod = () => {
    return paymentMethods.find(method => method.id === paymentMethod);
  };

  const calculateEstimate = () => {
    const guestCount = parseInt(bookingData.guestCount) || 0;
    const basePrice = 350; // Average price per person
    return guestCount * basePrice;
  };

  const calculateDeposit = () => {
    const total = calculateEstimate();
    return Math.round(total * 0.3); // 30% deposit
  };

  const calculateBalance = () => {
    const total = calculateEstimate();
    const deposit = calculateDeposit();
    return total - deposit;
  };

  const handleSubmitBooking = () => {
    if (step === 1) {
      // Validate form with detailed error messages
      const missingFields = [];
      if (!bookingData.eventType) missingFields.push('Event Type');
      if (!bookingData.guestCount) missingFields.push('Number of Guests');
      if (!selectedDate) missingFields.push('Event Date');
      if (!bookingData.eventTime) missingFields.push('Event Time');
      
      if (missingFields.length > 0) {
        alert(`Please fill in the following required fields:\n• ${missingFields.join('\n• ')}`);
        return;
      }
      
      // Additional validation
      const guestCount = parseInt(bookingData.guestCount);
      if (guestCount < 1 || guestCount > 1000) {
        alert('Please enter a valid number of guests (1-1000)');
        return;
      }
      
      setStep(2);
    } else if (step === 2) {
      // Validate payment method selection
      if (!paymentMethod) {
        alert('Please select a payment method');
        return;
      }

      // Validate payment fields based on method type
      const selectedMethod = getSelectedPaymentMethod();
      if (selectedMethod?.type === 'card') {
        if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardName) {
          alert('Please fill in all card details');
          return;
        }
      } else if (selectedMethod?.type === 'digital_wallet') {
        if (!paymentData.phoneNumber) {
          alert('Please enter your mobile number for digital wallet payment');
          return;
        }
      } else if (selectedMethod?.type === 'bank') {
        if (!paymentData.accountNumber) {
          alert('Please enter your account information for online banking');
          return;
        }
      }

      // Process payment (mock)
      setStep(3);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-8">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for choosing {caterer.name}. Your booking has been submitted and you'll receive a confirmation email shortly.
              </p>
              
              {getSelectedPaymentMethod() && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    {getSelectedPaymentMethod()?.lucideIcon && 
                      React.createElement(getSelectedPaymentMethod().lucideIcon, { className: "w-5 h-5 text-blue-600" })
                    }
                    <h4 className="font-medium text-blue-900">Payment Confirmation</h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    {getSelectedPaymentMethod()?.type === 'digital_wallet' && 
                      `Your ₱${calculateDeposit().toLocaleString()} deposit has been processed via ${getSelectedPaymentMethod()?.name}. Transaction ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`
                    }
                    {getSelectedPaymentMethod()?.type === 'card' && 
                      `Your ₱${calculateDeposit().toLocaleString()} deposit has been charged to your card ending in ****${paymentData.cardNumber.slice(-4)}. Transaction ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`
                    }
                    {getSelectedPaymentMethod()?.type === 'bank' && 
                      `Your ₱${calculateDeposit().toLocaleString()} deposit has been processed through ${getSelectedPaymentMethod()?.name}. Reference ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`
                    }
                  </p>
                </div>
              )}
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold mb-4">Booking Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Event:</span>
                    <span>{bookingData.eventType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{selectedDate ? formatDate(selectedDate) : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{bookingData.eventTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{bookingData.guestCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span>{getSelectedPaymentMethod()?.name || 'Not selected'}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span>Deposit Paid:</span>
                      <span className="text-green-600 font-semibold">₱{calculateDeposit().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Balance Due:</span>
                      <span>₱{calculateBalance().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span>Total Cost:</span>
                      <span className="font-bold text-lg">₱{calculateEstimate().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => onNavigate('client-dashboard')}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => onNavigate('services')}
                  className="flex-1"
                >
                  Book Another Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('services')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book {caterer.name}
          </h1>
          <p className="text-gray-600">
            Step {step} of 2: {step === 1 ? 'Event Details' : 'Payment Information'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 ? 'Event Details' : 'Payment Information'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {step === 1 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventType">Event Type *</Label>
                        <Select 
                          value={bookingData.eventType} 
                          onValueChange={(value) => handleInputChange('eventType', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypes.map(type => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="guestCount">Number of Guests *</Label>
                        <Input
                          id="guestCount"
                          type="number"
                          value={bookingData.guestCount}
                          onChange={(e) => handleInputChange('guestCount', e.target.value)}
                          placeholder="e.g. 150"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Event Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal mt-1"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? formatDate(selectedDate) : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label htmlFor="eventTime">Event Time *</Label>
                        <Select 
                          value={bookingData.eventTime} 
                          onValueChange={(value) => handleInputChange('eventTime', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="venue">Event Venue</Label>
                      <Input
                        id="venue"
                        value={bookingData.venue}
                        onChange={(e) => handleInputChange('venue', e.target.value)}
                        placeholder="e.g. Hotel Del Rio, Iloilo City"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactPhone">Contact Phone</Label>
                        <Input
                          id="contactPhone"
                          value={bookingData.contactPhone}
                          onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                          placeholder="+63 123 456 7890"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={bookingData.contactEmail}
                          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                          placeholder="your.email@example.com"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                        placeholder="Any dietary restrictions, special menu requests, or additional services needed..."
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    <Button 
                      onClick={handleSubmitBooking}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-blue-700">
                          <strong>Secure Payment:</strong> Your payment information is protected with end-to-end encryption. This is a demo - no real payments will be processed.
                        </p>
                      </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">Choose Payment Method</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {paymentMethods.map((method) => {
                          const Icon = method.icon;
                          const isCustomIcon = ['gcash', 'paymaya', 'grab_pay', 'bpi', 'bdo', 'metrobank'].includes(method.id);
                          
                          return (
                            <div
                              key={method.id}
                              onClick={() => setPaymentMethod(method.id)}
                              className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                paymentMethod === method.id
                                  ? 'border-orange-500 bg-orange-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {method.popular && (
                                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">
                                  Popular
                                </Badge>
                              )}
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${!isCustomIcon ? method.color : ''}`}>
                                  {isCustomIcon ? (
                                    <Icon className="w-10 h-10" />
                                  ) : (
                                    <Icon className="w-5 h-5 text-white" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium text-gray-900">{method.name}</h3>
                                  <p className="text-sm text-gray-600">{method.description}</p>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 ${
                                  paymentMethod === method.id
                                    ? 'border-orange-500 bg-orange-500'
                                    : 'border-gray-300'
                                }`}>
                                  {paymentMethod === method.id && (
                                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Payment Details Form */}
                    {paymentMethod && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900">
                          Payment Details - {getSelectedPaymentMethod()?.name}
                        </h3>
                        
                        {getSelectedPaymentMethod()?.type === 'card' && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                value={paymentData.cardNumber}
                                onChange={(e) => handlePaymentInputChange('cardNumber', e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                className="mt-1"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input
                                  id="expiryDate"
                                  value={paymentData.expiryDate}
                                  onChange={(e) => handlePaymentInputChange('expiryDate', e.target.value)}
                                  placeholder="MM/YY"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                  id="cvv"
                                  value={paymentData.cvv}
                                  onChange={(e) => handlePaymentInputChange('cvv', e.target.value)}
                                  placeholder="123"
                                  className="mt-1"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input
                                id="cardName"
                                value={paymentData.cardName}
                                onChange={(e) => handlePaymentInputChange('cardName', e.target.value)}
                                placeholder="John Doe"
                                className="mt-1"
                              />
                            </div>
                            
                            {/* Installment Options */}
                            {calculateDeposit() > 5000 && (
                              <div>
                                <Label htmlFor="installmentPlan">Installment Plan (Optional)</Label>
                                <Select 
                                  value={paymentData.installmentPlan} 
                                  onValueChange={(value) => handlePaymentInputChange('installmentPlan', value)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Pay in full" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="">Pay in full</SelectItem>
                                    <SelectItem value="3">3 months (0% interest)</SelectItem>
                                    <SelectItem value="6">6 months (2.5% interest)</SelectItem>
                                    <SelectItem value="12">12 months (5.9% interest)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <p className="text-xs text-gray-500 mt-1">
                                  Available for transactions over ₱5,000
                                </p>
                              </div>
                            )}
                            
                            <div className="bg-gray-50 border border-gray-200 rounded p-3">
                              <div className="flex items-center gap-2 text-sm">
                                <Shield className="w-4 h-4 text-green-600" />
                                <span className="text-gray-700">Secured by 256-bit SSL encryption</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                We accept Visa, Mastercard, American Express, and JCB
                              </p>
                            </div>
                          </div>
                        )}

                        {getSelectedPaymentMethod()?.type === 'digital_wallet' && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="phoneNumber">Mobile Number</Label>
                              <Input
                                id="phoneNumber"
                                value={paymentData.phoneNumber}
                                onChange={(e) => handlePaymentInputChange('phoneNumber', e.target.value)}
                                placeholder="+63 9XX XXX XXXX"
                                className="mt-1"
                              />
                            </div>
                            {paymentMethod === 'gcash' && (
                              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                <p className="text-sm text-blue-700">
                                  <strong>GCash Payment:</strong> You'll be redirected to GCash to complete your payment securely.
                                </p>
                              </div>
                            )}
                            {paymentMethod === 'paymaya' && (
                              <div className="bg-green-50 border border-green-200 rounded p-3">
                                <p className="text-sm text-green-700">
                                  <strong>PayMaya Payment:</strong> Complete your payment through the PayMaya app or website.
                                </p>
                              </div>
                            )}
                            {paymentMethod === 'grab_pay' && (
                              <div className="bg-emerald-50 border border-emerald-200 rounded p-3">
                                <p className="text-sm text-emerald-700">
                                  <strong>GrabPay Payment:</strong> Pay securely using your GrabPay wallet balance.
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {getSelectedPaymentMethod()?.type === 'bank' && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="accountNumber">Account Number</Label>
                              <Input
                                id="accountNumber"
                                value={paymentData.accountNumber}
                                onChange={(e) => handlePaymentInputChange('accountNumber', e.target.value)}
                                placeholder="Enter your account number"
                                className="mt-1"
                              />
                            </div>
                            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                              <p className="text-sm text-yellow-700">
                                <strong>Online Banking:</strong> You'll be redirected to your bank's secure online portal to complete the payment.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button 
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Details
                      </Button>
                      <Button 
                        onClick={handleSubmitBooking}
                        disabled={!paymentMethod}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete Booking
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <ImageWithFallback
                    src={caterer.image}
                    alt={caterer.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{caterer.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {caterer.location}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      Guests
                    </span>
                    <span>{bookingData.guestCount || '0'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Date
                    </span>
                    <span>{selectedDate ? selectedDate.toLocaleDateString() : 'Not selected'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Time
                    </span>
                    <span>{bookingData.eventTime || 'Not selected'}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Estimated Total</span>
                      <span className="font-semibold">₱{calculateEstimate().toLocaleString()}</span>
                    </div>
                    
                    {step === 2 && bookingData.guestCount && (
                      <>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Deposit Required (30%)</span>
                          <span className="text-orange-600 font-medium">₱{calculateDeposit().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Balance Due</span>
                          <span>₱{calculateBalance().toLocaleString()}</span>
                        </div>
                        
                        {paymentMethod && (
                          <div className="flex justify-between items-center text-sm pt-2 border-t">
                            <span className="text-gray-600">Payment Method</span>
                            <span className="font-medium">{getSelectedPaymentMethod()?.name}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    *Final price may vary based on menu selection and additional services
                  </p>
                  
                  {step === 2 && (
                    <p className="text-xs text-orange-600 mt-1">
                      You'll pay the deposit now and the remaining balance after the event
                    </p>
                  )}
                </div>

                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center text-sm text-orange-700">
                    <Utensils className="w-4 h-4 mr-2" />
                    <span>Professional catering service included</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}