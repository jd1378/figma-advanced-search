import { h } from 'preact';
import { Textbox, TextboxProps, VerticalSpace } from '@create-figma-plugin/ui';
import { useCallback } from 'preact/hooks';
import GenericField from './generic_field';

export type FieldProps<Name extends string> = {
  onValueInput: TextboxProps<Name>['onValueInput'];
  value: TextboxProps<Name>['value'];
  name: string;
};

function TextField<Name extends string>({
  onValueInput,
  value,
  name,
}: FieldProps<Name>) {
  const resetValue = useCallback(() => {
    if (onValueInput) {
      onValueInput('');
    }
  }, [onValueInput]);

  return (
    <GenericField name={name} resetValue={resetValue}>
      <VerticalSpace space="small" />
      <Textbox onValueInput={onValueInput} value={value} variant="border" />
    </GenericField>
  );
}

export default TextField;
