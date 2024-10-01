export class InvalidPathException extends Error {
  constructor(message = 'Input is neither a file nor a directory.') {
    super(message);
    this.name = 'InvalidPathException';
  }
}
