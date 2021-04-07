import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  recipeImageBasePath: string = '/recipeImages';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushImageToStorage(recipePath: string, fileUpload: FileUpload, recipeId: number): Observable<number | undefined> {
    const filePath = `${this.recipeImageBasePath}/${recipeId}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.saveFileData(recipePath, downloadURL);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(recipePath: string, url: string): void {
    this.db.list(recipePath).set('url', url);
  }

  // getFiles(numberItems): AngularFireList<FileUpload> {
  //   return this.db.list(this.recipeImageBasePath, ref =>
  //     ref.limitToLast(numberItems));
  // }

  // deleteFile(fileUpload: FileUpload): void {
  //   this.deleteFileDatabase(fileUpload.key)
  //     .then(() => {
  //       this.deleteFileStorage(fileUpload.id);
  //     })
  //     .catch(error => console.log(error));
  // }

  // private deleteFileDatabase(key: string): Promise<void> {
  //   return this.db.list(this.recipeImageBasePath).remove(key);
  // }

  // private deleteFileStorage(id: number): void {
  //   const storageRef = this.storage.ref(this.recipeImageBasePath);
  //   storageRef.child(id.toString()).delete();
  // }
}
