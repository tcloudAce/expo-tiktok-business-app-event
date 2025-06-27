import { NativeModule, requireNativeModule } from "expo";

import {
  ExpoTiktokEventModuleFunctions,
  InitTikTokSdkResult,
  TikTokInitStatusConstant,
} from "./ExpoTiktokEvent.types";

declare class ExpoTiktokEventModule
  extends NativeModule
  implements ExpoTiktokEventModuleFunctions
{
  readonly TIKTOK_INIT_STATUS: TikTokInitStatusConstant;

  initTikTokSdk(appId: string, ttAppId: string): Promise<InitTikTokSdkResult>;

  startTrack(): void;

  identifyUser(
    externalId: string | null,
    externalUserName: string | null,
    phoneNumber: string | null,
    email: string | null
  ): void;

  logout(): void;

  trackLoginEvent(): void;

  trackRegisterEvent(): void;
}

export default requireNativeModule<ExpoTiktokEventModule>("ExpoTiktokEvent");
