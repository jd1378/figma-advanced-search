import { EventHandler } from '@create-figma-plugin/utilities';

export type StyleConstraints = {
  strokeStyleId?: string;
  fillStyleId?: string;
  gridStyleId?: string;
  effectStyleId?: string;
  backgroundStyleId?: string;
  textStyleId?: string;
};

export type BySelectedNode = {
  styles?: StyleConstraints;
  size?: StyleConstraints;
  effectStyleId?: string;
};

export type SearchOptions = {
  name?: string;
  bySelectedNode?: BySelectedNode;
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
