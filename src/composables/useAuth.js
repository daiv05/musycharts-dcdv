/**
 * useAuth — Spotify PKCE OAuth composable
 *
 * Handles: login, callback validation (state check), token exchange,
 * silent refresh, and logout.
 */
import { ref, computed } from "vue";
import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_APP_URL + "/stats";
const SCOPES = "user-read-private user-read-email user-top-read";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const AUTH_URL = "https://accounts.spotify.com/authorize";

function generateRandomString(length) {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values)
    .map((v) => possible[v % possible.length])
    .join("");
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generateCodeChallenge(verifier) {
  return base64urlEncode(await sha256(verifier));
}

const _accessToken = ref(localStorage.getItem("access_token") || null);
const _refreshToken = ref(localStorage.getItem("refresh_token") || null);

export function useAuth() {
  const isAuthenticated = computed(() => !!_accessToken.value);

  /**
   * Initiates the PKCE login flow.
   * Stores code_verifier and state in sessionStorage (cleared on tab close).
   */
  async function login() {
    const codeVerifier = generateRandomString(128);
    const state = generateRandomString(16);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    sessionStorage.setItem("pkce_code_verifier", codeVerifier);
    sessionStorage.setItem("oauth_state", state);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
      state,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location.href = `${AUTH_URL}?${params}`;
  }

  /**
   * Handles the OAuth callback.
   * Validates state, exchanges code for tokens.
   * Returns { ok: true } or { ok: false, reason: 'state_mismatch' | 'exchange_failed' }
   */
  async function handleCallback(searchParams) {
    const code = searchParams.get("code");
    const returnedState = searchParams.get("state");
    const storedState = sessionStorage.getItem("oauth_state");
    const codeVerifier = sessionStorage.getItem("pkce_code_verifier");

    if (!returnedState || returnedState !== storedState) {
      clearSession();
      return { ok: false, reason: "state_mismatch" };
    }

    if (!code || !codeVerifier) {
      clearSession();
      return { ok: false, reason: "exchange_failed" };
    }

    try {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier,
      });

      const { data } = await axios.post(TOKEN_URL, body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      _accessToken.value = data.access_token;
      _refreshToken.value = data.refresh_token;
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      sessionStorage.removeItem("pkce_code_verifier");
      sessionStorage.removeItem("oauth_state");

      return { ok: true };
    } catch (err) {
      clearSession();
      return { ok: false, reason: "exchange_failed" };
    }
  }

  /**
   * Requests a new access token using the stored refresh token.
   * Updates localStorage and the reactive refs.
   * Returns the new access token string, or null on failure.
   */
  async function refreshAccessToken() {
    const rt = _refreshToken.value || localStorage.getItem("refresh_token");
    if (!rt) return null;

    try {
      const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: rt,
        client_id: CLIENT_ID,
      });

      const { data } = await axios.post(TOKEN_URL, body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      _accessToken.value = data.access_token;
      if (data.refresh_token) {
        _refreshToken.value = data.refresh_token;
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      localStorage.setItem("access_token", data.access_token);
      return data.access_token;
    } catch {
      return null;
    }
  }

  /** Removes all tokens and redirects to home. */
  function logout(router) {
    clearSession();
    if (router) router.push("/");
  }

  function clearSession() {
    _accessToken.value = null;
    _refreshToken.value = null;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    sessionStorage.removeItem("pkce_code_verifier");
    sessionStorage.removeItem("oauth_state");
  }

  function getAccessToken() {
    return _accessToken.value || localStorage.getItem("access_token");
  }

  return {
    isAuthenticated,
    login,
    handleCallback,
    refreshAccessToken,
    logout,
    getAccessToken,
    clearSession,
  };
}
