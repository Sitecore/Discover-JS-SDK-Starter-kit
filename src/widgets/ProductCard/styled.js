import { ProductCard, theme } from '@sitecore-discover/ui';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductRootStyled = styled(ProductCard.Root)`
  max-width: 200px;

  padding: var(--sdc-spacing-xs);
  cursor: pointer;
  display: block;
  text-align: center;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: stretch;

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
  border: solid 1px #ccc;
  border-radius: 8px;
`;

const ProductNameStyled = styled(ProductCard.Name)`
  margin: 0 0 ${theme.vars.spacing.m};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  font-weight: ${theme.vars.typography.fontSize1.fontWeight};
  line-height: 1.5;
  text-align: center;
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
  text-align: center;
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

const PriceContainer = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  justify-content: end;
  width: 100%;
`;
const PriceStyled = styled.span`
  color: ${theme.vars.palette?.primary?.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize4.fontSize};

  text-align: center;
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
  QuickView: QuickViewStyled,
  ButtonContainer: ButtonContainerStyled,
  PriceContainer,
};

export default ProductCardStyled;
