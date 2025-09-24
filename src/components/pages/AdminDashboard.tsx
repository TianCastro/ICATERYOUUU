import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { CheckCircle, X, Eye, Shield, ArrowLeft, Clock, Users, FileText, AlertTriangle, UserCheck, Building } from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  user: { type: 'admin' | 'client' | 'provider'; name: string; verified?: boolean } | null;
  pendingVerifications: any[];
  onApproveVerification: (userId: string) => void;
  onRejectVerification: (userId: string, reason: string) => void;
}

export function AdminDashboard({ 
  onNavigate, 
  user, 
  pendingVerifications, 
  onApproveVerification, 
  onRejectVerification 
}: AdminDashboardProps) {
  const [selectedVerification, setSelectedVerification] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  if (!user || user.type !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Access denied. Admin privileges required.</p>
          <Button onClick={() => onNavigate('home')} className="mt-4">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleApprove = (verification: any) => {
    onApproveVerification(verification.userId);
    setSelectedVerification(null);
  };

  const handleReject = (verification: any) => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    onRejectVerification(verification.userId, rejectReason);
    setSelectedVerification(null);
    setRejectReason('');
    setShowRejectDialog(false);
  };

  const clientVerifications = pendingVerifications.filter(v => v.userType === 'client');
  const providerVerifications = pendingVerifications.filter(v => v.userType === 'provider');

  const renderVerificationCard = (verification: any) => (
    <Card key={verification.userId} className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {verification.userType === 'provider' ? (
              <Building className="w-5 h-5 text-blue-600" />
            ) : (
              <UserCheck className="w-5 h-5 text-green-600" />
            )}
            <div>
              <CardTitle className="text-lg">{verification.businessName}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Badge variant={verification.userType === 'provider' ? 'default' : 'secondary'}>
                  {verification.userType}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Submitted {new Date(verification.submittedAt).toLocaleDateString()}
                </span>
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
            <Clock className="w-4 h-4 mr-1" />
            Pending Review
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Phone:</span> {verification.contactPhone}
            </div>
            <div>
              <span className="font-medium">ID Type:</span> {verification.idType?.replace('_', ' ')}
            </div>
            <div>
              <span className="font-medium">ID Number:</span> {verification.idNumber}
            </div>
            {verification.userType === 'provider' && verification.businessType && (
              <div>
                <span className="font-medium">Business Type:</span> {verification.businessType}
              </div>
            )}
          </div>
          
          {verification.businessAddress && (
            <div className="text-sm">
              <span className="font-medium">Address:</span>
              <p className="text-muted-foreground mt-1">{verification.businessAddress}</p>
            </div>
          )}

          {verification.description && (
            <div className="text-sm">
              <span className="font-medium">Description:</span>
              <p className="text-muted-foreground mt-1">{verification.description}</p>
            </div>
          )}

          <div className="flex items-center gap-2 mt-4">
            <Button onClick={() => setSelectedVerification(verification)} variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Review Documents
            </Button>
            <Button 
              onClick={() => handleApprove(verification)} 
              className="bg-green-600 hover:bg-green-700" 
              size="sm"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button 
              onClick={() => {
                setSelectedVerification(verification);
                setShowRejectDialog(true);
              }} 
              variant="destructive" 
              size="sm"
            >
              <X className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('home')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage verification requests and platform oversight</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingVerifications.length}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Client Requests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientVerifications.length}</div>
              <p className="text-xs text-muted-foreground">
                Client verifications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Provider Requests</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{providerVerifications.length}</div>
              <p className="text-xs text-muted-foreground">
                Provider verifications
              </p>
            </CardContent>
          </Card>
        </div>

        {pendingVerifications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-xl font-semibold mb-2">No Pending Verifications</h2>
              <p className="text-muted-foreground">
                All verification requests have been processed. Great job!
              </p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Requests ({pendingVerifications.length})</TabsTrigger>
              <TabsTrigger value="clients">Clients ({clientVerifications.length})</TabsTrigger>
              <TabsTrigger value="providers">Providers ({providerVerifications.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {pendingVerifications.map(renderVerificationCard)}
              </div>
            </TabsContent>

            <TabsContent value="clients">
              <div className="space-y-4">
                {clientVerifications.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground">No pending client verifications</p>
                    </CardContent>
                  </Card>
                ) : (
                  clientVerifications.map(renderVerificationCard)
                )}
              </div>
            </TabsContent>

            <TabsContent value="providers">
              <div className="space-y-4">
                {providerVerifications.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground">No pending provider verifications</p>
                    </CardContent>
                  </Card>
                ) : (
                  providerVerifications.map(renderVerificationCard)
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Document Review Dialog */}
        {selectedVerification && !showRejectDialog && (
          <Dialog open={!!selectedVerification} onOpenChange={() => setSelectedVerification(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" aria-describedby="verification-review-description">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Review: {selectedVerification.businessName}
                </DialogTitle>
                <DialogDescription id="verification-review-description">
                  Review all submitted documents and information for verification approval
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium mb-2">Contact Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Name/Business:</span> {selectedVerification.businessName}</p>
                      <p><span className="font-medium">Phone:</span> {selectedVerification.contactPhone}</p>
                      <p><span className="font-medium">Address:</span> {selectedVerification.businessAddress}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Identification</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">ID Type:</span> {selectedVerification.idType?.replace('_', ' ')}</p>
                      <p><span className="font-medium">ID Number:</span> {selectedVerification.idNumber}</p>
                      <p><span className="font-medium">User Type:</span> {selectedVerification.userType}</p>
                    </div>
                  </div>
                </div>

                {/* Document Status */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-3">Submitted Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">ID Front Photo</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">ID Back Photo</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Selfie Verification</span>
                    </div>
                    {selectedVerification.userType === 'provider' && (
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Business License</span>
                      </div>
                    )}
                  </div>
                </div>

                <Alert>
                  <Shield className="w-4 h-4" />
                  <AlertDescription>
                    Please review all information carefully before approving. This action will grant the user verified status and access to platform features.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedVerification(null)}>
                    Close
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowRejectDialog(true);
                    }} 
                    variant="destructive"
                  >
                    Reject
                  </Button>
                  <Button 
                    onClick={() => handleApprove(selectedVerification)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve Verification
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Reject Dialog */}
        {showRejectDialog && selectedVerification && (
          <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
            <DialogContent aria-describedby="reject-dialog-description">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Reject Verification
                </DialogTitle>
                <DialogDescription id="reject-dialog-description">
                  Please provide a reason for rejecting {selectedVerification?.businessName || 'this'} verification request.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Rejection Reason</label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full mt-2 p-3 border rounded-lg resize-none"
                    rows={4}
                    placeholder="Please explain why this verification is being rejected..."
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => {
                    setShowRejectDialog(false);
                    setRejectReason('');
                  }}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => handleReject(selectedVerification)}
                    variant="destructive"
                    disabled={!rejectReason.trim()}
                  >
                    Reject Verification
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}