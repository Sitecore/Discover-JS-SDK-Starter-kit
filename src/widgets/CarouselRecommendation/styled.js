import styled, { css } from 'styled-components';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Carousel, theme } from '@sitecore-discover/ui';

/** Carousel styles  */
const containerWidth = '1320px';

export const RecommendationContainer = styled.div``;

export const CarouselContainer = styled(Carousel.Root)`
  position: relative;
  max-width: ${containerWidth};
  width: 100%;
`;
export const SliderList = styled(Carousel.Slides)`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  gap: ${theme.vars.spacing.l};
  // calculate the left padding to apply to the scrolling list
  // so that the carousel starts aligned with the container component
  scroll-padding: max(${theme.vars.spacing.l}, calc((100% - ${containerWidth}) / 2 + ${theme.vars.spacing.l}));
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Slide = styled(Carousel.Slide)`
  display: flex;
  height: 100%;
  .productCart {
    width: 250px;
  }
`;

const arrows = css`
  color: ${theme.vars.palette.grey['900']};
  height: 30px;
  vertical-align: middle;
  width: 30px;
`;

const controlButton = css`
  cursor: pointer;
  background-color: ${theme.vars.palette.common.white};
  border: none;
  box-shadow: 0 1px 3px ${theme.vars.palette.grey['400']};
  height: 100px;
  line-height: 100px;
  position: absolute;
  text-align: center;
  top: calc(50% - 50px);
  width: 45px;

  &[aria-disabled='true'] {
    filter: opacity(0.5);
    cursor: not-allowed;
  }

  &:hover:not([aria-disabled='true']) svg {
    color: ${theme.vars.palette.primary.main};
  }
`;

export const NextButton = styled(Carousel.Next)`
  ${controlButton}
  border-radius: ${theme.vars.border.radius} 0 0 ${theme.vars.border.radius};
  clip: rect(-10px, 45px, 110px, -10px);
  padding-left: ${theme.vars.spacing.xs};
  right: 0;
`;
export const PrevButton = styled(Carousel.Previous)`
  ${controlButton}
  border-radius: 0 ${theme.vars.border.radius} ${theme.vars.border.radius} 0;
  clip: rect(-10px, 55px, 110px, 0);
  left: 0;
  padding-right: ${theme.vars.spacing.xs};
`;

export const LeftIcon = styled(ChevronLeftIcon)`
  ${arrows}
`;
export const RightIcon = styled(ChevronRightIcon)`
  ${arrows}
`;
