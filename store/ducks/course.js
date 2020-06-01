import { createDuck } from 'redux-duck';

const courseDuck = createDuck('courseDuck');

// Action Types
const SET_COURSE_DATA = courseDuck.defineType('SET_COURSE_DATA');

//Action Creators
const setCourseData = (course) => ({
  type: SET_COURSE_DATA,
  course,
});

const setUpdateCourseData = (course) => ({
  type: SET_COURSE_DATA,
  course,
});

// Reducers & InitialState
const initialState = {
  name: null,
  thumbnail: null,
  description: null,
  lectures: null,
};

export default courseDuck.createReducer(
  {
    [SET_COURSE_DATA]: (state, action) => {
      const { course } = action;
      const update = {
        name: course.name,
        description: course.description,
        lectures: course.lectures,
        thumbnail: course.photo,
      };

      return Object.assign({}, state, { ...update });
    },
  },
  initialState
);
