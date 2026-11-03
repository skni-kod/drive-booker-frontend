import { axiosInstance } from '@/lib/axiosInstance';

interface FillProfileData {
  voivodship: string;
  city: string;
  street: string;
  house_number: string;
  zip_code: string;
}

export const sendProfileData = async (
  data: FillProfileData,
): Promise<boolean> => {
  try {
    await axiosInstance.put('api/user/profile', data);
    return true;
  } catch (error) {
    console.error('Failed to fill profile:', error);
    return false;
  }
};
