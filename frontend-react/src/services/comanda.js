import { instance } from '@/api/api';

export function createComanda(comanda) {
  return instance.post('/comanda', comanda);
}
