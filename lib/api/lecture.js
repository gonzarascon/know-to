import { fetchAPI } from 'utils/helpers';

export async function getTotalLectures() {
  const data = await fetchAPI({
    model: `clases/count`,
    method: 'GET',
  });

  return data;
}

export async function getLectureById(number, at) {
  const data = await fetchAPI({
    model: `clases?lecture_number=${number}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${at}`,
    },
  });

  console.log(data);

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
