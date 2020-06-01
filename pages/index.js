import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { MediaContextProvider } from 'utils/mediaRender';

import { HomeContainer } from 'containers';

import { wrapper } from 'store/store';

export const getStaticProps = wrapper.getStaticProps(({ store, preview }) => {
  console.log('2. Page.getStaticProps uses the store to dispatch things');
  store.dispatch({
    type: 'TICK',
    payload: 'was set in other page ' + preview,
  });
});

function Home() {
  const { tick } = useSelector((state) => state);

  console.log(tick);

  return (
    <MediaContextProvider>
      <HomeContainer />
    </MediaContextProvider>
  );
}

export default Home;
