import { defineStore } from "pinia";
import axios from '@/plugins/axios';

export const useUserStore = defineStore({
  id: 'user',
  // เก็บตัวแปร
  state: () => ({
    user: null,
  }),

  // เป็น method ที่ใช้ดึงข้อมูล user
  actions: {
    async getUser() {
      try {
        const token = localStorage.getItem("token");
        // console.log('token:', token);
        if (token) {
          const response = await axios.get("/user/me", { headers: { Authorization: "Bearer " + token } })
          this.user = response.data;
          // console.log('user:', this.user);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
