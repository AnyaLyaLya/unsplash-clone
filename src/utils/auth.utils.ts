import { UserData } from "../types/UserData";

export const saveUserDataToLocalStorage = (userData: UserData) => {
  localStorage.setItem(userData.email, JSON.stringify(userData));
};

export const getUserDataFromLocalStorage = (email: string) => {
  const userDataString = localStorage.getItem(email);
  return userDataString ? JSON.parse(userDataString) : null;
};

export const removeUserDataFromLocalStorage = (userData: UserData) => {
  localStorage.removeItem(userData.email);
};

export const loginUser = (userData: UserData, setUser: (data: UserData) => void) => {
  const storedUserData = getUserDataFromLocalStorage(userData.email);
  
  if (storedUserData && storedUserData.password === userData.password) {

    setUser({
      ...userData,
      name: storedUserData.name,
    })

    return true;
  } else {
    return false;
  }
};