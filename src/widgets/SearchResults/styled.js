import { ChevronDownIcon } from '@radix-ui/react-icons';
import styled from 'styled-components';

import {
  AccordionFacets,
  Breadcrumb,
  CardViewSwitcher,
  FacetItem,
  Pagination,
  ProductCard,
  Select as SelectPrimitive,
  SortSelect,
  theme,
} from '@sitecore-discover/ui';

const StyledBreadcrumbRoot = styled(Breadcrumb.Root)`
  width: 100%;
  display: inline-block;
`;

const StyledBreadcrumbList = styled(Breadcrumb.List)`
  list-style: none;
  padding: 0;
`;

const StyledBreadcrumbItem = styled(Breadcrumb.Item)`
  display: inline;
  color: ${theme.vars.palette.primary.main};
  margin-left: ${theme.vars.spacing.xs};
`;

const StyledBreadcrumbNavigation = styled(Breadcrumb.Navigation)`
  margin: auto;
`;

const StyledBreadcrumbLink = styled(Breadcrumb.Link)`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  text-decoration: none;
`;

const StyledBreadcrumbSeparator = styled(Breadcrumb.Separator)`
  margin-left: var(--sdc-spacing-xs);
`;

export const StyledBreadcrumb = {
  Root: StyledBreadcrumbRoot,
  List: StyledBreadcrumbList,
  Item: StyledBreadcrumbItem,
  Navigation: StyledBreadcrumbNavigation,
  Link: StyledBreadcrumbLink,
  Separator: StyledBreadcrumbSeparator,
};

const selectTriggerStyle = `
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${theme.vars.spacing.xs};
  background-color: transparent;
  height: 30px;
  padding: ${theme.vars.spacing.xs} ${theme.vars.spacing.m};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize};
  color: ${theme.vars.palette.primary.main};
  border: 1px solid ${theme.vars.palette.primary.main};
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const StyledSortSelectTrigger = styled(SortSelect.Trigger)`
  ${selectTriggerStyle}
`;

const StyledGenericSelectTrigger = styled(SelectPrimitive.Trigger)`
  ${selectTriggerStyle}
`;

const contentSelectStyle = `
  background-color: ${theme.vars.palette.primary.contrastText};
  position: relative;
  overflow: hidden;
  color: ${theme.vars.palette.primary.main};
  box-shadow: 2px 2px 4px ${theme.vars.palette.grey['400']};
  position: absolute;
  top: 35px;
  z-index: 5000;
  &:focus-within {
    border-color: ${theme.vars.palette.primary.dark};
  }
`;

const StyledSortSelectContent = styled(SortSelect.Content)`
  ${contentSelectStyle}
`;

const StyledGenericSelectContent = styled(SelectPrimitive.SelectContent)`
  ${contentSelectStyle}
`;

const viewportSelectStyles = `
  padding: ${theme.vars.spacing.xs};
  z-index: 50000;
`;

const StyledSortSelectViewport = styled(SortSelect.Viewport)`
  ${viewportSelectStyles}
`;

const StyledGenericSelectViewport = styled(SelectPrimitive.Viewport)`
  ${viewportSelectStyles}
`;

const optionSelectStyles = `
  display: flex;
  align-items: center;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  height: 25px;
  padding: 0 ${theme.vars.spacing.xs};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  color: ${theme.vars.palette.primary.main};
  position: relative;
  border-radius: 0px;
  min-width: 80px;

  &[data-highlighted] {
    border-radius: 0;
    background-color: #0d6efd;
    color: ${theme.vars.palette.primary.contrastText};
  }
  &[data-disabled] {
    color: ${theme.vars.palette.grey['800']};
    font-style: italic;
  }
`;

const StyledSortSelectOption = styled(SortSelect.Option)`
  ${optionSelectStyles}
`;

const StyledGenericSelectOption = styled(SelectPrimitive.SelectItem)`
  ${optionSelectStyles}
`;

const StyledSortSelectValue = styled(SortSelect.SelectValue)`
  color: ${theme.vars.palette.primary.main};
`;

const StyledGenericSelectValue = styled(SelectPrimitive.SelectValue)`
  color: ${theme.vars.palette.primary.main};
`;

const StyledSortSelectIcon = styled(SortSelect.Icon)``;

const StyledGenericSelectIcon = styled(SelectPrimitive.Icon)``;
const StyledLabel = styled.label`
  font-size: ${theme.vars.typography.fontSize};
  padding-right: ${theme.vars.spacing.s};
`;
const StyledSortSelectRoot = styled(SortSelect.Root)``;
const StyledGenericSelectRoot = styled(SelectPrimitive.Root)`
  margin-left: 10px;
