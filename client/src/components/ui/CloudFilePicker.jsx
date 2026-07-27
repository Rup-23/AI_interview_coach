import { useState, useCallback } from "react";

/**
 * Google Drive Picker component.
 *
 * Prerequisites:
 * 1. Create a Google Cloud project at https://console.cloud.google.com
 * 2. Enable the "Google Picker API" and "Google Drive API"
 * 3. Create an OAuth 2.0 Client ID (Web application type)
 * 4. Create an API Key
 * 5. Add your domain to the authorized JavaScript origins
 * 6. Set VITE_GOOGLE_API_KEY and VITE_GOOGLE_CLIENT_ID in your .env
 */

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPE = "https://www.googleapis.com/auth/drive.readonly";

// Load the Google API script lazily
let gapiLoaded = false;
let gisLoaded = false;

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const CloudFilePicker = ({ onFileSelected, accept = ".pdf", disabled = false }) => {
  const [loading, setLoading] = useState(false);

  // Check if credentials are configured
  const isConfigured = GOOGLE_API_KEY && GOOGLE_CLIENT_ID;

  const initializeGapi = useCallback(async () => {
    if (!gapiLoaded) {
      await loadScript("https://apis.google.com/js/api.js");
      await new Promise((resolve) => {
        window.gapi.load("picker", resolve);
      });
      gapiLoaded = true;
    }

    if (!gisLoaded) {
      await loadScript("https://accounts.google.com/gsi/client");
      gisLoaded = true;
    }
  }, []);

  const handleGoogleDrivePick = useCallback(async () => {
    if (!isConfigured) return;

    try {
      setLoading(true);
      await initializeGapi();

      // Request an OAuth token
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPE,
        callback: async (tokenResponse) => {
          if (tokenResponse.error) {
            setLoading(false);
            return;
          }

          // Build and show the picker
          const mimeTypes = accept === ".pdf" ? "application/pdf" : "";

          const picker = new window.google.picker.PickerBuilder()
            .addView(
              new window.google.picker.DocsView()
                .setIncludeFolders(false)
                .setMimeTypes(mimeTypes)
            )
            .setOAuthToken(tokenResponse.access_token)
            .setDeveloperKey(GOOGLE_API_KEY)
            .setCallback(async (data) => {
              if (data.action === window.google.picker.Action.PICKED) {
                const doc = data.docs[0];

                try {
                  // Download the file content via Google Drive API
                  const response = await fetch(
                    `https://www.googleapis.com/drive/v3/files/${doc.id}?alt=media`,
                    {
                      headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                      },
                    }
                  );

                  if (!response.ok) {
                    throw new Error("Failed to download file from Google Drive");
                  }

                  const blob = await response.blob();

                  // Convert Blob to File object for the existing upload handler
                  const file = new File([blob], doc.name, {
                    type: doc.mimeType || "application/pdf",
                  });

                  onFileSelected(file);
                } catch {
                  // Error handled by parent via toast
                }
              }
              setLoading(false);
            })
            .setTitle("Select a PDF from Google Drive")
            .build();

          picker.setVisible(true);
        },
      });

      tokenClient.requestAccessToken({ prompt: "consent" });
    } catch {
      setLoading(false);
    }
  }, [isConfigured, initializeGapi, accept, onFileSelected]);

  if (!isConfigured) {
    return null; // Don't render the button if credentials aren't set
  }

  return (
    <button
      type="button"
      onClick={handleGoogleDrivePick}
      disabled={disabled || loading}
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3 font-medium text-white transition hover:border-blue-500 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Google Drive icon */}
      <svg
        className="h-5 w-5"
        viewBox="0 0 87.3 78"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
        <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-20.4 35.3c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47" />
        <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
        <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
        <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
        <path d="m73.4 26.5-10.1-17.5c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 23.8h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
      </svg>
      {loading ? "Opening..." : "Google Drive"}
    </button>
  );
};

export default CloudFilePicker;
