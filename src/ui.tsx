import {
  Button,
  Columns,
  Container,
  Divider,
  LoadingIndicator,
  Muted,
  render,
  Text,
  VerticalSpace,
} from '@create-figma-plugin/ui';
import { emit, on } from '@create-figma-plugin/utilities';
import { h } from 'preact';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'preact/hooks';
import isEmpty from 'lodash/isEmpty';

import {
  BySelectedNode,
  CloseHandler,
  SearchAndSelectHandler,
  SearchOptions,
  SearchResultHandler,
  SelectionChangedHandler,
  UIReadyHandler,
} from './types';
import TextField from './components/text_field';
import SelectedNodeField from './components/selected_node_field';

function Plugin() {
  const [selectedNodesCount, setSelectedNodesCount] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searchTerms, setSearchTerms] = useState<SearchOptions>({});
  const [hasSelectedNode, setHasSelectedNode] = useState(false);
  const [lastSelectionConstraints, setLastSelectionConstraints] = useState<
    BySelectedNode | undefined
  >(undefined);
  const [name, setName] = useState('');
  const [bySelectedNode, setBySelectedNode] = useState<
    BySelectedNode | undefined
  >(undefined);

  useEffect(() => {
    const newSearchTerms: SearchOptions = {};
    if (name) {
      newSearchTerms.name = name;
    }
    if (!isEmpty(bySelectedNode)) {
      newSearchTerms.bySelectedNode = bySelectedNode;
    }
    setSearchTerms(newSearchTerms);
  }, [name, bySelectedNode]);

  useEffect(() => {
    if (bySelectedNode) {
      setLastSelectionConstraints(bySelectedNode);
    }
  }, [bySelectedNode, setLastSelectionConstraints]);

  const handleSearchAndSelectClick = useCallback(() => {
    if (!isEmpty(searchTerms) && !searching) {
      setSearching(true);
      // timeout to allow UI to show the loading indicator, since the ui will freeze if theres too many stuff
      setTimeout(() => {
        emit<SearchAndSelectHandler>('SEARCH_AND_SELECT', searchTerms);
      }, 10);
    }
  }, [searchTerms, searching]);

  const handleSelectedNodeFieldOpened = useCallback(() => {
    if (lastSelectionConstraints) {
      setBySelectedNode(lastSelectionConstraints);
    } else {
      setBySelectedNode({
        size: {
          height: true,
          width: true,
        },
        styles: {
          backgroundStyleId: true,
          effectStyleId: true,
          fillStyleId: true,
          gridStyleId: true,
          strokeStyleId: true,
          textStyleId: true,
        },
      });
    }
  }, [lastSelectionConstraints, setBySelectedNode]);

  useEffect(() => {
    return on<SearchResultHandler>('SEARCH_RESULT', (result) => {
      setSearching(false);
      setSelectedNodesCount(result.selectedNodesCount);
    });
  });

  useEffect(() => {
    // once we are ready we retrieve the needed data from main instance
    return on<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      (isSelectionEmpty) => {
        if (isSelectionEmpty) {
          setHasSelectedNode(false);
          setBySelectedNode(undefined);
        } else {
          setHasSelectedNode(true);
          handleSelectedNodeFieldOpened();
        }
      },
    );
  }, [setBySelectedNode, setHasSelectedNode, handleSelectedNodeFieldOpened]);

  useLayoutEffect(() => {
    // once we are ready we retrieve the needed data from main instance
    emit<UIReadyHandler>('UI_READY');
  }, []);

  const handleCloseClick = useCallback(() => {
    emit<CloseHandler>('CLOSE');
  }, []);

  return (
    <Container
      space="medium"
      style={{
        minHeight: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        display: 'flex',
      }}
    >
      <div>
        <VerticalSpace space="small" />
        <Text>Search Constraints (Current Page)</Text>
        <VerticalSpace space="small" />
        <Divider />
        <VerticalSpace space="small" />
        <div>
          <SelectedNodeField
            disabled={!hasSelectedNode}
            onValueInput={setBySelectedNode}
            value={bySelectedNode}
            opened={handleSelectedNodeFieldOpened}
          />
          <VerticalSpace space="medium" />
          <TextField name="By Name" onValueInput={setName} value={name} />
        </div>
      </div>

      <VerticalSpace space="large" />

      <div>
        <Text>
          <Muted>Selected Nodes: {selectedNodesCount}</Muted>
        </Text>
        <VerticalSpace space="large" />
        <Columns space="extraSmall">
          <Button fullWidth onClick={handleSearchAndSelectClick}>
            {searching ? <LoadingIndicator /> : 'Search And Select'}
          </Button>
          <Button fullWidth onClick={handleCloseClick} secondary>
            Close
          </Button>
        </Columns>
        <VerticalSpace space="small" />
      </div>
    </Container>
  );
}

export default render(Plugin);
