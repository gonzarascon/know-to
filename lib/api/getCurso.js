import { fetchAPI } from 'utils/helpers';

export async function getCurso() {
  const data = await fetchAPI('curso', 'GET');

  return {
    title: data.Titulo,
    description: data.Descripcion,
    portada: {
      alt: data.Portada.name,
      url: data.Portada.url,
    },
  };
}
