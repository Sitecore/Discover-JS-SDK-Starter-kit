import { BASE_PATH } from './constants';

export default (product, includeBasePath = false) => {
  const basename = includeBasePath ? BASE_PATH : '';
  return `${basename}/product/detail${product.sku_url_key}`;
};
