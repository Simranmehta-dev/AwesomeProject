package com.awesomeproject  // replace with your actual package name

import android.app.PendingIntent
import android.util.Log
import android.content.ComponentName
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.widget.RemoteViews
import android.content.Intent
import com.awesomeproject.R 

class XpStreakWidget : AppWidgetProvider() {
    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        val prefs = context.getSharedPreferences(context.packageName + "_preferences", Context.MODE_PRIVATE)


        val xp = prefs.getString("xp", "0")?.toIntOrNull() ?: 0
        val streak = prefs.getString("streak", "0")?.toIntOrNull() ?: 0
        
        
        // Fetch Job Goal and Jobs Completed
        val jobGoal = prefs.getInt("job_goal", 5) // Default to 5 if not set
        val jobsCompleted = prefs.getInt("jobs_completed", 0) // Default 


        Log.d("XpStreakWidget", "XP: $xp, Streak: $streak")

        android.util.Log.d("WIDGET", "Reading from RNAsyncStorage...")
        android.util.Log.d("WIDGET", "XP: $xp, Streak: $streak")

        for (appWidgetId in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.widget_streak_xp)
            views.setInt(R.id.widget_root, "setBackgroundColor", android.graphics.Color.parseColor("#121212"))

            //views.setTextViewText(R.id.xp_text, "XP: $xp")
            views.setTextViewText(R.id.xp_text, "+ $xp XP") // ✅ Cleaner XP format

            //views.setTextViewText(R.id.streak_text, "Streak: $streak")
            views.setTextViewText(R.id.streak_text, "\uD83D\uDD25 $streak days streak") // 🔥 Emoji + dynamic streak



             // Set the text for job progress (dynamic)
            views.setTextViewText(R.id.jobs_progress_text, "$jobsCompleted / $jobGoal")
             

            // Calculate progress percentage for the progress bar (jobsCompleted / jobGoal) * 100
        val progress = if (jobGoal > 0) (jobsCompleted * 100) / jobGoal else 0

        // Set progress bar value
        views.setProgressBar(R.id.progress_bar, 100, progress, false)




            // 👉 Set click intent to open app
            val intent = Intent(context, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            }
            val pendingIntent = PendingIntent.getActivity(
                context,
                0,
                intent,
                PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.widget_root, pendingIntent) 



            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }

    companion object {
        fun updateWidget(context: Context) {
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val thisWidget = ComponentName(context, XpStreakWidget::class.java)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(thisWidget)

           // Loop through all the widget ids and update each widget
        for (appWidgetId in appWidgetIds) {
            val views = RemoteViews(context.packageName, R.layout.widget_streak_xp)
            
            val xp = context.getSharedPreferences(
                context.packageName + "_preferences", 
                Context.MODE_PRIVATE
            ).getString("xp", "0")?.toIntOrNull() ?: 0
            val streak = context.getSharedPreferences(
                context.packageName + "_preferences", 
                Context.MODE_PRIVATE
            ).getString("streak", "0")?.toIntOrNull() ?: 0



             // Fetch job goal and jobs completed dynamically
            val jobGoal = context.getSharedPreferences(
                context.packageName + "_preferences", 
                Context.MODE_PRIVATE
            ).getInt("job_goal", 5) // Default to 5 if not set
            val jobsCompleted = context.getSharedPreferences(
                context.packageName + "_preferences", 
                Context.MODE_PRIVATE
            ).getInt("jobs_completed", 0) // Default to 0 if not set




            // Set the XP and Streak text for the widget
            //views.setTextViewText(R.id.xp_text, "XP: $xp")
            views.setTextViewText(R.id.xp_text, "+ $xp XP") // ✅ Cleaner XP format

            //views.setTextViewText(R.id.streak_text, "Streak: $streak")
            views.setTextViewText(R.id.streak_text, "\uD83D\uDD25 $streak days streak") // 🔥 Emoji + dynamic streak

            

            views.setTextViewText(R.id.jobs_progress_text, "$jobsCompleted / $jobGoal")



             // 👉 Set click intent to open app (again here, for dynamic updates)
                val intent = Intent(context, MainActivity::class.java).apply {
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                }
                val pendingIntent = PendingIntent.getActivity(
                    context,
                    0,
                    intent,
                    PendingIntent.FLAG_IMMUTABLE
                )
                views.setOnClickPendingIntent(R.id.widget_root, pendingIntent)

             
             val progress = if (jobGoal > 0) (jobsCompleted * 100) / jobGoal else 0
             views.setProgressBar(R.id.progress_bar, 100, progress, false)


            // Update the widget
            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
        }
    }




