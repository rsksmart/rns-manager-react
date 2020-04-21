import { connect } from 'react-redux';
import TextRotationComponent from '../../../components/TextRotationComponent';
import keyMessages from '../../../../languages/key_messges.json';

const mapStateToProps = state => ({
  heading: 'Did you know?',
  messages: keyMessages,
  language: state.multilanguage.currentLanguageCode,
});

export default connect(
  mapStateToProps,
  null,
)(TextRotationComponent);
