import * as React from 'react';

import { ExpoTiktokEventViewProps } from './ExpoTiktokEvent.types';

export default function ExpoTiktokEventView(props: ExpoTiktokEventViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
