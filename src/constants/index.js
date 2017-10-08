import { sortBy } from 'lodash';

export const DEFAULT_QUERY = 'react';
export const DEFAULT_PAGE = 0;
export const DEFAULT_HPP = '15';

export const PATH_BASE = 'https://hn.algolia.com/api/v1';
export const PATH_SEARCH = '/search';
export const PARAM_SEARCH = 'query=';
export const PARAM_PAGE = 'page=';
export const PARAM_HPP = 'hitsPerPage=';

// CUSTOM
export const PATH_RSS = 'https://meduza.io/api/v3/search?chrono=articles&page=0&per_page=10&locale=ru';
// CUSTOM

export const STYLES = {
  largeColumn: {
    width: '40%',
  },
  smallColumn: {
    width: '10%',
  },
  xSmallColumn: {
    width: '5%',
  },
  image: {
    width: '50px',
  },
};
 export const SORTS = {
 	NONE: list => list,
 	TITLE: list => sortBy(list, 'title'),
 	AUTHOR: list => sortBy(list, 'author'),
 	URL: list => sortBy(list, 'url'),
 	COMMENTS: list => sortBy(list, 'num_comments').reverse(),
 	POINTS: list => sortBy(list, 'points').reverse(),
 }
