import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export type Professional = {
  id: string;
  name: string;
  role: string;
  rating: number;
  location: string;
  photos: string[];
  about: string;
  review?: string;
};

export function useProfessionals(q?: string) {
  return useQuery<Professional[]>({
    queryKey: ['professionals', q],
    queryFn: async () => {
      const res = await api.get('/professionals', { params: { q } });
      return res.data;
    },
  });
}