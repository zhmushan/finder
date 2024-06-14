import rawFileIconIndex from "./file-icons-index.csv?raw";

const rowSeparator = "\n";
const colSeparator = ",";
const arraySeparator = ":";

function parseFileIconMapCSV() {
  const filenameIndex = new Map<string, string>();
  const fileExtensionIndex = new Map<string, string>();
  for (const line of rawFileIconIndex.split(rowSeparator)) {
    if (!line) continue;
    const [name, names, exts] = line.split(colSeparator);
    if (names) {
      for (const filename of names.split(arraySeparator)) {
        if (!filename) continue;
        filenameIndex.set(filename, name);
      }
    }
    if (exts) {
      for (const ext of exts.split(arraySeparator)) {
        if (!ext) continue;
        fileExtensionIndex.set(ext, name);
      }
    }
  }
  return {
    filenameIndex,
    fileExtensionIndex,
  };
}

const { filenameIndex, fileExtensionIndex } = parseFileIconMapCSV();

export function getFileIconName(fileName: string) {
  fileName = fileName.toLowerCase();
  let iconName = filenameIndex.get(fileName);
  if (!iconName) {
    const tail = fileName.split(".");
    while (!iconName && tail.length > 0) {
      iconName = fileExtensionIndex.get(tail.join("."));
      tail.shift();
    }
  }

  if (!iconName) {
    return;
  }

  return `file_type_${iconName}.svg`;
}
