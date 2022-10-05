import {
  Button,
  Columns,
  Container,
  Divider,
  LoadingIndicator,
  Muted,
  render,
  Text,
  Textbox,
  VerticalSpace,
} from '@create-figma-plugin/ui';
import { emit, on } from '@create-figma-plugin/utilities';
import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import isEmpty from 'lodash/isEmpty';

import {
  CloseHandler,
  SearchAndSelectHandler,
  SearchOptions,
  SearchResultHandler,
} from './types';
import TextField from './text_field';

function Plugin() {
  const [selectedNodesCount, setSelectedNodesCount] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searchTerms, setSearchTerms] = useState<SearchOptions>({});
  const [name, setName] = useState('');

  useEffect(() => {
    const newSearchTerms: SearchOptions = {};
    if (name) {
      newSearchTerms.name = name;
    }
    setSearchTerms(newSearchTerms);
  }, [name]);

  const handleSearchAndSelectClick = useCallback(() => {
    if (!isEmpty(searchTerms) && !searching) {
      setSearching(true);
      // timeout to allow UI to show the loading indicator, since the ui will freeze if theres too many stuff
      setTimeout(() => {
        emit<SearchAndSelectHandler>('SEARCH_AND_SELECT', searchTerms);
      }, 10);
    }
  }, [searchTerms, searching]);

  useEffect(() => {
    on<SearchResultHandler>('SEARCH_RESULT', (result) => {
      setSearching(false);
      setSelectedNodesCount(result.selectedNodesCount);
    });
  });

  const handleCloseClick = useCallback(() => {
    emit<CloseHandler>('CLOSE');
  }, []);
  return (
    <Container space="medium">
      <VerticalSpace space="small" />
      <Text>Search Constraints</Text>
      <VerticalSpace space="small" />
      <Divider />
      <VerticalSpace space="small" />
      <TextField name="by name" onValueInput={setName} value={name} />
      <VerticalSpace space="large" />
      <Text>
        <Muted>Selected Nodes: {selectedNodesCount}</Muted>
      </Text>
      <VerticalSpace space="extraLarge" />
      <Columns space="extraSmall">
        <Button fullWidth onClick={handleSearchAndSelectClick}>
          {searching ? <LoadingIndicator /> : 'Search And Select'}
        </Button>
        <Button fullWidth onClick={handleCloseClick} secondary>
          Close
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
