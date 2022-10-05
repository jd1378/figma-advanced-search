import { EventHandler } from '@create-figma-plugin/utilities';

export type SearchOptions = {
  name?: string;
};

export type SearchResult = {
  selectedNodesCount: number;
};

export interface SearchResultHandler extends EventHandler {
  name: 'SEARCH_RESULT';
  handler: (result: SearchResult) => void;
}

export interface SearchAndSelectHandler extends EventHandler {
  name: 'SEARCH_AND_SELECT';
  handler: (options: SearchOptions) => void;
}

export interface CloseHandler extends EventHandler {
  name: 'CLOSE';
  handler: () => void;
}
