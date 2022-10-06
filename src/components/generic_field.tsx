import { h, Fragment, JSX, toChildArray, ComponentChildren } from 'preact';
import { Muted, Text, Checkbox } from '@create-figma-plugin/ui';
import { useCallback, useEffect, useState } from 'preact/hooks';

function GenericField({
  children,
  resetValue,
  name,
  open,
  opened,
  disabled = false,
}: {
  children?: ComponentChildren;
  resetValue: () => void;
  opened?: () => void;
  name: string;
  open?: boolean;
  disabled?: boolean;
}) {
  const [isChecked, setIsChecked] = useState(open || false);

  useEffect(() => {
    setIsChecked(open || false);
  }, [open]);

  useEffect(() => {
    if (isChecked) {
      if (opened) {
        opened();
      }
    } else if (resetValue) {
      resetValue();
    }
  }, [isChecked]);

  const handleIsEnabledChange = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      setIsChecked(event.currentTarget.checked);
    },
    [setIsChecked],
  );

  return (
    <Fragment>
      <Checkbox
        onChange={handleIsEnabledChange}
        value={isChecked}
        disabled={disabled}
      >
        <Text>
          <Muted>{name}</Muted>
        </Text>
      </Checkbox>

      {!disabled && isChecked && children ? toChildArray(children) : undefined}
    </Fragment>
  );
}

GenericField.defaultProps = {
  disabled: false,
  open: undefined,
  opened: undefined,
  children: undefined,
};

export default GenericField;
