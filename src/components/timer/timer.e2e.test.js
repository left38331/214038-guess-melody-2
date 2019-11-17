import React from 'react';
import {shallow} from 'enzyme';

import {Timer} from 'components/timer/timer';

it(`Timer changed state after click`, (done) => {
  const clickHandler = jest.fn();
  const props = {
    time: 300,
    onTimeTick: clickHandler,
  };
  shallow(<Timer {...props} />);

  setTimeout(() => {
    expect(clickHandler).toHaveBeenCalledTimes(2);
    done();
  }, 2100);
});
