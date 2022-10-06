import { h, Fragment, JSX, toChildArray, ComponentChildren } from 'preact';
import { Muted, Text, Checkbox } from '@create-figma-plugin/ui';
import { useCallback, useEffect, useState } from 'preact/hooks';

export default function GenericField({
  children,
  resetValue,
  name,
  open,
  opened,
}: {
  // eslint-disable-next-line react/require-default-props
  children?: ComponentChildren;
  resetValue: () => void;
  // eslint-disable-next-line react/require-default-props
  opened?: () => void;
  name: string;
  // eslint-disable-next-line react/require-default-props
  open?: boolean;
}) {
  const [isEnabled, setIsEnabled] = useState(open || false);

  useEffect(() => {
    setIsEnabled(open || false);
  }, [open]);

  useEffect(() => {
    if (isEnabled) {
      if (opened) {
        opened();
      }
    } else if (resetValue) {
      resetValue();
    }
  }, [isEnabled]);

  const handleIsEnabledChange = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      setIsEnabled(event.currentTarget.checked);
    },
    [setIsEnabled],
  );

  return (
    <Fragment>
      <Checkbox onChange={handleIsEnabledChange} value={isEnabled}>
        <Text>
          <Muted>{name}</Muted>
        </Text>
      </Checkbox>

      {isEnabled && children ? toChildArray(children) : undefined}
    </Fragment>
  );
}
