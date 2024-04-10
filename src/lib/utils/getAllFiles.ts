import { readdirSync, statSync } from 'fs';
import path from 'path';

export const getAllFiles = (dir: string, fileList: string[] = []) => {
  const fsNode = readdirSync(dir);

  for (const node of fsNode) {
    const nodePath: string = path.join(dir, node);
    const stat = statSync(nodePath);

    stat.isDirectory() ? getAllFiles(nodePath, fileList) : fileList.push(nodePath);
  }

  return fileList;
};
