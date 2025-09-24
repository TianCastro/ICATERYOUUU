import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CheckCircle, Upload, Shield, ArrowLeft, FileText, Camera, CreditCard, X, Eye, AlertTriangle, Phone, MessageSquare, UserCheck } from 'lucide-react';
import { VerificationBadge } from '../VerificationBadge';
import { FileUpload } from '../FileUpload';

interface VerificationPageProps {
  onNavigate: (page: string) => void;
  user: { type: 'client' | 'provider'; name: string; verified?: boolean } | null;
  onVerify: (userInfo: any) => void;
}

export function VerificationPage({ onNavigate, user, onVerify }: VerificationPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    businessAddress: '',
    contactPhone: '',
    taxId: '',
    description: '',
    idType: '',
    idNumber: '',
    documents: {
      businessLicense: null,
      insurance: null,
      taxCert: null,
      identification: null,
      idFront: null,
      idBack: null,
      selfie: null
    }
  });
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [idValidation, setIdValidation] = useState<{
    isValid: boolean | null;
    message: string;
  }>({ isValid: null, message: '' });
  const [phoneVerification, setPhoneVerification] = useState({
    code: '',
    sentCode: '',
    verified: false,
    sending: false,
    countdown: 0
  });
  const [phoneError, setPhoneError] = useState('');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Please log in to access verification.</p>
          <Button onClick={() => onNavigate('login')} className="mt-4">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (user.verified) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate(user.type === 'client' ? 'client-dashboard' : 'provider-dashboard')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Account Verified</CardTitle>
              <CardDescription>
                Your account has been successfully verified
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center mb-4">
                <VerificationBadge verified={true} />
              </div>
              <p className="text-muted-foreground mb-6">
                You now have access to all {user.type} features on iCATERYou.
              </p>
              <Button onClick={() => onNavigate(user.type === 'client' ? 'client-dashboard' : 'provider-dashboard')}>
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (documentType: string, file: File | null) => {
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        alert('Please upload only JPEG, PNG, or PDF files.');
        return;
      }

      if (file.size > maxSize) {
        alert('File size must be less than 5MB.');
        return;
      }

      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrls(prev => ({ ...prev, [documentType]: url }));
      }

      setUploadedFiles(prev => ({ ...prev, [documentType]: file }));
    } else {
      // Remove file
      setUploadedFiles(prev => {
        const updated = { ...prev };
        delete updated[documentType];
        return updated;
      });
      
      if (previewUrls[documentType]) {
        URL.revokeObjectURL(previewUrls[documentType]);
        setPreviewUrls(prev => {
          const updated = { ...prev };
          delete updated[documentType];
          return updated;
        });
      }
    }

    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
  };

  const validateIdNumber = (idType: string, idNumber: string) => {
    if (!idNumber) {
      setIdValidation({ isValid: null, message: '' });
      return;
    }

    let isValid = false;
    let message = '';

    switch (idType) {
      case 'drivers_license':
        // Basic validation - alphanumeric, 8-15 characters
        isValid = /^[A-Z0-9]{8,15}$/i.test(idNumber);
        message = isValid ? 'Driver\'s license format is valid' : 'Driver\'s license should be 8-15 alphanumeric characters';
        break;
      case 'passport':
        // Passport format - usually 6-9 characters
        isValid = /^[A-Z0-9]{6,9}$/i.test(idNumber);
        message = isValid ? 'Passport format is valid' : 'Passport should be 6-9 alphanumeric characters';
        break;
      case 'national_id':
        // National ID - varies by country, basic check for 8-20 characters
        isValid = /^[A-Z0-9]{8,20}$/i.test(idNumber);
        message = isValid ? 'National ID format is valid' : 'National ID should be 8-20 alphanumeric characters';
        break;
      case 'state_id':
        // State ID similar to driver's license
        isValid = /^[A-Z0-9]{8,15}$/i.test(idNumber);
        message = isValid ? 'State ID format is valid' : 'State ID should be 8-15 alphanumeric characters';
        break;
      default:
        message = 'Please select an ID type';
    }

    setIdValidation({ isValid, message });
  };

  const handleSendCode = async () => {
    if (!formData.contactPhone || formData.contactPhone.length < 10) {
      setPhoneError('Please enter a valid phone number');
      return;
    }

    setPhoneVerification(prev => ({ ...prev, sending: true }));
    setPhoneError('');
    
    // Simulate sending SMS code
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a random 6-digit code for prototype
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    setPhoneVerification(prev => ({ 
      ...prev, 
      sentCode: code, 
      sending: false,
      countdown: 60 
    }));

    // Start countdown
    const countdownInterval = setInterval(() => {
      setPhoneVerification(prev => {
        if (prev.countdown <= 1) {
          clearInterval(countdownInterval);
          return { ...prev, countdown: 0 };
        }
        return { ...prev, countdown: prev.countdown - 1 };
      });
    }, 1000);

    // Show the code in an alert for prototype purposes
    alert(`SMS Code sent! For prototype, your code is: ${code}`);
  };

  const handleVerifyCode = () => {
    if (phoneVerification.code === phoneVerification.sentCode) {
      setPhoneVerification(prev => ({ ...prev, verified: true }));
      setPhoneError('');
    } else {
      setPhoneError('Invalid verification code. Please try again.');
    }
  };

  const handleSubmit = async () => {
    // Validate all requirements based on final step
    if (!uploadedFiles.idFront || !uploadedFiles.idBack || !uploadedFiles.selfie) {
      alert('Please upload ID photos (front and back) and a selfie.');
      return;
    }

    if (!phoneVerification.verified) {
      alert('Please verify your phone number.');
      return;
    }

    if (user?.type === 'provider' && !uploadedFiles.businessLicense) {
      alert('Please upload your business license.');
      return;
    }

    if (!formData.idNumber || !formData.idType) {
      alert('Please fill in your ID information.');
      return;
    }

    if (idValidation.isValid !== true) {
      alert('Please provide a valid ID number.');
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Submit for admin review instead of auto-approval
    onVerify(formData);
    
    setUploading(false);
    setSubmitted(true);
    
    // Show success message and redirect after delay
    setTimeout(() => {
      onNavigate(user.type === 'client' ? 'client-dashboard' : 'provider-dashboard');
    }, 3000);
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          {user.type === 'client' ? 'Client' : 'Provider'} Verification
        </CardTitle>
        <CardDescription>
          Get verified to {user.type === 'client' ? 'unlock booking features and build trust with providers' : 'add services and accept bookings'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Shield className="w-4 h-4" />
          <AlertDescription>
            Verification helps build trust and security in our community. Your information is kept secure and private.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">
              {user.type === 'client' ? 'Full Name or Company Name' : 'Business Name'}
            </Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder={user.type === 'client' ? 'Enter your full name' : 'Enter your business name'}
            />
          </div>

          {user.type === 'provider' && (
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select onValueChange={(value) => handleInputChange('businessType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="catering">Catering Company</SelectItem>
                  <SelectItem value="food-truck">Food Truck</SelectItem>
                  <SelectItem value="bakery">Bakery</SelectItem>
                  <SelectItem value="individual">Individual Chef</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="businessAddress">Address</Label>
            <Textarea
              id="businessAddress"
              value={formData.businessAddress}
              onChange={(e) => handleInputChange('businessAddress', e.target.value)}
              placeholder="Enter your business address"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Phone Number</Label>
            <Input
              id="contactPhone"
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          {/* ID Verification Section */}
          <div className="border rounded-lg p-4 bg-blue-50/50 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-blue-900">ID Verification</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="idType">ID Type</Label>
              <Select onValueChange={(value) => {
                handleInputChange('idType', value);
                validateIdNumber(value, formData.idNumber);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drivers_license">Driver's License</SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="national_id">National ID</SelectItem>
                  <SelectItem value="state_id">State ID</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => {
                  handleInputChange('idNumber', e.target.value);
                  validateIdNumber(formData.idType, e.target.value);
                }}
                placeholder="Enter your ID number"
                className={idValidation.isValid === false ? 'border-red-500' : idValidation.isValid === true ? 'border-green-500' : ''}
              />
              {idValidation.message && (
                <div className={`flex items-center gap-2 text-sm ${idValidation.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {idValidation.isValid ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                  {idValidation.message}
                </div>
              )}
            </div>
          </div>

          {user.type === 'provider' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / EIN (Optional)</Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                  placeholder="Enter your tax ID or EIN"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your catering business and services"
                  rows={4}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => onNavigate(user.type === 'client' ? 'client-dashboard' : 'provider-dashboard')}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => setStep(2)}
            disabled={!formData.businessName || !formData.businessAddress || !formData.contactPhone || !formData.idType || !formData.idNumber || idValidation.isValid !== true}
          >
            Continue to ID Photos
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          ID Photos & Selfie Verification
        </CardTitle>
        <CardDescription>
          Upload clear photos of your ID and take a selfie for verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Camera className="w-4 h-4" />
          <AlertDescription>
            Please ensure photos are clear, well-lit, and all text is readable. Use a neutral background for best results.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6">
          <FileUpload
            label="ID Front Photo"
            documentType="idFront"
            uploadedFile={uploadedFiles.idFront}
            previewUrl={previewUrls.idFront}
            onFileUpload={handleFileUpload}
            icon="camera"
            description={`Upload a clear photo of the front of your ${formData.idType ? formData.idType.replace('_', ' ') : 'ID'}`}
            required={true}
          />

          <FileUpload
            label="ID Back Photo"
            documentType="idBack"
            uploadedFile={uploadedFiles.idBack}
            previewUrl={previewUrls.idBack}
            onFileUpload={handleFileUpload}
            icon="camera"
            description={`Upload a clear photo of the back of your ${formData.idType ? formData.idType.replace('_', ' ') : 'ID'}`}
            required={true}
          />

          <FileUpload
            label="Selfie Verification"
            documentType="selfie"
            uploadedFile={uploadedFiles.selfie}
            previewUrl={previewUrls.selfie}
            onFileUpload={handleFileUpload}
            icon="user"
            description="Take a clear selfie holding your ID next to your face for verification"
            required={true}
          />
        </div>

        <Alert>
          <Shield className="w-4 h-4" />
          <AlertDescription>
            Your photos are encrypted and securely stored. We only use them for identity verification purposes.
          </AlertDescription>
        </Alert>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button 
            onClick={() => setStep(3)}
            disabled={!uploadedFiles.idFront || !uploadedFiles.idBack || !uploadedFiles.selfie}
          >
            Continue to Phone Verification
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Phone Number Verification
        </CardTitle>
        <CardDescription>
          Verify your phone number to secure your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <MessageSquare className="w-4 h-4" />
          <AlertDescription>
            We'll send a verification code to your phone number: {formData.contactPhone}
          </AlertDescription>
        </Alert>

        {!phoneVerification.verified ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Send Verification Code</Label>
              <div className="flex gap-2">
                <Button 
                  onClick={handleSendCode}
                  disabled={phoneVerification.sending || phoneVerification.countdown > 0}
                  className="flex-shrink-0"
                >
                  {phoneVerification.sending ? 'Sending...' : 
                   phoneVerification.countdown > 0 ? `Resend in ${phoneVerification.countdown}s` : 
                   phoneVerification.sentCode ? 'Resend Code' : 'Send Code'}
                </Button>
                <div className="flex-1 text-sm text-muted-foreground flex items-center">
                  {phoneVerification.sentCode && (
                    <span className="text-green-600">✓ Code sent to {formData.contactPhone}</span>
                  )}
                </div>
              </div>
            </div>

            {phoneVerification.sentCode && (
              <div className="space-y-2">
                <Label htmlFor="verificationCode">Enter Verification Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="verificationCode"
                    value={phoneVerification.code}
                    onChange={(e) => {
                      setPhoneVerification(prev => ({ ...prev, code: e.target.value }));
                      setPhoneError('');
                    }}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleVerifyCode}
                    disabled={phoneVerification.code.length !== 6}
                  >
                    Verify
                  </Button>
                </div>
                {phoneError && (
                  <div className="text-sm text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {phoneError}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Phone Number Verified</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Your phone number {formData.contactPhone} has been successfully verified.
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(2)}>
            Back
          </Button>
          <Button 
            onClick={() => user.type === 'provider' ? setStep(4) : handleSubmit()}
            disabled={!phoneVerification.verified || (user.type === 'client' && uploading)}
          >
            {user.type === 'provider' ? 'Continue to Documents' : uploading ? 'Verifying...' : 'Complete Verification'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Business Documents
        </CardTitle>
        <CardDescription>
          Upload required business documents for provider verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <FileUpload
            label="Business License"
            documentType="businessLicense"
            uploadedFile={uploadedFiles.businessLicense}
            previewUrl={previewUrls.businessLicense}
            onFileUpload={handleFileUpload}
            icon="file"
            description="Upload your business license or permit"
            required={true}
          />

          <FileUpload
            label="Insurance Certificate"
            documentType="insurance"
            uploadedFile={uploadedFiles.insurance}
            previewUrl={previewUrls.insurance}
            onFileUpload={handleFileUpload}
            icon="shield"
            description="Upload proof of liability insurance"
            required={false}
          />

          <FileUpload
            label="Tax Certificate (Optional)"
            documentType="taxCert"
            uploadedFile={uploadedFiles.taxCert}
            previewUrl={previewUrls.taxCert}
            onFileUpload={handleFileUpload}
            icon="credit-card"
            description="Upload tax registration certificate"
            required={false}
          />
        </div>

        <Alert>
          <Shield className="w-4 h-4" />
          <AlertDescription>
            All documents are encrypted and securely stored. We only use them for verification purposes.
          </AlertDescription>
        </Alert>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(3)}>
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={uploading}>
            {uploading ? 'Verifying...' : 'Submit for Verification'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const getCurrentStepComponent = () => {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  const getStepLabels = () => {
    if (user?.type === 'provider') {
      return ['Basic Info & ID', 'ID Photos', 'Phone Verification', 'Documents'];
    } else {
      return ['Basic Info & ID', 'ID Photos', 'Phone Verification'];
    }
  };

  const maxSteps = user?.type === 'provider' ? 4 : 3;

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Verification Submitted</CardTitle>
              <CardDescription>
                Your verification request has been received
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Your verification request has been submitted to our admin team for review. 
                We'll review your documents, ID photos, and information within 1-2 business days. 
                You'll be notified once your account is verified.
              </p>
              <div className="flex justify-center mb-4">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  Pending Admin Review
                </Badge>
              </div>
              <Button onClick={() => onNavigate(user.type === 'client' ? 'client-dashboard' : 'provider-dashboard')}>
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate(user.type === 'client' ? 'client-dashboard' : 'provider-dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {Array.from({ length: maxSteps }, (_, index) => (
              <React.Fragment key={index}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  step > index + 1 ? 'bg-green-500 text-white' : 
                  step >= index + 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {step > index + 1 ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                {index < maxSteps - 1 && (
                  <div className={`flex-1 h-1 ${step > index + 1 ? 'bg-green-500' : step >= index + 2 ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {getStepLabels().map((label, index) => (
              <span key={index} className={`${index === 0 || index === maxSteps - 1 ? '' : 'text-center'}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {getCurrentStepComponent()}
      </div>
    </div>
  );
}