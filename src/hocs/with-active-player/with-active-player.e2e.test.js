import React from 'react';
import {mount} from 'enzyme';

import withActivePlayer from "./with-active-player";

const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Paused by default`, () => {
  const wrapper = mount(<MockComponentWrapped />);

  expect(wrapper.state().activePlayerId).toEqual(null);
});
