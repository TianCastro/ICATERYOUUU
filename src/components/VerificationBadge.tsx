import React from 'react';
import { Badge } from './ui/badge';

interface VerificationBadgeProps {
  verified?: boolean;
  className?: string;
}

export function VerificationBadge({ verified, className = "" }: VerificationBadgeProps) {
  if (!verified) return null;
  
  return (
    <Badge className={`bg-blue-100 text-blue-700 text-xs ${className}`}>
      ✓ Verified
    </Badge>
  );
}