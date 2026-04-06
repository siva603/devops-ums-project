import axios from 'axios';
import { User } from '../types';
import { sleep } from '../utils/dummyLoader';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const USE_API = import.meta.env.VITE_USE_API === 'true';

const getDummyUsers = async (): Promise<User[]> => {
  await sleep(500); // Simulate network delay
  const response = await fetch('/data/users.json');
  return await response.json();
};

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    if (USE_API) {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
      } catch (error) {
        console.warn('API failed, falling back to dummy data', error);
        return getDummyUsers();
      }
    }
    return getDummyUsers();
  },

  getUserById: async (id: number): Promise<User> => {
    if (USE_API) {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${id}`);
        return response.data;
      } catch (error) {
        console.warn('API failed, falling back to dummy data', error);
        const users = await getDummyUsers();
        return users.find((u) => u.id === id) || users[0];
      }
    }
    const users = await getDummyUsers();
    return users.find((u) => u.id === id) || users[0];
  },

  createUser: async (user: User): Promise<User> => {
    if (USE_API) {
      const response = await axios.post(`${API_BASE_URL}/users`, user);
      return response.data;
    }
    await sleep(500);
    return { ...user, id: Math.floor(Math.random() * 1000) };
  },

  updateUser: async (id: number, user: User): Promise<User> => {
    if (USE_API) {
      const response = await axios.put(`${API_BASE_URL}/users/${id}`, user);
      return response.data;
    }
    await sleep(500);
    return { ...user, id };
  },

  deleteUser: async (id: number): Promise<void> => {
    if (USE_API) {
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      return;
    }
    await sleep(500);
  },
};
