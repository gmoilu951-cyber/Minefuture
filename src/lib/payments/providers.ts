import { PAYMENT_PROVIDERS } from '@/types/payment';

export const getProviderById = (id: string) => {
  return PAYMENT_PROVIDERS.find(p => p.id === id);
};

export const getProvidersByRegion = (region: string) => {
  return PAYMENT_PROVIDERS.filter(p => p.regions.includes(region) || p.regions.includes('Global'));
};
