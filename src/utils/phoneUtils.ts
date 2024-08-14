/**
 * 전화번호를 포맷하는 함수
 * @param {string} number - 포맷할 전화번호 (예: '01011111111')
 * @returns {string} - 포맷된 전화번호 (예: '010-1111-1111')
 */
export const formatPhoneNumber = (number: string): string => {
  // 정규 표현식을 사용하여 전화번호 형식 지정
  return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};