`;

const StyledSortSelectOptionText = styled(SortSelect.OptionText)``;
const StyledGenericSelectOptionText = styled(SortSelect.OptionText)``;

export const StyledSortSelect = {
  Trigger: StyledSortSelectTrigger,
  Content: StyledSortSelectContent,
  Viewport: StyledSortSelectViewport,
  Option: StyledSortSelectOption,
  SelectValue: StyledSortSelectValue,
  Root: StyledSortSelectRoot,
  OptionText: StyledSortSelectOptionText,
  Icon: StyledSortSelectIcon,
};

export const StyledSelect = {
  Label: StyledLabel,
  Root: StyledGenericSelectRoot,
  Trigger: StyledGenericSelectTrigger,
  Icon: StyledGenericSelectIcon,
  SelectValue: StyledGenericSelectValue,
  Content: StyledGenericSelectContent,
  Viewport: StyledGenericSelectViewport,
  Option: StyledGenericSelectOption,
  OptionText: StyledGenericSelectOptionText,
};

const StyledProductRoot = styled(ProductCard.Root)`
  max-width: 200px;
  height: 340px;
  padding: var(--sdc-spacing-xs);
  cursor: pointer;
  display: block;
  text-align: center;
  position: relative;
  &:focus-within {
  }
  &:hover .addToCart {
    display: block;
  }
`;
const StyledAddToCart = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  display: none;
  border-radius: 50%;
  border: none;
  width: 40px;
  height: 40px;

  &:hover {
    background: #0d6efd;
    svg {
      fill: #ffffff;
    }
  }
`;
const StyledProductImage = styled(ProductCard.Image)`
  width: 100%;
`;

const StyledProductName = styled(ProductCard.Name)`
  margin: 0 0 ${theme.vars.spacing.m};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  font-weight: ${theme.vars.typography.fontSize1.fontWeight};
  line-height: 1.5;
  text-align: center;
`;

const StyledProductContent = styled(ProductCard.Content)`
  margin: 0;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  font-weight: ${theme.vars.typography.fontWeight};
  line-height: ${theme.vars.typography.lineHeight};
  color: ${theme.vars.palette.primary.main};
`;

const StyledProductSku = styled(ProductCard.Sku)`
  font-family: ${theme.vars.typography.fontFamilySystem};
  color: ${theme.vars.palette?.primary?.main};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  text-align: center;
`;

const StyledProductLink = styled.a`
  text-decoration: none;
  color: ${theme.vars.palette?.primary?.main};
  font-size: ${theme.vars.typography.fontSize3.fontSize};
  &:hover {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`;

const StyledPrice = styled.span`
  color: ${theme.vars.palette?.primary?.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  bottom: 0;
  position: absolute;
  width: 100%;
  left: 0;
  text-align: center;
`;

export const StyledProductCard = {
  Link: StyledProductLink,
  Sku: StyledProductSku,
  Content: StyledProductContent,
  Image: StyledProductImage,
  Name: StyledProductName,
  Root: StyledProductRoot,
  Price: StyledPrice,
  AddToCart: StyledAddToCart,
};

const AccordionItemCheckboxStyled = styled(AccordionFacets.ItemCheckbox)`
  all: unset;
  background-color: white;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  &[data-state='checked'] {
    color: ${theme.vars.palette.primary.contrastText};
    background-color: #0d6efd;
  }

  &:focus {
    border: solid 1px ${theme.vars.palette.primary['900']};
  }
`;

const AccordionItemToggleStyled = styled(AccordionFacets.ItemToggle)`
  all: unset;
  width: 40px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  margin-right: ${theme.vars.spacing.s};

  &:focus {
    border: solid 1px ${theme.vars.palette.primary['900']};
  }

  &[data-state='on'] {
    background-color: ${theme.vars.palette.primary.main};
    color: ${theme.vars.palette.primary.contrastText};
  }
`;

const AccordionItemCheckboxIndicatorStyled = styled(AccordionFacets.ItemCheckboxIndicator)`
  color: ${theme.vars.palette.primary.contrastText};
  width: 15px;
  height: 15px;
`;

const AccordionValueListStyled = styled(AccordionFacets.ValueList)`
  list-style: none;
  padding-left: 0;
  li {
    padding: ${theme.vars.spacing.xs} 0;
    font-family: ${theme.vars.typography.fontFamilySystem};
    font-size: ${theme.vars.typography.fontSize1.fontSize};
  }

  &[data-orientation='horizontal'] {
    display: flex;
    flex-direction: row;
  }
`;

const AccordionItemCheckboxLabelStyled = styled(AccordionFacets.ItemLabel)`
  padding-left: ${theme.vars.spacing.xs};
  color: ${theme.vars.palette.primary.main};
`;

const AccordionItemStyled = styled(FacetItem)`
  display: flex;
  align-items: center;
`;

const AccordionHeaderStyled = styled(AccordionFacets.Header)`
  display: flex;
  margin-top: ${theme.vars.spacing.s};
  margin-bottom: ${theme.vars.spacing.s};
`;
const AccordionTriggerStyled = styled(AccordionFacets.Trigger)`
  align-items: center;
  color: ${theme.vars.palette.primary.main};
  display: flex;
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  height: 40px;
  justify-content: space-between;
  line-height: 1;
  flex: 1 1 0;
  background: none;
  border: none;
`;

