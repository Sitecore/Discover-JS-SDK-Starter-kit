import { theme } from '@sitecore-discover/ui';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const RecommendationContainer = styled.div`
  color: ${theme.vars.palette.primary.main};
  display: inline-block;
  font-family: ${theme.vars.typography.fontFamilySystem};
  width: 100%;
`;

export const PurchaseTogetherContainer = styled.div`
  display: flex;
`;

const ProductList = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;
const ProductItem = styled.li`
  align-items: center;
  display: flex;
  font-weight: 700;
  padding: ${theme.vars.spacing.s} ${theme.vars.spacing.m};

  &:first-child {
    padding-left: 0;
  }
`;
const PlusItem = styled.li`
  align-items: center;
  display: flex;
  font-weight: 700;
  padding: ${theme.vars.spacing.s} ${theme.vars.spacing.m};
`;
const ProductImage = styled.img`
  max-height: 116px;
  max-width: 116px;
`;
const ProductLink = styled(Link)``;

const PriceDetailsContainer = styled.div``;
const PriceDetails = styled.div`
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  padding-bottom: ${theme.vars.spacing.m};
`;

export const ProductListView = {
  List: ProductList,
  Item: ProductItem,
  PlusItem,
  Image: ProductImage,
  Link: ProductLink,
  PriceDetailsContainer,
  PriceDetails,
};

const CheckboxList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: ${theme.vars.spacing.m} 0;
`;
const CheckboxListItem = styled.li`
  align-items: center;
  color: ${theme.vars.palette.primary.main};
  display: flex;
  font-family: ${theme.vars.typography.fontFamilySystem};
  padding-bottom: ${theme.vars.spacing.s};
`;
const CheckboxListLink = styled(Link)``;
const CheckboxListName = styled.span`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  display: block;
  margin-right: 4px;
  max-width: 750px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const CheckboxListPrice = styled.span`
  font-weight: 600;
`;
const CheckboxListLabel = styled.label`
  align-items: center;
  display: flex;
`;
export const ProductCheckboxList = {
  List: CheckboxList,
  Item: CheckboxListItem,
  Label: CheckboxListLabel,
  Link: CheckboxListLink,
  Name: CheckboxListName,
  Price: CheckboxListPrice,
};
