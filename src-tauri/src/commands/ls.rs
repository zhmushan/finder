use serde::{Deserialize, Serialize};
use serde_repr::{Deserialize_repr, Serialize_repr};
use std::{fs, path};

#[derive(Serialize_repr, Deserialize_repr)]
#[repr(u8)]
enum EntryType {
    File,
    Dir,
    Symlink,
}

#[derive(Serialize, Deserialize)]
pub struct Entry {
    name: String,

    #[serde(rename = "type")]
    entry_type: EntryType,

    empty: bool,
}

#[tauri::command]
pub fn ls(path: &str, show_hidden: bool) -> Vec<Entry> {
    let path = path::Path::new(path);

    if fs::metadata(path).unwrap().is_dir() {
        fs::read_dir(path)
            .unwrap()
            .filter_map(|e| e.ok())
            .filter_map(|e| {
                let file_name = e.file_name().into_string().unwrap();

                if is_hidden(file_name.as_str()) && !show_hidden {
                    None
                } else if let Ok(meta) = e.metadata() {
                    let is_dir = meta.is_dir();
                    let is_empty = if is_dir {
                        if let Ok(dir) = fs::read_dir(e.path()) {
                            dir.count() == 0
                        } else {
                            false
                        }
                    } else {
                        true
                    };
                    Some(Entry {
                        name: file_name,
                        entry_type: if meta.is_symlink() {
                            EntryType::Symlink
                        } else if meta.is_dir() {
                            EntryType::Dir
                        } else {
                            EntryType::File
                        },
                        empty: is_empty,
                    })
                } else {
                    None
                }
            })
            .collect::<Vec<_>>()
    } else {
        vec![]
    }
}

fn is_hidden(file_name: &str) -> bool {
    file_name.starts_with('.')
}
