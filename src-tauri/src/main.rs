// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod window_ext;

use commands::{
    get_home_dir::get_home_dir, ls::ls, open_file_paths::open_file_paths,
    show_main_window::show_main_window,
};
use tauri::{Manager, Window, WindowEvent};
use window_ext::WindowExt;

fn apply_offset(win: &Window) {
    win.position_traffic_lights(16., 22.);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            show_main_window,
            get_home_dir,
            ls,
            open_file_paths
        ])
        .setup(|app| {
            let win = app.get_window("main").unwrap();
            apply_offset(&win);
            Ok(())
        })
        .on_window_event(|e| {
            let win = e.window();

            match e.event() {
                WindowEvent::Resized(..) => apply_offset(win),
                WindowEvent::ThemeChanged(..) => apply_offset(win),
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
