import { ArrowLeftIcon, ArrowRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import PropTypes from 'prop-types';
import React from 'react';
import usePagination from '../../hooks/usePagination';

import { StyledPagination } from './styled';

const PaginationItem = ({ type, page }) =>
  type === 'start-ellipsis' || type === 'end-ellipsis' ? (
    <StyledPagination.Ellipsis>…</StyledPagination.Ellipsis>
  ) : (
    <StyledPagination.Page key={page} aria-label={`Page ${page}`} page={page} onClick={(e) => e.preventDefault()}>
      {page}
    </StyledPagination.Page>
  );

PaginationItem.propTypes = {
  type: PropTypes.string.isRequired,
  page: PropTypes.number,
};

PaginationItem.defaultProps = {
  page: '',
};

const Pagination = (props) => {
  const {
    defaultPage,
    hideNextButton,
    hidePrevButton,
    onPageChange,
    page,
    totalPages,
    showFirstButton,
    showLastButton,
  } = props;

  const { items } = usePagination({ ...props, includeControlButtons: false });
  return (
    <StyledPagination.Root
      currentPage={page}
      defaultCurrentPage={defaultPage}
      totalPages={totalPages}
      onPageChange={(v) => onPageChange({ page: v })}
      href={() => {}}
    >
      {showFirstButton && (
        <StyledPagination.FirstPage onClick={(e) => e.preventDefault()}>
          <DoubleArrowLeftIcon />
        </StyledPagination.FirstPage>
      )}
      {!hidePrevButton && (
        <StyledPagination.PrevPage onClick={(e) => e.preventDefault()}>
          <ArrowLeftIcon />
        </StyledPagination.PrevPage>
      )}
      <StyledPagination.Pages>
        {items.map((item, index) =>
          item.type === 'first' || item.type === 'previous' || item.type === 'last' || item.type === 'next' ? (
            false
          ) : (
            <PaginationItem {...item} key={index} />
          ),
        )}
      </StyledPagination.Pages>
      {!hideNextButton && (
        <StyledPagination.NextPage onClick={(e) => e.preventDefault()}>
          <ArrowRightIcon />
        </StyledPagination.NextPage>
      )}
      {showLastButton && (
        <StyledPagination.LastPage onClick={(e) => e.preventDefault()}>
          <DoubleArrowRightIcon />
        </StyledPagination.LastPage>
      )}
    </StyledPagination.Root>
  );
};
Pagination.propTypes = {
  defaultPage: PropTypes.number,
  hideNextButton: PropTypes.bool,
  hidePrevButton: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  showFirstButton: PropTypes.bool,
  showLastButton: PropTypes.bool,
  siblingCount: PropTypes.number,
};

Pagination.defaultProps = {
  defaultPage: 1,
  hideNextButton: false,
  hidePrevButton: false,
  showFirstButton: true,
  showLastButton: true,
  siblingCount: 1,
};
export default Pagination;
