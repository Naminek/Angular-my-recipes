import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from 'src/app/data.model';
import { FileUploadService } from 'src/app/file-upload.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.less']
})
export class AddRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  ingredients!: FormArray;
  steps!: FormArray;
  selectedFiles!: FileList;
  currentFileUpload!: FileUpload;
  percentage!: number;
  imgTempUrl: string | ArrayBuffer | null = '';

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get stepsControls() {
    return (this.recipeForm.get('steps') as FormArray).controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      title: '',
      ingredients: this.formBuilder.array([this.createIngredientsForm()]),
      steps: this.formBuilder.array([this.createStepsForm()]),
      comments: '',
      tags: ''
    });

    this.ingredientsControls.forEach(control => {
      control.valueChanges.subscribe(x => {
        console.log(x);
      })
    })
    this.recipeForm.valueChanges.subscribe(form => {
      console.log(form);
    })

    // this.recipeForm.controls['item'].valueChanges.subscribe(control => {
    //   console.log(control);
    // })
  }

  changeIngredientsTableRowColor(index: number): void {
    const row = document.getElementById('ingredients' + index);
    if (row) {
      row.classList.add('highlight');
      setTimeout(function() {
        row.classList.remove('highlight');
      }, 600)
    }
  }

  changeStepsTableRowColor(index: number): void {
    const row = document.getElementById('step' + index);
    if (row) {
      row.classList.add('highlight');
      setTimeout(function() {
        row.classList.remove('highlight');
      }, 600)
    }
  }

  createIngredientsForm(): FormGroup {
    return this.formBuilder.group({
      name: '',
      amount: ''
    });
  }

  createStepsForm(): FormGroup {
    return this.formBuilder.group({
      step: null,
      description: ''
    });
  }

  deleteIngredientsRow(index: number): void {
    console.log(this.ingredientsControls)
    this.ingredientsControls.splice(index, 1);
  }

  deleteStepsRow(index: number): void {
    this.stepsControls.splice(index, 1);
  }

  onAddIngredientsClick(): void {
    this.ingredientsControls.push(this.createIngredientsForm());
  }

  onAddRecipe(): void {
    this.fileUploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        console.log(percentage);
        if (percentage)
          this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }

  onAddStepsClick(): void {
    this.stepsControls.push(this.createStepsForm());
  }

  onDownIngredients(index: number): void {
    if (index == 0)
      return;
    const item = this.ingredientsControls[index];
    this.ingredientsControls.splice(index, 1); // remove item from the array.
    this.ingredientsControls.splice(index + 1, 0, item); // add the item to the array.
    this.changeIngredientsTableRowColor(index);
  }

  onDownStep(index: number): void {
    if (index == this.stepsControls.length - 1)
      return;
    const item = this.stepsControls[index];
    this.stepsControls.splice(index, 1);
    this.stepsControls.splice(index + 1, 0, item);
    this.changeStepsTableRowColor(index);
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length !== 1)
      return;
    const file = this.selectedFiles[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles[0]);
    reader.onload = (_event) => {
        this.imgTempUrl = reader.result;
    }

    this.currentFileUpload = new FileUpload(file);
  }

  onUpIngredients(index: number): void {
    if (index == 0)
      return;
    const item = this.ingredientsControls[index];
    this.ingredientsControls.splice(index, 1);
    this.ingredientsControls.splice(index - 1, 0, item);
    this.changeIngredientsTableRowColor(index);
  }

  onUpStep(index: number): void {
    if (index == 0)
      return;
    const item = this.stepsControls[index];
    this.stepsControls.splice(index, 1);
    this.stepsControls.splice(index - 1, 0, item);
    this.changeStepsTableRowColor(index);
  }

  // onBlurIngredientsInput(ingredientsControl: AbstractControl, arrayIndex: number) {
  //   console.log(ingredientsControl);
  //   console.log(arrayIndex);
  //   if (ingredientsControl.status == 'VALID'
  //     && ingredientsControl.value.name != ''
  //     && ingredientsControl.value.amount != '') {
  //       this.ingredientsControls.push(this.createIngredientsForm());
  //     }
  // }

}
