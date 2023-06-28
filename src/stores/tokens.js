import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    accessToken: null,
    accessTokenUser: null
  }),
  getters: {
    getAccessToken() {
      return this.accessToken;
    },
  },


});