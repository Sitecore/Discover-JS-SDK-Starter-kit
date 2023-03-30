import { ProductCard, theme } from '@sitecore-discover/ui';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductRootStyled = styled(ProductCard.Root)`
  display: flex;
  height: 200px;
  width: 100%;
  padding: var(--sdc-spacing-xs);
  cursor: pointer;
  position: relative;

  &:focus-within {
  }

  &:hover .addToCart,
  &:hover .quickView {
    display: inline-block;
  }
`;

const ButtonContainerStyled = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 999;
`;

const AddToCartStyled = styled.button`
  display: none;
  border: none;
  width: 40px;
  height: 40px;
  margin-left: 5px;
`;

const QuickViewStyled = styled.button`
  display: none;
  border: none;
  width: 40px;
  height: 40px;
  margin-left: 5px;
`;

const ProductImageStyled = styled(ProductCard.Image)`
  width: 100%;
`;

const ProductNameStyled = styled(ProductCard.Name)`
  margin: 0;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  font-weight: ${theme.vars.typography.fontSize1.fontWeight};
  line-height: 1.5;
`;

const ProductContentStyled = styled(ProductCard.Content)`
  margin: 0;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  font-weight: ${theme.vars.typography.fontWeight};
  line-height: ${theme.vars.typography.lineHeight};
  color: ${theme.vars.palette.primary.main};
`;

const ProductSkuStyled = styled(ProductCard.Sku)`
  font-family: ${theme.vars.typography.fontFamilySystem};
  color: ${theme.vars.palette?.primary?.main};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
`;

const ProductLinkStyled = styled(Link)`
  text-decoration: none;
  color: ${theme.vars.palette?.primary?.main};
  font-size: ${theme.vars.typography.fontSize3.fontSize};

  &:hover {
    text-decoration: none;
  }

  &:focus {
    text-decoration: none;
  }

  &::after {
    position: absolute;
    inset: 0;
    display: block;
    content: ' ';
  }
`;

const PriceStyled = styled.span`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
`;

const ProductCardRowLeft = styled.div`
  display: flex;
  position: relative;
`;
const ProductCardRowRight = styled.div`
  box-sizing: border-box;
  padding: ${theme.vars.spacing.m};
`;

const ProductCardStyled = {
  Link: ProductLinkStyled,
  Sku: ProductSkuStyled,
  Content: ProductContentStyled,
  Image: ProductImageStyled,
  Name: ProductNameStyled,
  Root: ProductRootStyled,
  Price: PriceStyled,
  AddToCart: AddToCartStyled,
  Left: ProductCardRowLeft,
  Right: ProductCardRowRight,
  QuickView: QuickViewStyled,
  ButtonContainer: ButtonContainerStyled,
};

export default ProductCardStyled;
