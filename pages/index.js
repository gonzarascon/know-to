import React from 'react';
import { MediaContextProvider } from 'utils/mediaRender';

import { HomeContainer } from 'containers';

function Home() {
  return (
    <MediaContextProvider>
      <HomeContainer />
    </MediaContextProvider>
  );
}

export default Home;
