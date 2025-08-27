import {
  checkPasswordStrength,
  passwordStrengthMessage,
} from '@/utils/passwordStrength';
import clsx from 'clsx';

interface Props {
  text: string;
}

export const PasswordStrength = ({ text }: Props) => {
  if (text.length === 0) return null;
  const strength = checkPasswordStrength(text);
  return (
    <div
      className={clsx(
        'h-5',
        'text-black',
        'text-center',
        'rounded-2xl',
        strength === 5 && 'bg-green-500',
        strength === 4 && 'bg-green-300',
        strength === 3 && 'bg-yellow-500',
        strength === 2 && 'bg-orange-500',
        strength === 1 && 'bg-red-500'
      )}
    >
      {passwordStrengthMessage(strength)}
    </div>
  );
};