const AccordionFacetsFacetStyled = styled(AccordionFacets.Facet)`
  border-bottom: solid 1px ${theme.vars.palette.grey['800']};
`;

const AccordionFacetsRootStyled = styled(AccordionFacets.Root)``;

const AccordionFacetsIconStyled = styled(ChevronDownIcon)`
  color: ${theme.vars.palette.primary.main};
  transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1) 0s;

  [data-state='open'] & {
    transform: rotate(180deg);
  }
`;

export const StyledAccordionFacets = {
  Trigger: AccordionTriggerStyled,
  Header: AccordionHeaderStyled,
  Item: AccordionItemStyled,
  ItemCheckboxLabel: AccordionItemCheckboxLabelStyled,
  ValueList: AccordionValueListStyled,
  ItemCheckboxIndicator: AccordionItemCheckboxIndicatorStyled,
  ItemToggle: AccordionItemToggleStyled,
  ItemCheckbox: AccordionItemCheckboxStyled,
  Facet: AccordionFacetsFacetStyled,
  Root: AccordionFacetsRootStyled,
  Icon: AccordionFacetsIconStyled,
};

const paginationLinkStyle = `
  cursor: pointer;
  margin: 0 5px;

  &[data-current='true'] {
    color: gray;
    pointer-events: none;
    text-decoration-line: none;
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
  margin-top: ${theme.vars.spacing.m};
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

export const StyledPagination = {
  Root: PaginationRootStyled,
  PrevPage: PaginationPrevPageStyled,
  NextPage: PaginationNextPageStyled,
  FirstPage: PaginationFirstPageStyled,
  LastPage: PaginationLastPageStyled,
  Page: PaginationPageStyled,
  Pages: PaginationPagesStyled,
};

const Wrapper = styled.div``;

const MainArea = styled.div`
  display: flex;
  margin: auto;
`;

const LeftArea = styled.section`
  position: relative;
  flex: 1 1;
  margin-right: ${theme.vars.spacing.l};
`;

const RightArea = styled.section`
  display: flex;
  flex-direction: column;
  flex: 4 1;
  width: 80%;
`;

const RightTopArea = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.vars.spacing.m};
`;

const RightTopAreaContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const StyledGrid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: ${theme.vars.spacing.m};
  grid-template-columns: repeat(auto-fill, minmax(220px, 2fr));
  grid-auto-flow: row;
`;

const ClearFilters = styled.button`
  border-radius: 4px;
  background: #0d6efd;
  color: #ffffff;
  border: solid 1px #ccc;
  padding: 3px 5px;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};

  &:hover {
    cursor: pointer;
    background: #ffffff;
    border: solid 1px #0d6efd;
    color: #0d6efd;
  }
`;

const SelectedFiltersList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0;
`;

const SelectedFiltersListItem = styled.li`
  display: inline-flex;
  border-radius: 4px;
  background: #0d6efd;
  border: solid 1px #ccc;
  padding: 3px 5px;
  margin-right: 5px;

  &:hover {
    cursor: pointer;
    background: #ffffff;
    border: solid 1px #0d6efd;
    color: #0d6efd;

    span,
    button {
      color: #0d6efd;
    }
  }
`;

const SelectedFiltersListItemText = styled.span`
  color: #ffffff;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
`;

const SelectedFiltersListItemButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  cursor: pointer;
`;

export const StyledPageControls = styled.div`
  align-items: center;
  border-top: 1px solid ${theme.vars.palette.primary.light};
  display: flex;
  justify-content: space-between;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  margin-top: 20px;
`;

export const StyledQuerySummary = styled.div`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  font-weight: bold;
  margin: auto 0;
`;

export const StyledFilters = {
  ClearFilters,
  SelectedFiltersList,
  SelectedFiltersListItem,
  SelectedFiltersListItemText,
  SelectedFiltersListItemButton,
};

export const SearchResultsLayout = {
  Wrapper,
  MainArea,
  LeftArea,
  RightArea,
  RightTopArea,
  RightTopAreaContainer,
};

const CardViewSwitcherRoot = styled(CardViewSwitcher.Root)`
  display: inline-flex;
  background-color: ${theme.vars.palette.common.white};
`;

const CardViewSwitcherItem = styled(CardViewSwitcher.Item)`
  all: unset;
  align-items: center;
  background-color: ${theme.vars.palette.common.white};
  color: ${theme.vars.palette.grey[500]};
  display: flex;
  height: 30px;
  justify-content: center;
  margin-left: ${theme.vars.spacing.s};
  width: 30px;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    background-color: ${theme.vars.palette.primary.light};
  }
  &[data-state='on'] {
    background-color: ${theme.vars.palette.primary.main};
    color: ${theme.vars.palette.primary.contrastText};
  }

  &:focus {
    position: 'relative';
    border: solid 1px ${theme.vars.palette.primary.main};
  }
`;

export const StyledCardViewSwitcher = {
  Root: CardViewSwitcherRoot,
  Item: CardViewSwitcherItem,
};

export const StyledRow = styled.div`
  width: 100%;
  display: block;
`;
