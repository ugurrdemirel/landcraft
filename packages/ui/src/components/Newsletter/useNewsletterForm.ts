"use client";
import { useState, type FormEvent } from "react";

export function useNewsletterForm(onSubmit?: (email: string) => void) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email.");
      return;
    }
    setError(null);
    setDone(true);
    onSubmit?.(value);
  };

  const updateEmail = (value: string) => {
    setEmail(value);
    if (error) setError(null);
  };

  return { email, done, error, handleSubmit, updateEmail };
}