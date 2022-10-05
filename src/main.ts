import { once, emit, showUI, on } from '@create-figma-plugin/utilities';
import isEmpty from 'lodash/isEmpty';

import {
  CloseHandler,
  SearchAndSelectHandler,
  SearchOptions,
  SearchResultHandler,
} from './types';

export default () => {
  on<SearchAndSelectHandler>(
    'SEARCH_AND_SELECT',
    (searchOptions: SearchOptions) => {
      let selectedNodesCount = 0;
      try {
        if (!isEmpty(searchOptions)) {
          const { name } = searchOptions;
          const foundNodes: Array<SceneNode> = figma.currentPage.findAll(
            (node) => {
              if (name && node.name.includes(name)) {
                return true;
              }
              return false;
            },
          );
          if (foundNodes.length) {
            selectedNodesCount = foundNodes.length;
            figma.currentPage.selection = foundNodes;
            figma.viewport.scrollAndZoomIntoView(foundNodes);
          }
        }
      } finally {
        emit<SearchResultHandler>('SEARCH_RESULT', {
          selectedNodesCount,
        });
      }
    },
  );
  once<CloseHandler>('CLOSE', () => {
    figma.closePlugin();
  });
  showUI({
    height: 200,
    width: 240,
  });
};
