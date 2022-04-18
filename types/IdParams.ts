import { ParsedUrlQuery } from 'querystring';

export interface IdParams extends ParsedUrlQuery {
  id: string;
}
