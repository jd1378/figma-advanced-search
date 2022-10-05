import { h, Fragment, JSX, toChildArray, ComponentChildren } from 'preact';
import { Muted, Text, Checkbox } from '@create-figma-plugin/ui';
import { useCallback, useEffect, useState } from 'preact/hooks';

export default function GenericField({
  children,
  resetValue,
  name,
}: {
  // eslint-disable-next-line react/require-default-props
  children?: ComponentChildren;
  resetValue: () => void;
  name: string;
}) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (!isEnabled && resetValue) {
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
