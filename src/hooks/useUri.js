import { useLocation } from 'react-router-dom';
import { BASE_PATH } from '../helpers/constants';

const useUri = () => {
  const location = useLocation();

  return `${BASE_PATH}${location.pathname}${location.search}`;
};

export default useUri;
