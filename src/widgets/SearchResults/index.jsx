import { CheckIcon, GridIcon, ListBulletIcon } from '@radix-ui/react-icons';
import {
  useSearchResults,
  useSearchResultsBreadcrumb,
  useSearchResultsSelectedFacets,
  widget,
  WidgetDataType,
} from '@sitecore-discover/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { AccordionFacets, CardViewSwitcher } from '@sitecore-discover/ui';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import {
  SearchResultsLayout,
  StyledAccordionFacets,
  StyledBreadcrumb,
  StyledCardViewSwitcher,
  StyledFilters,
  StyledGrid,
  StyledPageControls,
  StyledQuerySummary,
  StyledRow,
  StyledSelect,
  StyledSortSelect,
} from './styled';

import ProductCard from '../ProductCard';
import ProductCardListView from '../ProductCardListView';

const { CARD_VIEW_GRID } = CardViewSwitcher;

export const SearchResults = ({
  defaultSortType,
  defaultSortDirection,
  defaultPage,
  defaultKeyphrase,
  defaultProductsPerPage,
  title,
}) => {
  const {
    actions: {
      onResultsPerPageChange,
      onPageNumberChange,
      onFilterClick,
      onSortChange,
      onFacetClick,
      onClearFilters,
      onProductClick,
    },
    context: {
      sortType = defaultSortType,
      sortDirection = defaultSortDirection,
      page = defaultPage,
      productsPerPage = defaultProductsPerPage,
    },
    queryResult: {
      isLoading,
      data: {
        total_page: totalPages = 0,
        total_item: totalItems = 0,
        sort: { choices: sortChoices = [] } = {},
        facet: facets = [],
        facet_names: facetNames = [],
        content: { product: { value: products = [] } = {} } = {},
        context_values: { category } = {},
      } = {},
    },
  } = useSearchResults((query) => {
    query.getRequest().setContextValuesCategoryItems(['name', 'url_path']);

    return {
      sortType,
      sortDirection,
      page,
      productsPerPage,
      keyphrase: defaultKeyphrase,
    };
  });

  const { value: [{ name: searchResultTitle = title } = {}] = [] } = category || {};

  const selectedSortIndex = sortChoices.findIndex((s) => s.name === sortType && s.order === sortDirection);
  const categories = useSearchResultsBreadcrumb();
  const selectedFacetsFromApi = useSearchResultsSelectedFacets();

  const defaultCardView = CARD_VIEW_GRID;
  const [dir, setDir] = useState(defaultCardView);
  const onToggle = (value = defaultCardView) => setDir(value);
  if (isLoading) {
    return <Loader enabled={isLoading} />;
  }
  return (
    <SearchResultsLayout.Wrapper>
      <div className="mt-3">
        <StyledBreadcrumb.Root>
          <StyledBreadcrumb.Navigation>
            <StyledBreadcrumb.List>
              <StyledBreadcrumb.Item key="home">
                <StyledBreadcrumb.Link as={Link} to="/">
                  Home
                </StyledBreadcrumb.Link>
                <StyledBreadcrumb.Separator value="»" />
              </StyledBreadcrumb.Item>
              {categories.length ? (
                categories.map((c, index, { length }) => (
                  <StyledBreadcrumb.Item key={c.url_path}>
                    <StyledBreadcrumb.Link as={Link} to={c.url_path} onClick={(e) => e.preventDefault()}>
                      {c.name}
                    </StyledBreadcrumb.Link>
                    {index < length - 1 && <StyledBreadcrumb.Separator value="»" />}
                  </StyledBreadcrumb.Item>
                ))
              ) : (
                <StyledBreadcrumb.Item key="search">Search</StyledBreadcrumb.Item>
              )}
            </StyledBreadcrumb.List>
          </StyledBreadcrumb.Navigation>
        </StyledBreadcrumb.Root>
      </div>
      <SearchResultsLayout.MainArea>
        <SearchResultsLayout.LeftArea>
          {selectedFacetsFromApi.length > 0 && (
            <StyledFilters.ClearFilters onClick={onClearFilters}>Clear Filters</StyledFilters.ClearFilters>
          )}

          <StyledAccordionFacets.Root
            defaultFacetTypesExpandedList={[]}
            onFacetTypesExpandedListChange={() => {}}
            onFacetValueClick={onFacetClick}
          >
            {facetNames.map((f) => (
              <StyledAccordionFacets.Facet key={f} facetId={f}>
                <StyledAccordionFacets.Header>
                  <StyledAccordionFacets.Trigger>
                    {facets[f].display_name}
                    <StyledAccordionFacets.Icon aria-hidden />
                  </StyledAccordionFacets.Trigger>
                </StyledAccordionFacets.Header>
                <AccordionFacets.Content>
                  <StyledAccordionFacets.ValueList>
                    {facets[f].value.map((v, index) => (
                      <StyledAccordionFacets.Item
                        key={v.id}
                        {...{
                          index,
                          facetValueId: v.id,
                        }}
                      >
                        <StyledAccordionFacets.ItemCheckbox>
                          <StyledAccordionFacets.ItemCheckboxIndicator>
                            <CheckIcon />
                          </StyledAccordionFacets.ItemCheckboxIndicator>
                        </StyledAccordionFacets.ItemCheckbox>
                        <StyledAccordionFacets.ItemCheckboxLabel>
                          {v.text} {v.count && `(${v.count})`}
                        </StyledAccordionFacets.ItemCheckboxLabel>
                      </StyledAccordionFacets.Item>
                    ))}
                  </StyledAccordionFacets.ValueList>
                </AccordionFacets.Content>
              </StyledAccordionFacets.Facet>
            ))}
          </StyledAccordionFacets.Root>
        </SearchResultsLayout.LeftArea>
        <SearchResultsLayout.RightArea>
          <h2>{searchResultTitle}</h2>
          <StyledFilters.SelectedFiltersList>
            {selectedFacetsFromApi.map((selectedFacet) =>
              selectedFacet.values.map((v) => (
                <StyledFilters.SelectedFiltersListItem key={`selectedFacet-${selectedFacet.id}-${v.id}`}>
                  <StyledFilters.SelectedFiltersListItemText>
                    {selectedFacet.name}: {v.text}
                  </StyledFilters.SelectedFiltersListItemText>
                  <StyledFilters.SelectedFiltersListItemButton
                    onClick={() =>
                      onFilterClick({
                        facetId: selectedFacet.id,
                        facetValueId: v.id,
                        checked: false,
                      })
                    }
                  >
                    X
                  </StyledFilters.SelectedFiltersListItemButton>
                </StyledFilters.SelectedFiltersListItem>
              )),
            )}
          </StyledFilters.SelectedFiltersList>
          {/* Sort Select */}
          <SearchResultsLayout.RightTopArea>
            <SearchResultsLayout.RightTopAreaContainer>
              {totalItems && (
                <StyledQuerySummary>
                  Showing {productsPerPage * (page - 1) + 1} - {productsPerPage * (page - 1) + products.length} of{' '}
                  {totalItems} results
                </StyledQuerySummary>
              )}
            </SearchResultsLayout.RightTopAreaContainer>
            <SearchResultsLayout.RightTopAreaContainer>
              <StyledSortSelect.Root
                defaultValue={selectedSortIndex > -1 ? sortChoices[selectedSortIndex] : {}}
                onValueChange={onSortChange}
              >
                <StyledSortSelect.Trigger>
                  <StyledSortSelect.SelectValue>
                    {selectedSortIndex > -1 ? sortChoices[selectedSortIndex].label : ''}
                  </StyledSortSelect.SelectValue>
                  <StyledSortSelect.Icon />
                </StyledSortSelect.Trigger>
                <StyledSortSelect.Content>
                  <StyledSortSelect.Viewport>
                    {sortChoices.map((option) => (
                      <StyledSortSelect.Option key={JSON.stringify(option)} value={option}>
                        <StyledSortSelect.OptionText>{option.label}</StyledSortSelect.OptionText>
                      </StyledSortSelect.Option>
                    ))}
                  </StyledSortSelect.Viewport>
                </StyledSortSelect.Content>
              </StyledSortSelect.Root>

              {/* Card View Switcher */}
              <StyledCardViewSwitcher.Root onValueChange={onToggle} defaultValue={defaultCardView}>
                <StyledCardViewSwitcher.Item value="grid" aria-label="Grid View">
                  <GridIcon />
                </StyledCardViewSwitcher.Item>
                <StyledCardViewSwitcher.Item value="list" aria-label="List View">
                  <ListBulletIcon />
                </StyledCardViewSwitcher.Item>
              </StyledCardViewSwitcher.Root>
            </SearchResultsLayout.RightTopAreaContainer>
          </SearchResultsLayout.RightTopArea>

          {/* Results */}
          {dir === CARD_VIEW_GRID ? (
            <StyledGrid>
              {products.map((p) => (
                <ProductCard product={p} key={p.sku} onProductClick={onProductClick} />
              ))}
            </StyledGrid>
          ) : (
            <StyledRow>
              {products.map((p) => (
                <ProductCardListView product={p} key={p.sku} onProductClick={onProductClick} />
              ))}
            </StyledRow>
          )}

          <StyledPageControls className="py-4">
            <div>
              <StyledSelect.Label>Results Per Page: </StyledSelect.Label>
              <StyledSelect.Root
                defaultValue={String(defaultProductsPerPage)}
                onValueChange={(v) => onResultsPerPageChange({ numProducts: Number(v) })}
              >
                <StyledSelect.Trigger>
                  <StyledSelect.SelectValue />
                  <StyledSelect.Icon />
                </StyledSelect.Trigger>
                <StyledSelect.Content>
                  <StyledSelect.Viewport>
                    <StyledSelect.Option value="24">
                      <StyledSelect.OptionText>24</StyledSelect.OptionText>
                    </StyledSelect.Option>

                    <StyledSelect.Option value="48">
                      <StyledSelect.OptionText>48</StyledSelect.OptionText>
                    </StyledSelect.Option>

                    <StyledSelect.Option value="64">
                      <StyledSelect.OptionText>64</StyledSelect.OptionText>
                    </StyledSelect.Option>
                  </StyledSelect.Viewport>
                </StyledSelect.Content>
              </StyledSelect.Root>
            </div>
            <div>
              <Pagination page={page} defaultPage={1} totalPages={totalPages} onPageChange={onPageNumberChange} />
            </div>
          </StyledPageControls>
        </SearchResultsLayout.RightArea>
      </SearchResultsLayout.MainArea>
    </SearchResultsLayout.Wrapper>
  );
};

SearchResults.propTypes = {
  defaultSortType: PropTypes.string,
  defaultSortDirection: PropTypes.string,
  defaultPage: PropTypes.number,
  defaultKeyphrase: PropTypes.string,
  defaultProductsPerPage: PropTypes.number,
  title: PropTypes.string,
};

SearchResults.defaultProps = {
  defaultSortType: 'featured',
  defaultSortDirection: 'desc',
  defaultPage: 1,
  defaultKeyphrase: '',
  defaultProductsPerPage: 24,
  title: '',
};

export const SearchQueryResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  return <SearchResults defaultKeyphrase={query} title={`Showing results for "${query}"`} />;
};

const SearchResultsWidget = widget(SearchResults, WidgetDataType.SEARCH_RESULTS);
export default SearchResultsWidget;
