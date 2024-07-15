export const validateEmail = (value: string): string => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    return '이메일 형식이 맞지 않습니다.';
  }
  return '';
};

export const validatePassword = (value: string): string => {
  if (value.length < 6) {
    return '비밀번호는 6자리 이상이여야 합니다.';
  }
  return '';
};

export const validateVerifyPassword = (password: string, verifyPassword: string): string => {
  if (verifyPassword !== password) {
    return '패스워드가 맞지 않습니다.';
  }
  return '';
};
