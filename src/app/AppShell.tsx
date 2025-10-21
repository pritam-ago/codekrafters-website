"use client"

import React, { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";
import LandingPage from "./LandingPage";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<'loading' | 'prelanding' | 'main'>('loading');

  useEffect(() => {
    const loadingTimeout = setTimeout(() => setStep('prelanding'), 2000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  if (step === 'loading') return <LoadingPage />;
  if (step === 'prelanding') return <LandingPage onEnter={() => setStep('main')} />;
  return <>{children}</>;
}
