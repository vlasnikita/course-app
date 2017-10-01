import { sortBy } from 'lodash';

export const DEFAULT_QUERY = '';
export const DEFAULT_PAGE = 0;
export const DEFAULT_HPP = '15';

export const PATH_BASE = 'https://hn.algolia.com/api/v1';
export const PATH_SEARCH = '/search';
export const PARAM_SEARCH = 'query=';
export const PARAM_PAGE = 'page=';
export const PARAM_HPP = 'hitsPerPage=';

export const STYLES = {
  largeColumn: {
    width: '40%',
  },
  smallColumn: {
    width: '10%',
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