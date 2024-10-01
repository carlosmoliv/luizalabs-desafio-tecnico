import * as fs from 'fs';
import * as path from 'path';

import { FileReaderImpl } from './file-reader';

const sampleFilePath = path.join(__dirname, '../../test/data', 'test_file.txt');
const sampleData = `
Line 1: First line
Line 2: Second line
Line 3: Third line
`;

describe('FileReaderImpl', () => {
  let sut: FileReaderImpl;

  beforeEach(() => {
    sut = new FileReaderImpl();
  });

  beforeAll(() => {
    fs.mkdirSync(path.join(__dirname, '../../test/data'), { recursive: true });
    fs.writeFileSync(sampleFilePath, sampleData.trim());
  });

  afterAll(() => {
    fs.unlinkSync(sampleFilePath);
  });

  test('read a file and return its contents as an array of strings', () => {
    const lines = sut.read(sampleFilePath);

    expect(lines.length).toBe(3);
    expect(lines[0]).toBe('Line 1: First line');
    expect(lines[1]).toBe('Line 2: Second line');
    expect(lines[2]).toBe('Line 3: Third line');
  });

  it('returns an empty array if the file is empty', () => {
    const emptyFilePath = path.join(
      __dirname,
      '../../test/data',
      'empty_file.txt',
    );
    fs.writeFileSync(emptyFilePath, '');

    const fileReader = new FileReaderImpl();
    const lines = fileReader.read(emptyFilePath);

    expect(lines.length).toBe(0);
    fs.unlinkSync(emptyFilePath);
  });

  it('throws an error if the file does not exist', () => {
    expect(() => sut.read('non_existent_file.txt')).toThrow();
  });
});
