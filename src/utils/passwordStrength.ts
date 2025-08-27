export function checkPasswordStrength(password: string): number {
  const conditions = {
    hasMinLength8: /^.{8,}$/.test(password),
    hasSpecialSymbol: /[!@#$%^&*]/.test(password),
    hasUpperCase: /[A-ZА-Я]/.test(password),
    hasLowerCase: /[a-zа-я]/.test(password),
    hasDigit: /\d/.test(password),
  };

  const passedCount = Object.values(conditions).filter(Boolean).length;
  return passedCount;
}

export const passwordStrengthMessage = (value: number) => {
  switch (value) {
    case 1:
      return 'Weak';
    case 2:
      return 'Very Weak';
    case 3:
      return 'Fair';
    case 4:
      return 'Strong';
    case 5:
      return 'Excellent';
    default:
      return null;
  }
};
