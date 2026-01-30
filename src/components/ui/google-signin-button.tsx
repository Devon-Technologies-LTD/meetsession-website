"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { Loader2Icon } from "lucide-react";

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface GoogleSignInButtonProps {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

export function GoogleSignInButton({ onSuccess, onError }: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !window.google) return;

    const handleCredentialResponse = async (response: any) => {
      console.log("Google Sign-In callback triggered", response);
      setIsLoading(true);
      try {
        const idToken = response.credential;
        console.log("ID Token received:", idToken ? idToken.substring(0, 20) + "..." : "null");
        
        console.log("Sending request to backend...");
        const res = await fetch("/api/v1/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id_token: idToken }),
        });

        console.log("Backend response status:", res.status);
        const data = await res.json();
        console.log("Backend response data:", data);

        if (res.ok) {
          console.log("Authentication successful");
          onSuccess?.(data);
        } else {
          console.error("Authentication failed:", data);
          onError?.(data);
        }

      } catch (error) {
        console.error("Error during authentication:", error);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "110195580941-56jd9oiatep3ifhospo4i4jppvdosj1l.apps.googleusercontent.com";
    console.log("Initializing Google Sign-In with Client ID:", clientId);
    console.log("Current Origin:", window.location.origin);

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
      ux_mode: "popup",
      context: "signin",
      use_fedcm_for_prompt: false,
    });
  }, [scriptLoaded, onSuccess, onError]);

  const handleGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      size="pill"
      className="w-full font-medium py-6 cursor-pointer relative overflow-hidden border-gray-300 hover:bg-gray-50"
      onClick={handleGoogleSignIn}
      disabled={isLoading || !scriptLoaded}
    >
      {isLoading && (
        <span className="w-full h-full bg-inherit pointer-events-none cursor-not-allowed absolute top-0 right-0 flex items-center justify-center">
          <Loader2Icon className="animate-spin" />
        </span>
      )}
      <div className="flex items-center justify-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>Continue with Google</span>
      </div>
    </Button>
  );
}