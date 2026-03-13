"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { TLoginResponse } from "@/lib/types";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: GoogleInitializeConfig) => void;
          renderButton: (element: HTMLElement, config: GoogleRenderButtonConfig) => void;
        };
      };
    };
  }
}

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleInitializeConfig = {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void | Promise<void>;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  ux_mode?: "popup" | "redirect";
  context?: string;
  use_fedcm_for_prompt?: boolean;
};

type GoogleRenderButtonConfig = {
  type?: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  shape?: "rectangular" | "pill" | "circle" | "square";
  logo_alignment?: "left" | "center";
  width?: number;
};

type GoogleSignInSuccessResponse = {
  success: true;
  message?: string;
  data?: TLoginResponse;
};

type GoogleSignInErrorResponse = {
  success?: false;
  error?: string;
  message?: string;
};

interface GoogleSignInButtonProps {
  onSuccess?: (response: GoogleSignInSuccessResponse) => void;
  onError?: (error: GoogleSignInErrorResponse) => void;
}

export function GoogleSignInButton({ onSuccess, onError }: GoogleSignInButtonProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);
  const buttonWrapperRef = useRef<HTMLDivElement | null>(null);
  const renderedButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://accounts.google.com/gsi/client"]',
    );

    if (existingScript) {
      if (window.google?.accounts?.id) {
        setScriptLoaded(true);
        return;
      }

      const handleLoad = () => setScriptLoaded(true);
      existingScript.addEventListener("load", handleLoad, { once: true });
      return () => {
        existingScript.removeEventListener("load", handleLoad);
      };
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const wrapper = buttonWrapperRef.current;

    if (!wrapper) return;

    const updateWidth = () => {
      setButtonWidth(Math.max(240, Math.floor(wrapper.clientWidth)));
    };

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });
    observer.observe(wrapper);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !window.google) return;

    const handleCredentialResponse = async (
      response: GoogleCredentialResponse,
    ) => {
      setIsAuthenticating(true);
      try {
        const idToken = response.credential;
        if (!idToken) {
          onError?.({ error: "Google did not return a credential." });
          return;
        }

        const res = await fetch("/api/v1/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id_token: idToken }),
        });
        const data = await res.json();
        if (res.ok) {
          console.log("Authentication successful");
          onSuccess?.(data);
        } else {
          console.error("Authentication failed:", data);
          onError?.(data);
        }

      } catch (error) {
        console.error("Error during authentication:", error);
          onError?.({
            error:
              error instanceof Error
                ? error.message
                : "Error during Google authentication.",
          });
      } finally {
        setIsAuthenticating(false);
      }
    };

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "110195580941-56jd9oiatep3ifhospo4i4jppvdosj1l.apps.googleusercontent.com";
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
      ux_mode: "popup",
      context: "signin",
      use_fedcm_for_prompt: false,
    });
    setIsInitialized(true);
  }, [scriptLoaded, onSuccess, onError]);

  useEffect(() => {
    if (
      !scriptLoaded ||
      !isInitialized ||
      !window.google ||
      !renderedButtonRef.current ||
      buttonWidth <= 0
    ) {
      return;
    }

    renderedButtonRef.current.innerHTML = "";
    window.google.accounts.id.renderButton(renderedButtonRef.current, {
      type: "standard",
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "pill",
      logo_alignment: "left",
      width: buttonWidth,
    });
  }, [buttonWidth, isInitialized, scriptLoaded]);

  const statusLabel = isAuthenticating
    ? "Signing in with Google..."
    : !scriptLoaded
      ? "Loading Google..."
      : null;

  return (
    <div className="w-full space-y-2">
      <div
        ref={buttonWrapperRef}
        className="relative flex min-h-12 w-full justify-center overflow-hidden rounded-[20px]"
      >
        <div
          ref={renderedButtonRef}
          className={cn(
            "flex justify-center transition-opacity",
            !scriptLoaded && "pointer-events-none opacity-60",
            isAuthenticating && "pointer-events-none opacity-60",
          )}
        />

        {(isAuthenticating || !scriptLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center rounded-[20px] border border-gray-300 bg-white/80">
            <Loader2Icon className="size-5 animate-spin text-gray-500" />
          </div>
        )}
      </div>

      {statusLabel && (
        <p className="text-center text-sm text-muted-foreground">
          {statusLabel}
        </p>
      )}
    </div>
  );
}
