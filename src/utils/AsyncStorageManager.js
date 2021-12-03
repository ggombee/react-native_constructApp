import AsyncStorage from "@react-native-community/async-storage";

export const AUTO_LOGIN = "__auto_login";

const AsyncStorageManager = {
  setItem: async (key, value) => {
    return await AsyncStorage.setItem(key, value);
  },

  getItem: async (key) => {
    return await AsyncStorage.getItem(key);
  },

  removeItem: async (key) => {
    return await AsyncStorage.removeItem(key);
  },

  clear: async () => {
    return await AsyncStorage.clear();
  },
};

export default AsyncStorageManager;
