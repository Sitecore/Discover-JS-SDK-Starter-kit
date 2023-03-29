import styled from 'styled-components';

import { NavMenu, ProductCard, theme } from '@sitecore-discover/ui';

import { ReactComponent as IconSearch } from 'bootstrap-icons/icons/search.svg';

export const StyledIconSearch = styled(IconSearch)`
  color: #7b7b7b;
  height: 24px;
  width: 24px;
  position: absolute;
  right: 10px;
  top: 5px;
`;

export const StyledRoot = styled(NavMenu.Root)`
  width: 750px;
  font-family: ${theme.vars.typography?.fontFamilySystem};
`;

export const StyledMainList = styled(NavMenu.List)`
  all: unset;
  list-style: none;
  display: flex;
  &[data-orientation='vertical'] {
    flex-direction: column;
  }
`;

export const StyledMainListItem = styled(NavMenu.Item)`
  width: 100%;
`;

export const StyledGroupList = styled(StyledMainList)`
  display: block;
  width: 100%;
`;

export const StyledMainContent = styled(NavMenu.Content)`
  background: #ffffff;
  box-shadow: 1px 2px 2px 2px ${theme.vars.palette?.grey?.['400']};
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  display: inline-block;
  justify-content: center;
  left: 0;
  height: 440px;
  padding-top: 0;
  position: absolute;
  top: 40px;
  width: 100%;
  z-index: 5000;
  padding-bottom: ${theme.vars.spacing?.s};

  @keyframe enterFromLeft {
    from {
      transform: translate3d(-200px, 0, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframe enterFromRight {
    from {
      transform: translate3d(200px, 0, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframe exitToLeft {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      transform: translate3d(-200px, 0, 0);
      opacity: 0;
    }
  }

  @keyframe exitToRight {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      transform: translate3d(200px, 0, 0);
      opacity: 0;
    }
  }

  &[data-motion='from-start'] {
    animation: enterFromLeft 250ms ease;
  }
  &[data-motion='from-end'] {
    animation: enterFromRight 250ms ease;
  }

  &[data-motion='to-start'] {
    animation: exitToLeft 250ms ease;
  }
  &[data-motion='to-end'] {
    animation: exitToRight 250ms ease;
  }
`;

export const StyledSubContent = styled(NavMenu.SubContent)`
  display: block;
  width: 100%;
  position: relative;
  box-sizing: border-box;

  &[data-orientation='vertical'] {
  }
  &[data-orientation='horizontal'] {
    justify-items: center;
    margin-top: -${theme.vars.spacing?.s};
  }
`;

export const StyledTrigger = styled(NavMenu.Trigger)`
  background: none;
  border: 0;
  display: inline-block;
  font-size: ${theme.vars.typography?.fontSize1?.fontSize};

  padding: ${theme.vars.spacing?.s} ${theme.vars.spacing?.s};
  position: relative;
  width: 100%;
  text-align: left;
  &[data-state='open'] {
    color: ${theme.vars.palette?.primary?.main};
    background: #fff;
  }
  &:focus {
    outline: none;
    font-weight: bold;
    color: ${theme.vars.palette?.primary?.main};
    background: #fff;
  }
  &:hover {
    cursor: pointer;
    outline: none;
    font-weight: bold;
    color: ${theme.vars.palette?.primary?.main};
    background: #fff;
  }
`;

export const DefaultStyledTrigger = styled(NavMenu.Trigger)`
  background: none;
  border: 0;
  display: inline-block;
  height: 0;
  visibility: hidden;
  width: 100%;
  text-align: left;
`;

export const StyledGrid = styled(NavMenu.Content)`
  display: inline-block;
  width: 70%;
  position: absolute;
  top: 0;
  background: #fff;
  height: 440px;
  border-bottom-right-radius: 8px;
  border-left: 1px solid #ced4da;
`;

export const StyledSubList = styled(NavMenu.List)`
  column-gap: ${theme.vars.spacing?.s};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  list-style: none;
  margin: 0;
  padding: ${theme.vars.spacing?.s};
  row-gap: ${theme.vars.spacing?.s};
`;

export const Group = styled(NavMenu.Item)`
  width: 30%;
`;

export const StyledSubItem = styled(NavMenu.Item)`
  display: inline;
`;

export const StyledInputTrigger = styled(NavMenu.InputTrigger)`
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.vars.spacing?.xs};
  border: solid 1px #ced4da;
  &:focus {
    outline: 1px solid ${theme.vars.palette?.grey?.['400']};
    box-shadow: inset 0 0 0 ${theme.vars.palette?.grey?.['400']}, 0 0 8px ${theme.vars.palette?.grey?.['400']};
  }
`;

export const SearchGroupHeading = styled.h2`
  box-sizing: border-box;
  padding-left: ${theme.vars.spacing?.s};
  font-size: 1.2rem;
  padding-top: 20px;
`;

export const Link = styled(NavMenu.Link)`
  color: ${theme.vars.palette?.primary?.main};
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
  &:focus {
    border: solid 1px ${theme.vars.palette?.primary?.main};
    border-radius: 4px;
    outline: solid 1px transparent;
  }
  &:focus-within {
    border: solid 1px ${theme.vars.palette?.primary?.main};
    border-radius: 4px;
    outline: solid 1px transparent;
  }
`;

const StyledProductRoot = styled(ProductCard.Root)`
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.vars.spacing?.s};
  cursor: pointer;
  display: block;
  border: solid 1px transparent;
  text-align: center;
  height: 200px;
  position: relative;
  &:focus-within {
    border: solid 1px ${theme.vars.palette?.primary?.main};
    border-radius: 4px;
  }
  &:hover {
    border: solid 1px ${theme.vars.palette?.primary?.main};
    border-radius: 4px;
  }
`;

const StyledProductImage = styled(ProductCard.Image)`
  width: 60%;
`;

const StyledProductName = styled(ProductCard.Name)`
  margin: ${theme.vars.spacing?.s} 0;
  font-family: ${theme.vars.typography?.fontFamilySystem};
  font-size: 13px;
  font-weight: ${theme.vars.typography?.fontSize4?.fontWeight};
`;

const StyledProductContent = styled(ProductCard.Content)`
  margin: 0;
  font-family: ${theme.vars.typography?.fontFamilySystem};
  font-size: ${theme.vars.typography?.fontSize1?.fontSize};
  font-weight: ${theme.vars.typography?.fontWeight};
  line-height: ${theme.vars.typography?.lineHeight};
  color: ${theme.vars.palette?.primary?.main};
`;

const StyledProductLink = styled.a`
  text-decoration: none;
  color: ${theme.vars.palette?.primary?.main};
  font-size: ${theme.vars.typography?.fontSize4?.fontSize};
  &:hover {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`;

const StyledPrice = styled.span`
  color: ${theme.vars.palette?.primary?.main};
  font-family: ${theme.vars.typography?.fontFamilySystem};
  font-size: ${theme.vars.typography?.fontSize1?.fontSize};
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  left: 0;
`;

export const StyledProductCard = {
  Link: StyledProductLink,
  Content: StyledProductContent,
  Image: StyledProductImage,
  Name: StyledProductName,
  Root: StyledProductRoot,
  Price: StyledPrice,
};
