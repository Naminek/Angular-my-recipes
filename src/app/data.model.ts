export class FileUpload {
  key!: string;
  id!: number;
  url!: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
