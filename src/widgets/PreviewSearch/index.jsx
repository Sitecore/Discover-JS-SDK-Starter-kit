import { widget, WidgetDataType } from '@sitecore-discover/react';
import { usePreviewSearchWithLocks } from '@sitecore-discover/ui';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getProductUrl from '../../helpers/getProductUrl';

import Loader from '../../components/Loader';
import {
  DefaultStyledTrigger,
  Group,
  Link,
  SearchGroupHeading,
  StyledGrid,
  StyledGroupList,
  StyledIconSearch,
  StyledInputTrigger,
  StyledMainContent,
  StyledMainList,
  StyledMainListItem,
  StyledProductCard,
  StyledRoot,
  StyledSubContent,
  StyledSubItem,
  StyledSubList,
  StyledTrigger,
} from './styled';

const PreviewSearchLeft = ({ defaultProductsPerPage }) => {
  const {
    setLock,
    lock,
    categoriesToShow,
    suggestionsToShow,
    trendingCategoriesToShow,
    context: { productsPerPage = defaultProductsPerPage, keyphrase },
    actions: { onKeyphraseChange, onCategoryChange, onTrendingCategoryChange, onSuggestionChange, onProductClick },
    queryResult: { isFetching, isLoading, data: { content: { product: { value: products = [] } = {} } = {} } = {} },
  } = usePreviewSearchWithLocks((query) => {
    query.getRequest().setNumberProducts(productsPerPage);
    return {
      productsPerPage,
    };
  });

  const loading = (isLoading || isFetching) && !lock;
  const [activeItem, setActiveItem] = useState('defaultProductsResults');
  const [value, setValue] = useState('');
  const onValueChange = (newValue) => {
    setValue(newValue);
  };

  const keyphraseHandler = useCallback((event) => {
    const { target } = event;
    setLock(false);
    setActiveItem('defaultProductsResults');
    onKeyphraseChange({ keyphrase: target.value });
  }, []);

  const trendingCategoryHandler = useCallback((text) => {
    setLock(true);
    setActiveItem(text);
    // call onTrendingCategoryChange function, when in CEC the analyzer selected for `category_names` is set in `lowercase`.
    // To check that, Go to CEC -> Administration -> Feature Configuration -> Filters -> search `category_names` and check analyzer used
    onTrendingCategoryChange({ trendingCategory: text });
    // if lowercase analyzer want not be enabled, then use `onSuggestionChange` function
    // onSuggestionChange({ suggestion: text });
  }, []);

  const categoryHandler = useCallback((text) => {
    setLock(true);
    setActiveItem(text);
    // call onCategoryChange function, when in CEC the analyzer selected for `category_names` is set in `lowercase`.
    // To check that, Go to CEC -> Administration -> Feature Configuration -> Filters -> search `category_names` and check analyzer used
    onCategoryChange({ category: text });
    // if lowercase analyzer want not be enabled, then use `onSuggestionChange` function
    // onSuggestionChange({ suggestion: text });
  }, []);

  const suggestionHandler = useCallback((text) => {
    setLock(true);
    setActiveItem(text);
    onSuggestionChange({ suggestion: text });
  }, []);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue('');
    navigate(`/search?q=${keyphrase}`);
  };

  return (
    <StyledRoot onValueChange={onValueChange} value={value}>
      <StyledMainList>
        <StyledMainListItem>
          <form onSubmit={handleSubmit}>
            <StyledInputTrigger onKeyUp={keyphraseHandler} autoComplete="off" placeholder="Search" />
          </form>
          <StyledIconSearch />
          <StyledMainContent>
            {loading && <Loader enabled={loading} />}
            {!loading && (
              <StyledSubContent orientation="vertical" value={activeItem}>
                <StyledGroupList>
                  {trendingCategoriesToShow.length > 0 && (
                    <>
                      <SearchGroupHeading>Trending Categories</SearchGroupHeading>
                      {trendingCategoriesToShow.map(({ text }) => (
                        <Group value={text} key={text}>
                          <StyledTrigger
                            onMouseOver={(e) => {
                              const { target } = e;
                              target.focus();
                            }}
                            onFocus={() => trendingCategoryHandler(text)}
                          >
                            {text}
                          </StyledTrigger>
                          <StyledGrid>
                            <StyledSubList>
                              {products.map((p, i) => (
                                <StyledSubItem key={i.toString()}>
                                  <Link
                                    href={getProductUrl(p, true)}
                                    onClick={(event) => {
                                      event.preventDefault();
                                      onProductClick({ sku: p.sku || '' });
                                      navigate(getProductUrl(p));
                                    }}
                                  >
                                    <StyledProductCard.Root product={p}>
                                      <StyledProductCard.Image />
                                      <StyledProductCard.Name />
                                      {p.final_price && (
                                        <StyledProductCard.Price>${p.final_price}</StyledProductCard.Price>
                                      )}
                                    </StyledProductCard.Root>
                                  </Link>
                                </StyledSubItem>
                              ))}
                            </StyledSubList>
                          </StyledGrid>
                        </Group>
                      ))}
                    </>
                  )}

                  {categoriesToShow.length > 0 && (
                    <>
                      <SearchGroupHeading>Categories</SearchGroupHeading>
                      {categoriesToShow.map(({ text }) => (
                        <Group value={text} key={text}>
                          <StyledTrigger
                            onMouseOver={(e) => {
                              const { target } = e;
                              target.focus();
                            }}
                            onFocus={() => categoryHandler(text)}
                          >
                            {text}
                          </StyledTrigger>
                          <StyledGrid>
                            <StyledSubList>
                              {products.map((p, i) => (
                                <StyledSubItem key={i.toString()}>
                                  <Link
                                    href={getProductUrl(p, true)}
                                    onClick={(event) => {
                                      event.preventDefault();
                                      onProductClick({ sku: p.sku || '' });
                                      navigate(getProductUrl(p));
                                    }}
                                  >
                                    <StyledProductCard.Root product={p}>
                                      <StyledProductCard.Image />
                                      <StyledProductCard.Name />
                                      {p.final_price && (
                                        <StyledProductCard.Price>${p.final_price}</StyledProductCard.Price>
                                      )}
                                    </StyledProductCard.Root>
                                  </Link>
                                </StyledSubItem>
                              ))}
                            </StyledSubList>
                          </StyledGrid>
                        </Group>
                      ))}
                    </>
                  )}
                  {suggestionsToShow.length > 0 && (
                    <>
                      <SearchGroupHeading>Suggestions</SearchGroupHeading>
                      {suggestionsToShow.map(({ text }) => (
                        <Group value={text} key={text}>
                          <StyledTrigger
                            onMouseOver={(e) => {
                              const { target } = e;
                              target.focus();
                            }}
                            onFocus={() => suggestionHandler(text)}
                          >
                            {text}
                          </StyledTrigger>
                          <StyledGrid>
                            <StyledSubList>
                              {products.map((p, i) => (
                                <StyledSubItem key={i.toString()}>
                                  <Link
                                    href={getProductUrl(p, true)}
                                    onClick={(event) => {
                                      event.preventDefault();
                                      onProductClick({ sku: p.sku || '' });
                                      navigate(getProductUrl(p));
                                    }}
                                  >
                                    <StyledProductCard.Root product={p}>
                                      <StyledProductCard.Image />
                                      <StyledProductCard.Name />
                                      {p.final_price && (
                                        <StyledProductCard.Price>${p.final_price}</StyledProductCard.Price>
                                      )}
                                    </StyledProductCard.Root>
                                  </Link>
                                </StyledSubItem>
                              ))}
                            </StyledSubList>
                          </StyledGrid>
                        </Group>
                      ))}
                    </>
                  )}
                  {/* ul */}
                  <Group value="defaultProductsResults" key="defaultProductsResults">
                    {/* li */}
                    <DefaultStyledTrigger aria-hidden />
                    <StyledGrid>
                      <StyledSubList>
                        {/* ul */}
                        {products.map((p, i) => (
                          <StyledSubItem key={i.toString()}>
                            {/* li */}
                            <Link
                              href={getProductUrl(p, true)}
                              onClick={(event) => {
                                event.preventDefault();
                                onProductClick({ sku: p.sku || '' });
                                navigate(getProductUrl(p));
                              }}
                            >
                              <StyledProductCard.Root product={p}>
                                <StyledProductCard.Image />
                                <StyledProductCard.Name />
                                {p.final_price && <StyledProductCard.Price>${p.final_price}</StyledProductCard.Price>}
                              </StyledProductCard.Root>
                            </Link>
                          </StyledSubItem>
                        ))}
                      </StyledSubList>
                    </StyledGrid>
                  </Group>
                </StyledGroupList>
              </StyledSubContent>
            )}
          </StyledMainContent>
        </StyledMainListItem>
      </StyledMainList>
    </StyledRoot>
  );
};

PreviewSearchLeft.propTypes = { defaultProductsPerPage: PropTypes.number };
PreviewSearchLeft.defaultProps = { defaultProductsPerPage: 6 };

const PriviewSearchLeftTemplate = widget(PreviewSearchLeft, WidgetDataType.PREVIEW_SEARCH);
export default PriviewSearchLeftTemplate;
