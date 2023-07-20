export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]{2,}$/;

  return nameRegex.test(name.trim());
};

export const validateEmail = (em: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(em);
};

export const validatePassword = (pw: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])[A-Za-z\d]{8,16}$/;

  return passwordRegex.test(pw);
};
