import Card from 'react-bootstrap/Card';
import styled from 'styled-components';

const CardRoot = styled(Card)`
  border: none;
`;
const CardImg = styled(Card.Img)`
  width: 50%;
  border-radius: none;
`;
const CardBody = styled(Card.Body)``;
const CardTitle = styled(Card.Title)``;
const CardText = styled(Card.Text)``;

const ProductCardModalStyled = {
  Root: CardRoot,
  Img: CardImg,
  Body: CardBody,
  Title: CardTitle,
  Text: CardText,
};
export default ProductCardModalStyled;
