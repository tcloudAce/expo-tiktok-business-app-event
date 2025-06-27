import ExpoModulesCore
import UIKit
import TikTokBusinessSDK
import AppTrackingTransparency
import AdSupport

public class ExpoTiktokEventModule: Module {
  private var isInitialized: Bool = false

  public func definition() -> ModuleDefinition {
    Name("ExpoTiktokEvent")

    Constants([
      "TIKTOK_INIT_STATUS": [
        "SUCCESS": "success",
        "FAIL": "fail"
      ]
    ])

    AsyncFunction("initTikTokSdk") { (appId: String, ttAppId: String) async -> [String: Any] in
      if #available(iOS 14, *) {
          let status = await ATTrackingManager.requestTrackingAuthorization()
          if status != .authorized {
            return [
              "status": "fail",
              "error": [
                "code": "ATT_NOT_AUTHORIZED",
                "message": "User did not authorize ATT"
              ]
            ]
          }
      }

      guard let config = TikTokConfig(appId: appId, tiktokAppId: ttAppId) else {
        return [
          "status": "fail",
          "error": [
            "code": "CONFIG_INIT_ERROR",
            "message": "Failed to create TikTokConfig"
          ]
        ]
      }
      
      return await withCheckedContinuation { continuation in
        TikTokBusiness.initializeSdk(config) { success, error in
          if success {
            self.isInitialized = true
            continuation.resume(returning: [
              "status": "success",
              "error": NSNull()
            ])
          } else {
            continuation.resume(returning: [
              "status": "fail",
              "error": [
                "code": "\(error?._code ?? -1)",
                "message": error?.localizedDescription ?? ""
              ]
            ])
          }
        }
      }
    }
    
    Function("identifyUser") { (externalId: String?, externalUserName: String?, phoneNumber: String?, email: String?) in
      guard self.isInitialized else { return }
      TikTokBusiness.identify(withExternalID: externalId, externalUserName: externalUserName, phoneNumber: phoneNumber, email: email)
    }

    Function("logout") {
      guard self.isInitialized else { return }
      TikTokBusiness.logout()
    }

    Function("trackLoginEvent") {
      guard self.isInitialized else { return }
      let event = TikTokBaseEvent(name:TTEventName.login.rawValue)
      TikTokBusiness.trackTTEvent(event)
    }

    Function("trackRegisterEvent") {
      guard self.isInitialized else { return }
      let event = TikTokBaseEvent(name: TTEventName.registration.rawValue)
      TikTokBusiness.trackTTEvent(event)
    }

    Function("startTrack") {
        guard self.isInitialized else { return }
        TikTokBusiness.setTrackingEnabled(true)
    }
  }
}
