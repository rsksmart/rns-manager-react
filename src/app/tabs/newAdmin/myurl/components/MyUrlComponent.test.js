import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { mockStoreEnglish } from '../../../../../../tests/config/mockStore';
import MyUrlComponent from './MyUrlComponent';
import { contentInititalState } from '../../resolver/reducer';

const store = mockStoreEnglish();

describe('MyUrlComponent', () => {
  const initProps = {
    start: jest.fn(),
    handleSave: jest.fn(),
    url: null,
    receiveContent: true,
    gettingContent: false,
  };

  const generateComponent = (localProps = {}) => {
    const combinedProps = { ...initProps, ...localProps };
    return <Provider store={store}><MyUrlComponent {...combinedProps} /></Provider>;
  };

  it('it renders and is defined', () => {
    const wrapper = shallow(generateComponent());
    expect(wrapper).toBeDefined();
  });

  it('shows loading wheel when supportedInterfaces has not returned', () => {
    const wrapper = mount(generateComponent({ receiveContent: false }));
    expect(wrapper.find('.row.waiting')).toBeDefined();
  });

  it('shows an error message if url is null', () => {
    const wrapper = mount(generateComponent({ url: null }));
    expect(wrapper.find('.alert').text()).toBe('Your resolver does not support decentralized URL.');
  });

  describe('new record', () => {
    it('shows editable when there is no url', () => {
      const wrapper = mount(generateComponent({ url: contentInititalState }));
      expect(wrapper.find('p').text().substr(0, 12)).toBe('Here you can');
    });

    it('handles clicking', () => {
      const handleSave = jest.fn();
      const wrapper = mount(generateComponent({ url: contentInititalState, handleSave }));
      wrapper.find('input.rsk-input').simulate('change', { target: { value: 'foo' } });
      wrapper.find('button.rsk-button').simulate('click');

      expect(handleSave).toBeCalledWith('foo');
    });

    it('shows error when content has error', () => {
      const url = {
        ...contentInititalState,
        errorMessage: 'an error',
      };
      const wrapper = mount(generateComponent({ url }));
      expect(wrapper.find('.error').text()).toBe('an error');
    });

    it('shows loading when new content is saving', () => {
      const url = {
        ...contentInititalState,
        isWaiting: true,
      };
      const wrapper = mount(generateComponent({ url }));
      expect(wrapper.find('.new').find('.waiting').length).toBe(1);
    });
  });

  describe('existing record', () => {
    it('shows the edit component when a URL exists', () => {
      const url = {
        ...contentInititalState,
        value: 'ipfs://QmQ',
        isEmpty: false,
      };
      const wrapper = mount(generateComponent({ url }));

      expect(wrapper.find('.addressInput .value').text()).toBe('ipfs://QmQ');
    });
  });
});
