/**
 * useSpotify — thin Spotify API wrapper
 *
 * All requests use the current access_token from useAuth.
 * Results are cached in-memory for reuse within a session.
 */
import { ref } from "vue";
import axios from "axios";
import { useAuth } from "./useAuth.js";

const BASE = "https://api.spotify.com/v1";

const _profile = ref(null);
const _topArtists = ref({});
const _topTracks = ref({});

export function useSpotify() {
  const auth = useAuth();

  function headers() {
    return { Authorization: `Bearer ${auth.getAccessToken()}` };
  }

  async function getProfile() {
    if (_profile.value) return _profile.value;
    const { data } = await axios.get(`${BASE}/me`, { headers: headers() });
    _profile.value = data;
    return data;
  }

  async function getTopArtists(timeRange = "medium_term", limit = 20) {
    const key = `${timeRange}_${limit}`;
    if (_topArtists.value[key]) return _topArtists.value[key];
    const { data } = await axios.get(`${BASE}/me/top/artists`, {
      params: { time_range: timeRange, limit },
      headers: headers(),
    });
    _topArtists.value[key] = data.items;
    return data.items;
  }

  async function getTopTracks(timeRange = "medium_term", limit = 20) {
    const key = `${timeRange}_${limit}`;
    if (_topTracks.value[key]) return _topTracks.value[key];
    const { data } = await axios.get(`${BASE}/me/top/tracks`, {
      params: { time_range: timeRange, limit },
      headers: headers(),
    });
    _topTracks.value[key] = data.items;
    return data.items;
  }

  function clearCache() {
    _profile.value = null;
    _topArtists.value = {};
    _topTracks.value = {};
  }

  return { getProfile, getTopArtists, getTopTracks, clearCache };
}
