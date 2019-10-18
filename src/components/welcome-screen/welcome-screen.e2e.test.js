import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {WelcomeScreen} from "./welcome-screen";

Enzyme.configure({adapter: new Adapter()});

it(`Test click on button`, () => {
  const clickHandler = jest.fn();
  const props = {
    time: 0,
    errorCount: 0,
    handleClick: clickHandler
  };
  const welcomeScreenComponent = shallow(<WelcomeScreen {...props}/>);
  const startButton = welcomeScreenComponent.find(`.welcome__button`);

  startButton.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
