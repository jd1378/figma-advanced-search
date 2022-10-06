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
  onValueInput: OnValueChange<BySelectedNode['size'], string>;
  value: BySelectedNode['size'];
};

function SizeConstraint({ onValueInput, value }: FieldProps) {
  const handleWidthChange = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      onValueInput({ ...value, width: event.currentTarget.checked });
    },
    [onValueInput, value],
  );

  const handleHeightChange = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      onValueInput({ ...value, height: event.currentTarget.checked });
    },
    [onValueInput, value],
  );

  const resetValue = useCallback(() => {
    if (onValueInput) {
      onValueInput(undefined);
    }
  }, [onValueInput]);

  return (
    <GenericField name="Size" resetValue={resetValue} open={!!value}>
      <VerticalSpace space="small" />
      <Container space="small">
        <Checkbox onChange={handleWidthChange} value={value?.width || false}>
          <Text>
            <Muted>Width</Muted>
          </Text>
        </Checkbox>
        <VerticalSpace space="small" />
        <Checkbox onChange={handleHeightChange} value={value?.height || false}>
          <Text>
            <Muted>Height</Muted>
          </Text>
        </Checkbox>
      </Container>
    </GenericField>
  );
}

export default SizeConstraint;
