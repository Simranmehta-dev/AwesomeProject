package com.awesomeproject  // replace with your actual package name

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class WidgetUpdateModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "WidgetUpdateModule"
    }

    @ReactMethod
    fun updateWidget() {
        val prefs = reactApplicationContext.getSharedPreferences(reactApplicationContext.packageName + "_preferences", Context.MODE_PRIVATE)
        // Call the method to trigger the widget update
        XpStreakWidget.updateWidget(reactApplicationContext)
    }

   @ReactMethod
fun setStatsAndUpdateWidget(xp: Int, streak: Int) {
    Log.d("WIDGET", "Updating stats - XP: $xp, Streak: $streak")
    
    val prefs = reactApplicationContext.getSharedPreferences(
        reactApplicationContext.packageName + "_preferences", 
        Context.MODE_PRIVATE
    )
    
    // Commit changes immediately (not apply())
    prefs.edit()
        .putString("xp", xp.toString())
        .putString("streak", streak.toString())
        .commit() // Using commit() instead of apply() for immediate write
    
    Log.d("WIDGET", "Values saved - XP: $xp, Streak: $streak")
    
    // Force immediate widget update with broadcast
    val intent = Intent(reactApplicationContext, XpStreakWidget::class.java).apply {
        action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
        putExtra(
            AppWidgetManager.EXTRA_APPWIDGET_IDS,
            AppWidgetManager.getInstance(reactApplicationContext)
                .getAppWidgetIds(ComponentName(reactApplicationContext, XpStreakWidget::class.java))
        )
    }
    reactApplicationContext.sendBroadcast(intent)
    
    // Also call the companion method as backup
    XpStreakWidget.updateWidget(reactApplicationContext)
}

@ReactMethod
    fun setJobStats(jobGoal: Int, jobsCompleted: Int) {
         Log.d("WIDGET", "Setting job stats: job_goal=$jobGoal, jobs_completed=$jobsCompleted")  // Log the job stats passed
        val prefs = reactApplicationContext.getSharedPreferences(
            reactApplicationContext.packageName + "_preferences", Context.MODE_PRIVATE
        )
        prefs.edit()
            .putInt("job_goal", jobGoal)
            .putInt("jobs_completed", jobsCompleted)
            .apply()

        Log.d("WIDGET", "Saved to SharedPreferences: job_goal=$jobGoal, jobs_completed=$jobsCompleted")
         Log.d("WIDGET", "Saved to SharedPreferences: job_goal=$jobGoal, jobs_completed=$jobsCompleted")  // Log after saving

    // Trigger the widget update

        XpStreakWidget.updateWidget(reactApplicationContext)
    }
}
