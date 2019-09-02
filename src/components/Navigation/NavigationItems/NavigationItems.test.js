import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it('should render two navigation item elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it('should render three navigation item elements if authenticated', () => {
    wrapper.setProps({ userAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it('should render the logout navigation item element if authenticated', () => {
    wrapper.setProps({ userAuthenticated: true });
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
});
