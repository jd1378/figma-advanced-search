import { h } from 'preact';
import {
  Container,
  OnValueChange,
  VerticalSpace,
} from '@create-figma-plugin/ui';
import { useCallback } from 'preact/hooks';
import GenericField from '../generic_field';
import { BySelectedNode, SizeConstraints, StyleConstraints } from '../../types';
import SizeConstraint from './size_constraint';
import StylesConstraint from './styles_constraint';

export type FieldProps = {
  onValueInput: OnValueChange<BySelectedNode | undefined, string>;
  value: BySelectedNode | undefined;
  opened?: () => void;
  disabled?: boolean;
};

function SelectedNodeField({
  onValueInput,
  value,
  disabled = false,
  opened,
}: FieldProps) {
  const resetValue = useCallback(() => {
    if (onValueInput) {
      onValueInput(undefined);
    }
  }, [onValueInput]);

  const handleSizeChange = useCallback(
    (data: SizeConstraints | undefined) => {
      onValueInput({ ...value, size: data });
    },
    [onValueInput, value],
  );

  const handleStylesChange = useCallback(
    (data: StyleConstraints | undefined) => {
      onValueInput({ ...value, styles: data });
    },
    [onValueInput, value],
  );

  return (
    <GenericField
      name="By Selected Node"
      resetValue={resetValue}
      open={!!value}
      disabled={disabled}
      opened={opened}
    >
      <VerticalSpace space="small" />
      <Container space="small">
        <SizeConstraint onValueInput={handleSizeChange} value={value?.size} />
      </Container>
      <VerticalSpace space="small" />
      <Container space="small">
        <StylesConstraint
          onValueInput={handleStylesChange}
          value={value?.styles}
        />
      </Container>
    </GenericField>
  );
}

export default SelectedNodeField;
