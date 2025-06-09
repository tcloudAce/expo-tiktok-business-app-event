import { registerWebModule, NativeModule } from 'expo';

import { ExpoTiktokEventModuleEvents } from './ExpoTiktokEvent.types';

class ExpoTiktokEventModule extends NativeModule<ExpoTiktokEventModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoTiktokEventModule, 'ExpoTiktokEventModule');
