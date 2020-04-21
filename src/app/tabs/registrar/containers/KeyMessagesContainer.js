import { connect } from 'react-redux';
import TextRotationComponent from '../../../components/TextRotationComponent';
import keyMessages from '../../../../languages/key_messges.json';

const shuffle = (array) => {
  let counter = array.length;
  const returnAray = [];

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter -= 1;

    const temp = array[counter];
    returnAray[counter] = array[index];
    returnAray[index] = temp;
  }

  return returnAray;
};

const mapStateToProps = state => ({
  messages: shuffle(keyMessages),
  language: state.multilanguage.currentLanguageCode,
});

export default connect(
  mapStateToProps,
  null,
)(TextRotationComponent);
