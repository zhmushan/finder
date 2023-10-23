use std::{env::var_os, path::PathBuf};

#[tauri::command]
pub fn get_home_dir() -> String {
    let home_env_var = if cfg!(windows) { "USERPROFILE" } else { "HOME" };
    PathBuf::from(var_os(home_env_var).unwrap())
        .to_str()
        .unwrap()
        .to_owned()
}
