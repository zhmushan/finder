use tauri::Manager;

#[tauri::command]
pub async fn show_main_window(window: tauri::Window) {
    window.get_window("main").unwrap().show().unwrap();
}
