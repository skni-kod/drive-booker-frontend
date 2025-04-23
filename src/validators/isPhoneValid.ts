import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const normalizePhone = (input: string): string =>
  input.replace(/[^\d+]/g, '');

export const isPhoneValid = (phone: string): boolean => {
  try {
    const number = phoneUtil.parseAndKeepRawInput(phone);
    return phoneUtil.isValidNumber(number);
  } catch {
    return false;
  }
};
