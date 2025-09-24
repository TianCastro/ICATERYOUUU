import React from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { CheckCircle, Upload, Eye, X, FileText, Camera, Shield, CreditCard, UserCheck } from 'lucide-react';

interface FileUploadProps {
  label: string;
  documentType: string;
  uploadedFile?: File;
  previewUrl?: string;
  onFileUpload: (documentType: string, file: File | null) => void;
  icon?: 'camera' | 'file' | 'shield' | 'credit-card' | 'user';
  description?: string;
  required?: boolean;
}

export function FileUpload({ 
  label, 
  documentType, 
  uploadedFile, 
  previewUrl, 
  onFileUpload, 
  icon = 'file',
  description,
  required = false
}: FileUploadProps) {
  const IconComponent = {
    camera: Camera,
    file: FileText,
    shield: Shield,
    'credit-card': CreditCard,
    user: UserCheck
  }[icon];

  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="border-2 border-dashed border-border rounded-lg p-6">
        {uploadedFile ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  {uploadedFile.name}
                </span>
                <span className="text-xs text-green-600">
                  ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <div className="flex items-center gap-2">
                {previewUrl && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(previewUrl, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onFileUpload(documentType, null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {previewUrl && uploadedFile.type.startsWith('image/') && (
              <div className="mt-3 text-center">
                <img 
                  src={previewUrl} 
                  alt="File Preview" 
                  className="max-w-xs max-h-48 mx-auto rounded-lg border"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <IconComponent className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              {description || `Upload your ${label.toLowerCase()}`}
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Accepted formats: JPEG, PNG, PDF (max 5MB)
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => onFileUpload(documentType, e.target.files?.[0] || null)}
              className="hidden"
              id={`${documentType}-upload`}
            />
            <label htmlFor={`${documentType}-upload`}>
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </span>
              </Button>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}