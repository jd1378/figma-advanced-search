import { h, JSX } from 'preact';
import {
  OnValueChange,
  Checkbox,
  Muted,
  Text,
  VerticalSpace,
  Container,
} from '@create-figma-plugin/ui';
import { useCallback } from 'preact/hooks';
import GenericField from '../generic_field';
import { BySelectedNode } from '../../types';

export type FieldProps = {
  onValueInput: OnValueChange<BySelectedNode['styles'], string>;
  value: BySelectedNode['styles'];
};

function StylesConstraint({ onValueInput, value }: FieldProps) {
  const handleBgChange = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      onValueInput({
        ...value,
        backgroundStyleId: event.currentTarget.checked,
      });
    },
    [onValueInput],
  );

  const handleEffChange = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      onValueInput({
        ...value,
        effectStyleId: event.currentTarget.checked,
      });
    },
    [onValueInput],
  );

  const handleFillChange = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      onValueInput({
        ...value,
        fillStyleId: event.currentTarget.checked,
      });
    },
    [onValueInput],
  );

  const handleGridChange = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      onValueInput({
        ...value,
        gridStyleId: event.currentTarget.checked,
      });
    },
    [onValueInput],
  );

  const handleStrokeChange = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      onValueInput({
        ...value,
        strokeStyleId: event.currentTarget.checked,
      });
    },
    [onValueInput],
  );

  const handleTextChange = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      onValueInput({
        ...value,
        textStyleId: event.currentTarget.checked,
      });
    },
    [onValueInput],
  );

  const resetValue = useCallback(() => {
    if (onValueInput) {
      onValueInput(undefined);
    }
  }, [onValueInput]);

  return (
    <GenericField name="Styles" resetValue={resetValue} open={!!value}>
      <VerticalSpace space="small" />
      <Container space="small">
        <Checkbox
          onChange={handleBgChange}
          value={value?.backgroundStyleId || false}
        >
          <Text>
            <Muted>Background Style</Muted>
          </Text>
        </Checkbox>
        <VerticalSpace space="small" />
        <Checkbox
          onChange={handleEffChange}
          value={value?.effectStyleId || false}
        >
          <Text>
            <Muted>Effect Style</Muted>
          </Text>
        </Checkbox>
        <VerticalSpace space="small" />
        <Checkbox
          onChange={handleFillChange}
          value={value?.fillStyleId || false}
        >
          <Text>
            <Muted>Fill Style</Muted>
          </Text>
        </Checkbox>
        <VerticalSpace space="small" />
        <Checkbox
          onChange={handleGridChange}
          value={value?.gridStyleId || false}
        >
          <Text>
            <Muted>Grid Style</Muted>
          </Text>
        </Checkbox>
        <VerticalSpace space="small" />
        <Checkbox
          onChange={handleStrokeChange}
          value={value?.strokeStyleId || false}
        >
          <Text>
            <Muted>Stroke Style</Muted>
          </Text>
        </Checkbox>
        <VerticalSpace space="small" />
        <Checkbox
          onChange={handleTextChange}
          value={value?.textStyleId || false}
        >
          <Text>
            <Muted>Text Style</Muted>
          </Text>
        </Checkbox>
      </Container>
    </GenericField>
  );
}

export default StylesConstraint;
