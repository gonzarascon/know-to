import { fetchAPI } from 'utils/helpers';

export async function getLectureById(number) {
  const data = await fetchAPI(`clases?lecture_number=${number}`, 'GET');

  if (data.length === 1) {
    return {
      title: data[0].lecture_title,
      content: data[0].lecture_content,
    };
  } else {
    return null;
  }
}

export async function getLecturesSlugs() {
  const data = await fetchAPI('clases', 'GET');

  return data;
}
