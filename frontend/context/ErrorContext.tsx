"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CodeError, FixSuggestion, getFixSuggestions } from "@/utils/errorDetection";

interface ErrorContextType {
  errors: CodeError[];
  addError: (error: CodeError) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
  showFixPopup: boolean;
  selectedError: CodeError | null;
  fixSuggestions: FixSuggestion[];
  selectedFix: number;
  openFixPopup: (error: CodeError) => void;
  closeFixPopup: () => void;
  selectFix: (index: number) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<CodeError[]>([]);
  const [showFixPopup, setShowFixPopup] = useState(false);
  const [selectedError, setSelectedError] = useState<CodeError | null>(null);
  const [fixSuggestions, setFixSuggestions] = useState<FixSuggestion[]>([]);
  const [selectedFix, setSelectedFix] = useState(0);

  const addError = (error: CodeError) => {
    setErrors((prev) => {
      if (prev.some((e) => e.id === error.id)) {
        return prev;
      }
      return [...prev, error];
    });
  };

  const removeError = (id: string) => {
    setErrors((prev) => prev.filter((e) => e.id !== id));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const openFixPopup = (error: CodeError) => {
    setSelectedError(error);
    const suggestions = getFixSuggestions(error);
    setFixSuggestions(suggestions);
    setSelectedFix(0);
    setShowFixPopup(true);
  };

  const closeFixPopup = () => {
    setShowFixPopup(false);
    setSelectedError(null);
    setFixSuggestions([]);
    setSelectedFix(0);
  };

  const selectFix = (index: number) => {
    setSelectedFix(index);
  };

  return (
    <ErrorContext.Provider
      value={{
        errors,
        addError,
        removeError,
        clearErrors,
        showFixPopup,
        selectedError,
        fixSuggestions,
        selectedFix,
        openFixPopup,
        closeFixPopup,
        selectFix,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
}
