/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Wrapper, Content } from './styled';

const ProductNotification = ({ name, image_url, action }) => (
  <Wrapper action={action}>
    <Content>
      <img alt={name} src={image_url} />
      <span>
        <b>{action}</b> {name}
      </span>
    </Content>
  </Wrapper>
);

ProductNotification.propTypes = {
  name: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

export default ProductNotification;
