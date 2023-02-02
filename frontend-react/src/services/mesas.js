import { instance } from '@/api/api';

export async function getEstadoMesas(estado = 'Disponible') {
  const response = await instance.get('/mesas/' + estado);
  return response.data;
}
