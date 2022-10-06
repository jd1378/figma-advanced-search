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
};

function SelectedNodeField({ onValueInput, value }: FieldProps) {
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

  const handleOpened = useCallback(() => {
    onValueInput({
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
  }, []);

  return (
    <GenericField
      name="By Selected Node"
      resetValue={resetValue}
      open={!!value}
      opened={handleOpened}
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
