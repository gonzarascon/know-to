import { fetchAPI } from 'utils/helpers';

export async function getLectureById() {
  const data = await fetchAPI('clases/1', 'GET');

  return {
    title: data.lecture_title,
    content: data.lecture_content,
  };
}

export async function getLecturesSlugs() {
  const data = await fetchAPI('clases', 'GET');

  return data;
}
