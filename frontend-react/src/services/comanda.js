import { instance } from '@/api/api';

export function createComanda(comanda) {
  return instance.post('/comanda', comanda);
}

export async function getComandaEnMesa(mesa, estado = 'Ocupado') {
  const response = await instance.get(`/comanda/${mesa}?estado=${estado}`);
  return response.data;
}
