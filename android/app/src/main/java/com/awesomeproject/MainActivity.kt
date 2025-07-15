package com.awesomeproject

import android.content.SharedPreferences
import android.widget.Toast

import android.os.Bundle;
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

   override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)

    
    val sharedPreferences = getSharedPreferences(packageName + "_preferences", MODE_PRIVATE)
    val editor = sharedPreferences.edit()

    val currentGoal = sharedPreferences.getInt("job_goal", -1)
    val currentJobsCompleted = sharedPreferences.getInt("jobs_completed", -1)

    // Set only if not already set
    if (currentGoal == -1) {
        editor.putInt("job_goal", 7) // Set default
    }

    if (currentJobsCompleted == -1) {
        editor.putInt("jobs_completed", 0)
    }

    editor.apply()

    // ✅ OPTIONAL: Update the widget immediately
    XpStreakWidget.updateWidget(applicationContext)

    Toast.makeText(this, "Goal and progress initialized (only once)", Toast.LENGTH_SHORT).show()

  }




  override fun getMainComponentName(): String = "AwesomeProject"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
