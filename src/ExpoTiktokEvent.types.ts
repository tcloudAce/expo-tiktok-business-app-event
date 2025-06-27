export type TikTokInitStatus = "success" | "fail";

export interface TikTokInitStatusConstant {
  SUCCESS: TikTokInitStatus;
  FAIL: TikTokInitStatus;
}

export interface TikTokInitError {
  code: string;
  message?: string | null;
}

export interface InitTikTokSdkResult {
  status: TikTokInitStatus;
  error: TikTokInitError | null;
}

export interface ExpoTiktokEventModuleFunctions {
  initTikTokSdk(appId: string, ttAppId: string): Promise<InitTikTokSdkResult>;
  startTrack(): void;
  identifyUser(
    externalId?: string | null,
    externalUserName?: string | null,
    phoneNumber?: string | null,
    email?: string | null
  ): void;
  logout(): void;
}
