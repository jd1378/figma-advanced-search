import { EventHandler } from '@create-figma-plugin/utilities';

export type StyleConstraints = {
  strokeStyleId?: boolean;
  fillStyleId?: boolean;
  gridStyleId?: boolean;
  effectStyleId?: boolean;
  backgroundStyleId?: boolean;
  textStyleId?: boolean;
};

export type SizeConstraints = {
  width?: boolean;
  height?: boolean;
};

export type BySelectedNode = {
  styles?: StyleConstraints;
  size?: SizeConstraints;
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

export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED';
  handler: (
    /** is the new selection empty or has nodes */ isEmpty: boolean,
  ) => void;
}

export interface UIReadyHandler extends EventHandler {
  name: 'UI_READY';
  handler: () => void;
}
