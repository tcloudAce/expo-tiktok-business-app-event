import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoTiktokEventViewProps } from './ExpoTiktokEvent.types';

const NativeView: React.ComponentType<ExpoTiktokEventViewProps> =
  requireNativeView('ExpoTiktokEvent');

export default function ExpoTiktokEventView(props: ExpoTiktokEventViewProps) {
  return <NativeView {...props} />;
}
