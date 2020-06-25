import { fetchAPI } from 'utils/helpers';

export async function getCurso() {
  try {
    const data = await fetchAPI({ model: 'curso', method: 'GET' });

    return {
      title: data.Titulo,
      description: data.Descripcion,
      portada: {
        alt: data.Portada.name,
        url: data.Portada.url,
      },
    };
  } catch (e) {
    return new Error('Failed to fetch API');
  }
}
