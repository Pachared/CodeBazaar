declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient(config: GoogleTokenClientConfig): GoogleTokenClient
        }
      }
    }
  }
}

interface GoogleTokenClient {
  requestAccessToken: (overrideConfig?: GoogleTokenClientOverrideConfig) => void
}

interface GoogleTokenClientConfig {
  client_id: string
  scope: string
  callback: (response: GoogleTokenResponse) => void
  prompt?: string
  error_callback?: (error: GoogleAuthErrorCallbackResponse) => void
}

interface GoogleTokenClientOverrideConfig {
  prompt?: string
  scope?: string
}

interface GoogleTokenResponse {
  access_token?: string
  error?: string
  error_description?: string
  expires_in?: number
  prompt?: string
  scope?: string
  state?: string
  token_type?: string
}

interface GoogleAuthErrorCallbackResponse {
  type?: 'popup_failed_to_open' | 'popup_closed' | 'unknown'
}

export {}
