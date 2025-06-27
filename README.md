# expo-tiktok-event

✅ No extra setup required — SDK dependencies are bundled inside the module.

TikTok Business SDK integration for Expo and React Native. This module enables tracking events such as user login, registration, and profile updates using TikTok’s native SDKs on both Android and iOS.

## Usage

### Import the module

```ts
import { 
  initTikTokSdk, 
  identifyUser, 
  logout, 
  trackLoginEvent, 
  trackRegisterEvent, 
  TIKTOK_INIT_STATUS 
} from 'expo-tiktok-event';
```

### Initialize SDK

```ts
const result = await initTikTokSdk('yourAppId', 'yourTTAppId');
// result = { status: 'success' | 'fail', error: { code, message } | null }
```

### Start Tracking (Android only — internally handled)

```ts
await init(); // runs initTikTokSdk and automatically calls startTrack on Android
```

### Identify user

```ts
identifyUser({
  externalID: 'user-id',
  externalUserName: 'user-name',
  phoneNumber: '010-1234-5678',
  email: 'user@example.com'
});
```

### Logout

```ts
logout();
```

### Track events

```ts
trackLoginEvent();
trackRegisterEvent();
```

## Features

- Supports TikTok Business SDK initialization
- Event tracking: login, registration, and custom events
- User identity management: identify and logout
- Works with both Android and iOS (auto-handled platform differences)
- Provides consistent return format across platforms

## Installation

## Constants

```ts
TIKTOK_INIT_STATUS = {
  SUCCESS: 'success',
  FAIL: 'fail'
};
```

## API

See the full typings in `src/index.ts`.

## Contributing

Pull requests are welcome! See the [contributing guide](https://github.com/expo/expo#contributing).
