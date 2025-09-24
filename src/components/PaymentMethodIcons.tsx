import React from 'react';

// GCash Logo Component
export function GCashIcon({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-blue-500 rounded ${className}`}>
      <span className="text-white font-bold text-xs">G</span>
    </div>
  );
}

// PayMaya Logo Component
export function PayMayaIcon({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-green-500 rounded ${className}`}>
      <span className="text-white font-bold text-xs">PM</span>
    </div>
  );
}

// GrabPay Logo Component
export function GrabPayIcon({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-emerald-600 rounded ${className}`}>
      <span className="text-white font-bold text-xs">GP</span>
    </div>
  );
}

// BPI Logo Component
export function BPIIcon({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-red-600 rounded ${className}`}>
      <span className="text-white font-bold text-xs">BPI</span>
    </div>
  );
}

// BDO Logo Component
export function BDOIcon({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-blue-700 rounded ${className}`}>
      <span className="text-white font-bold text-xs">BDO</span>
    </div>
  );
}

// Metrobank Logo Component
export function MetrobankIcon({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-yellow-600 rounded ${className}`}>
      <span className="text-white font-bold text-xs">MB</span>
    </div>
  );
}