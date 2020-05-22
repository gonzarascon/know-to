import React, { useCallback } from 'react';
import { InView } from 'react-intersection-observer';
import { HomeContainer, ServicesContainer } from 'containers';
import { useUIDispatch, setSchemeAction } from 'components/contexts/UIContext';

function Home() {
  const schemeDispatch = useUIDispatch();

  const handleChange = useCallback(
    ({ scheme, entry }) => {
      if (entry) {
        schemeDispatch(setSchemeAction(scheme));
      }
    },
    [schemeDispatch, setSchemeAction]
  );

  return (
    <>
      <InView
        onChange={(entry) => handleChange({ scheme: 'dark', entry })}
        rootMargin="0px"
        threshold="0.5"
      >
        <HomeContainer />
      </InView>
      <InView
        onChange={(entry) => handleChange({ scheme: 'light', entry })}
        rootMargin="0px"
        threshold="0.25"
      >
        <ServicesContainer />
      </InView>
    </>
  );
}

export default Home;
