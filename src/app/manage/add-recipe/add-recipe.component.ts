import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FileUpload } from 'src/app/data.model';
import { FileUploadService } from 'src/app/file-upload.service';
import { ValidationService } from 'src/app/validation.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.less']
})
export class AddRecipeComponent implements OnInit {
  currentFileUpload!: FileUpload;
  imgTempUrl: string | ArrayBuffer | null = '';
  percentage!: number;
  selectedFiles!: FileList;
  steps!: FormArray;
  submitted: boolean = false;
  recipeForm!: FormGroup;

  get categories() {
    return this.recipeForm.get('categories') as FormGroup;
  }

  get categoriesControls(): {[key: string]: AbstractControl} {
    return (this.recipeForm.get('categories') as FormGroup).controls;
  }

  get ingredientsControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get stepsControls(): AbstractControl[] {
    return (this.recipeForm.get('steps') as FormArray).controls;
  }

  get titleControl(): FormControl {
    return this.recipeForm.get('title') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService,
    private validationService: ValidationService) { }

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      ingredients: this.formBuilder.array(
        [this.createIngredientsForm()],
        this.validationService.minLengthArray(1)),
      steps: this.formBuilder.array([this.createStepsForm()]),
      comments: '',
      categories: this.formBuilder.group({
        meat: false,
        seafood: false,
        vegetarian: false,
        vegan: false,
        sweets: false
      },
      { validators: [this.validationService.minSelectionObject(1)] })
    });
    console.log(this.recipeForm)

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
    if (this.ingredientsControls.length == 1) {
      this.ingredientsControls.splice(0, 1, this.createIngredientsForm());
      return;
    }
    console.log(this.ingredientsControls)
    this.ingredientsControls.splice(index, 1);
  }

  deleteStepsRow(index: number): void {
    if (this.stepsControls.length == 1) {
      this.stepsControls.splice(0, 1, this.createStepsForm());
      return;
    }
    this.stepsControls.splice(index, 1);
  }

  getCategoriesTooltipCondition() {
    return (this.submitted && this.categories.invalid)
      || (this.categories.touched && this.categories.invalid);
  }

  getTitleTooltipCondition() {
    return (this.submitted && this.titleControl.invalid)
      || (this.titleControl.touched && this.titleControl.invalid);
  }

  onAddClick(): void {
    console.log(this.recipeForm);
    this.submitted = true;
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
