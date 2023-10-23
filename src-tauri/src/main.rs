// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;

use commands::{get_home_dir::get_home_dir, ls::ls, show_main_window::show_main_window};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![show_main_window, get_home_dir, ls])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
