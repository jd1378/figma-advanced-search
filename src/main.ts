import { once, emit, showUI, on } from '@create-figma-plugin/utilities';
import isEmpty from 'lodash/isEmpty';

import {
  CloseHandler,
  SearchAndSelectHandler,
  SearchOptions,
  SearchResultHandler,
  SelectionChangedHandler,
  UIReadyHandler,
} from './types';

export default () => {
  on<UIReadyHandler>('UI_READY', () => {
    emit<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      !figma.currentPage.selection.length,
    );
  });
  figma.on('selectionchange', () => {
    emit<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      !figma.currentPage.selection.length,
    );
  });
  on<SearchAndSelectHandler>(
    'SEARCH_AND_SELECT',
    (searchOptions: SearchOptions) => {
      let selectedNodesCount = 0;
      try {
        if (!isEmpty(searchOptions)) {
          const { name, bySelectedNode } = searchOptions;
          const foundNodes: Array<SceneNode> = figma.currentPage.findAll(
            (node) => {
              if (name && !node.name.includes(name)) {
                return false;
              }

              if (!isEmpty(bySelectedNode)) {
                const selectedNode = figma.currentPage.selection[0];
                if (bySelectedNode.size?.height) {
                  if (node.height !== selectedNode.height) return false;
                }
                if (bySelectedNode.size?.width) {
                  if (node.width !== selectedNode.width) return false;
                }
                if (
                  bySelectedNode.styles?.backgroundStyleId &&
                  'backgroundStyleId' in selectedNode
                ) {
                  if ('backgroundStyleId' in node) {
                    if (
                      node.backgroundStyleId !== selectedNode.backgroundStyleId
                    ) {
                      return false;
                    }
                  } else {
                    return false;
                  }
                }
                if (
                  bySelectedNode.styles?.effectStyleId &&
                  'effectStyleId' in selectedNode
                ) {
                  if ('effectStyleId' in node) {
                    if (node.effectStyleId !== selectedNode.effectStyleId) {
                      return false;
                    }
                  } else {
                    return false;
                  }
                }
                if (
                  bySelectedNode.styles?.fillStyleId &&
                  'fillStyleId' in selectedNode
                ) {
                  if ('fillStyleId' in node) {
                    if (node.fillStyleId !== selectedNode.fillStyleId) {
                      return false;
                    }
                  } else {
                    return false;
                  }
                }
                if (
                  bySelectedNode.styles?.gridStyleId &&
                  'gridStyleId' in selectedNode
                ) {
                  if ('gridStyleId' in node) {
                    if (node.gridStyleId !== selectedNode.gridStyleId) {
                      return false;
                    }
                  } else {
                    return false;
                  }
                }
                if (
                  bySelectedNode.styles?.strokeStyleId &&
                  'strokeStyleId' in selectedNode
                ) {
                  if ('strokeStyleId' in node) {
                    if (node.strokeStyleId !== selectedNode.strokeStyleId) {
                      return false;
                    }
                  } else {
                    return false;
                  }
                }
                if (
                  bySelectedNode.styles?.textStyleId &&
                  'textStyleId' in selectedNode
                ) {
                  if ('textStyleId' in node) {
                    if (node.textStyleId !== selectedNode.textStyleId) {
                      return false;
                    }
                  } else {
                    return false;
                  }
                }
              }
              return true;
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
    height: 250,
    width: 240,
  });
};
