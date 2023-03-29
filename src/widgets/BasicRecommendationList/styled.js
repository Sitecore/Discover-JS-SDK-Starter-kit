import styled from 'styled-components';

import { theme } from '@sitecore-discover/ui';

export const Header = styled.h3`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
`;

export const RecommendationContainer = styled.div``;

export const ProductsGrid = styled.div`
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  font-family: ${theme.vars.typography.fontFamilySystem};
  justify-content: flex-start;
  gap: ${theme.vars.spacing.m};

  img {
    width: 192px;
  }
`;
