import styled from 'styled-components';

import { Pagination, theme } from '@sitecore-discover/ui';

const paginationLinkStyle = `
  cursor: pointer;
  display: inline-block;
  height: 40px;
  width: 40px;
  border: 1px solid ${theme.vars.palette.primary.light};
  border-radius: 50%;
  font-size: ${theme.vars.typography.fontSize};
  color: ${theme.vars.palette.primary.main};
  line-height: 40px;
  text-align: center;
  transition: all, 0.3s;
  margin-right: ${theme.vars.spacing.s};
  text-decoration: none;  

  &:hover {
    background: ${theme.vars.palette.primary.dark};
    border-color: ${theme.vars.palette.primary.dark};
    color: ${theme.vars.palette.primary.contrastText};
  }

  &[data-current='true'] {
    background: ${theme.vars.palette.primary.dark};
    border-color: ${theme.vars.palette.primary.dark};
    color: ${theme.vars.palette.primary.contrastText};
    pointer-events: none;
  }
`;

const paginationNavigationLinkStyle = `
  ${paginationLinkStyle}
  &[data-current='true'] {
    display: none;
  }
`;

const PaginationRootStyled = styled(Pagination.Root)`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
`;
const PaginationPrevPageStyled = styled(Pagination.PrevPage)`
  display: inline;
  ${paginationNavigationLinkStyle}
`;
const PaginationNextPageStyled = styled(Pagination.NextPage)`
  display: inline;
  ${paginationNavigationLinkStyle}
`;
const PaginationFirstPageStyled = styled(Pagination.FirstPage)`
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  ${paginationNavigationLinkStyle}
`;
const PaginationLastPageStyled = styled(Pagination.LastPage)`
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  ${paginationLinkStyle}
`;
const PaginationPageStyled = styled(Pagination.Page)`
  cursor: pointer;
  ${paginationLinkStyle}
`;
const PaginationPagesStyled = styled(Pagination.Pages)`
  display: inline;
`;
const PaginationEllipsisStyled = styled.span`
  color: ${theme.vars.palette.primary.main};
  margin-right: ${theme.vars.spacing.s};
`;

export const StyledPagination = {
  Root: PaginationRootStyled,
  PrevPage: PaginationPrevPageStyled,
  NextPage: PaginationNextPageStyled,
  FirstPage: PaginationFirstPageStyled,
  LastPage: PaginationLastPageStyled,
  Page: PaginationPageStyled,
  Pages: PaginationPagesStyled,
  Ellipsis: PaginationEllipsisStyled,
};

export default StyledPagination;
