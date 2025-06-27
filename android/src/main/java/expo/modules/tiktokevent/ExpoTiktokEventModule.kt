package expo.modules.tiktokevent

import android.os.Handler
import android.os.Looper
import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import com.tiktok.TikTokBusinessSdk;
import com.tiktok.TikTokBusinessSdk.TTConfig;
import com.tiktok.appevents.base.EventName
import com.tiktok.appevents.base.TTBaseEvent

class ExpoTiktokEventModule : Module() {

  private enum class TikTokInitStatus(val value: String) {
    SUCCESS("success"),
    FAIL("fail")
  }

  override fun definition() = ModuleDefinition {

    Name("ExpoTiktokEvent")

    Constants(
      "TIKTOK_INIT_STATUS" to mapOf(
        "SUCCESS" to TikTokInitStatus.SUCCESS.value,
        "FAIL" to TikTokInitStatus.FAIL.value
      )
    )

    AsyncFunction("initTikTokSdk") { appId: String, ttAppId: String, promise: Promise ->
      Handler(Looper.getMainLooper()).post {
        val context = appContext.reactContext?.applicationContext

        if (context == null) {
          promise.resolve(mapOf(
            "status" to TikTokInitStatus.FAIL.value,
            "error" to mapOf(
              "code" to "NO_CONTEXT",
              "message" to "Application context is null"
            )
          ))
          return@post
        }

        val ttConfig = TTConfig(context)
          .setAppId(appId)
          .setTTAppId(ttAppId)
          .setLogLevel(TikTokBusinessSdk.LogLevel.INFO)

        TikTokBusinessSdk.initializeSdk(ttConfig, object : TikTokBusinessSdk.TTInitCallback {
          override fun success() {
            promise.resolve(mapOf(
              "status" to TikTokInitStatus.SUCCESS.value,
              "error" to null
            ))
          }

          override fun fail(code: Int, msg: String?) {
            promise.resolve(mapOf(
              "status" to TikTokInitStatus.FAIL.value,
              "error" to mapOf(
                "code" to code.toString(),
                "message" to msg
              )
            ))
          }
        })
      }
    }

    Function("startTrack") {
      Handler(Looper.getMainLooper()).post {
        TikTokBusinessSdk.startTrack()
      }
    }

    Function("identifyUser") { externalId: String?, externalUserName: String?, phoneNumber: String?, email: String? ->
      Handler(Looper.getMainLooper()).post {
        try {
          TikTokBusinessSdk.identify(
            externalId,
            externalUserName,
            phoneNumber,
            email
          )
        } catch (e: Exception) {
          Log.e("ExpoTiktokEvent", "identify crash: ${e.message}")
        }
      }
    }

    Function("logout") {
      Handler(Looper.getMainLooper()).post {
        TikTokBusinessSdk.logout()
      }
    }

    Function("trackLoginEvent") {
      Handler(Looper.getMainLooper()).post {
        val event = TTBaseEvent.newBuilder(EventName.LOGIN.toString()).build()
        TikTokBusinessSdk.trackTTEvent(event)
      }
    }

    Function("trackRegisterEvent") {
      Handler(Looper.getMainLooper()).post {
        val event = TTBaseEvent.newBuilder(EventName.REGISTRATION.toString()).build()
        TikTokBusinessSdk.trackTTEvent(event)
      }
    }
  }
}