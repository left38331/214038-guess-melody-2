import React from 'react';
import {mount} from 'enzyme';

import withUserAnswers from './with-user-answers';

const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswers(MockComponent);

it(`Check default input state`, () => {
  const wrapper = mount(<MockComponentWrapped />);

  expect(wrapper.state().userAnswer).toEqual([false, false, false, false]);
});

it(`Should set user answer correctly`, () => {
  const wrapper = mount(<MockComponentWrapped />);

  wrapper.instance()._setStateUserAnswer([false, false, false, true]);
  expect(wrapper.state().userAnswer).toEqual([false, false, false, true]);
});
