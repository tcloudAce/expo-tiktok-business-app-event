import { NativeModule, requireNativeModule } from 'expo';

import { ExpoTiktokEventModuleEvents } from './ExpoTiktokEvent.types';

declare class ExpoTiktokEventModule extends NativeModule<ExpoTiktokEventModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoTiktokEventModule>('ExpoTiktokEvent');
