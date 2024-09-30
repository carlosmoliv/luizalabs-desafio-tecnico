import * as fs from 'fs';
import { FileReader } from '../ports/file-reader';

export class FileReaderImpl implements FileReader {
  read(filePath: string): string[] {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.trim() === '') {
      return [];
    }
    return content.trim().split('\n');
  }
}
