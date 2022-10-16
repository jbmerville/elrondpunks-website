import { NFTType } from 'values';
import axios from 'axios';

const AUTOBOT_URL = 'https://dev--dojomonsterbot.dojomonsters.autocode.gg';

export const assignRole = async (nftType: NFTType, discordId: string, special?: number): Promise<{ res: string; error?: string }> => {
  try {
    const response = await axios.post(`${AUTOBOT_URL}/epunk-add-role/`, { userId: discordId, role: nftType, special });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return { res: 'Error calling API.', error: 'Error' };
};

export const getUserRole = async (discordId: string): Promise<NFTType | undefined> => {
  try {
    const response = await axios.post(`${AUTOBOT_URL}/role/`, { userId: discordId });
    if (response.data.error) {
      return undefined;
    }
    return response.data.res as NFTType;
  } catch (error) {
    console.log(error);
  }
  return undefined;
};
