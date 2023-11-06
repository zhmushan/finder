use std::path;

#[tauri::command]
pub fn open_file_paths(paths: Vec<&str>) {
    paths.iter().map(|p| path::Path::new(p)).for_each(|p| {
        opener::open(p).unwrap();
    });
}
