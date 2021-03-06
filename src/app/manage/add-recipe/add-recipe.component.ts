import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FileUpload } from 'src/app/data.model';
import { FileUploadService } from 'src/app/file-upload.service';
import { Ingredients, Recipe, Steps } from 'src/app/recipes/recipe.model';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { ValidationService } from 'src/app/validation.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.less']
})
export class AddRecipeComponent implements OnInit, OnDestroy {
  ingredientsAdditionalOptions: any;
  private currentFileUpload: FileUpload | undefined;
  private newRecipeId!: number;
  percentage!: number;
  recipeForm!: FormGroup;
  recipeToEdit: Recipe;
  recipesSubscription: Subscription;
  pageType: string = 'add';
  private selectedFiles: FileList | undefined;
  steps!: FormArray;
  submitted: boolean = false;
  tempImgUrl: string | ArrayBuffer | null = '';

  get category() {
    return this.recipeForm.get('category') as FormArray;
  }

  get categoryControls(): AbstractControl[] {
    return (this.recipeForm.get('category') as FormArray).controls;
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
    private validationService: ValidationService,
    private recipesService: RecipesService,
    private router: Router) {
      this.recipeToEdit = this.router.getCurrentNavigation()?.extras.state?.recipe;
      // this.pageType = this.recipeToEdit ? 'edit' : 'add'; // if a recipe to edit is not found, the page should be add new recipe;
      console.log(this.recipeToEdit);
      this.ingredientsAdditionalOptions = this.recipesService.ingredientsAdditionalOptions;
      this.recipesSubscription = this.recipesService.recipesObservable.subscribe((res: Recipe[]) => {
          this.newRecipeId = res[res.length - 1].id + 1;
        },
        (error: any) => {
          // TODO: error handling
        }
      );
    }

  ngOnInit(): void {
    this.recipeForm = this.buildRecipeForm();
    console.log(this.recipeForm)
    if (this.recipeToEdit) {
      this.recipeForm.patchValue(this.recipeToEdit);
      this.stepsControls.length = 0;
      this.recipeToEdit.steps.forEach((step: Steps) => {
        this.stepsControls.push(this.createStepsForm(step.description));
      });
      this.ingredientsControls.length = 0;
      this.recipeToEdit.ingredients.forEach((ingredients: Ingredients) => {
        this.ingredientsControls.push(this.createIngredientsForm(ingredients.name, ingredients.amount, ingredients.additional))
      });
    }
    // TODO: set value if there is data
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

  buildRecipeForm() {
    return this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: '',
      ingredients: this.formBuilder.array(
        [this.createIngredientsForm('', '', 0)],
        this.validationService.emptyIngredientsNotAllowed()
      ),
      steps: this.formBuilder.array([this.createStepsForm('')]),
      category: this.formBuilder.array([
        this.createCategoryForm(1, 'Meat'),
        this.createCategoryForm(2, 'Seafood'),
        this.createCategoryForm(3, 'Vegetarian'),
        this.createCategoryForm(4, 'Vegan'),
        this.createCategoryForm(5, 'Sweets'),
      ], this.validationService.minSelectionCategory(1)),
      timeEstimation: new FormControl(null, [
        Validators.required
      ]),
      comments: ''
    });
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

  createCategoryForm(id: number, name: string): FormGroup {
    return this.formBuilder.group({
      id: id,
      name: name,
      value: false
    })
  }

  createIngredientsForm(name: string, amount: string, additional: number): FormGroup {
    return this.formBuilder.group({
      name: name,
      amount: amount,
      additional: additional
    },
    { validators: this.validationService.amountRequired() });
  }

  createStepsForm(description: string): FormGroup {
    return this.formBuilder.group({
      description: description
    });
  }

  deleteIngredientsRow(index: number): void {
    if (this.ingredientsControls.length == 1) {
      this.ingredientsControls.splice(0, 1, this.createIngredientsForm('', '', 0));
      return;
    }
    this.ingredientsControls.splice(index, 1);
  }

  deleteStepsRow(index: number): void {
    if (this.stepsControls.length == 1) {
      this.stepsControls.splice(0, 1, this.createStepsForm(''));
      return;
    }
    this.stepsControls.splice(index, 1);
  }

  getCategoryTooltipCondition() {
    return (this.submitted && this.category.invalid)
      || (this.category.touched && this.category.invalid);
  }

  getTitleTooltipCondition() {
    return (this.submitted && this.titleControl.invalid)
      || (this.titleControl.touched && this.titleControl.invalid);
  }

  onAddClick(): void {
    if (!this.recipeForm.valid)
      return;
    console.log(this.recipeForm.value);
    this.submitted = true;
    // TODO: need to remove unnecessary row from ingrediends and steps.
    const data = this.recipeForm.value;
    data.added = new Date().getTime(); // TODO: need to check
    const newRecipeId = this.newRecipeId;
    if (newRecipeId == 0) {
      alert('Wrong new Id!');
      return;
    }
    data.id = newRecipeId;
    this.newRecipeId = 0;

    this.recipesService.addRecipe(data).then((res: any) => {
      const recipePath = res.path.pieces_.join('/');
      this.recipeForm.reset();
      this.recipeForm = this.buildRecipeForm();
      this.submitted = false;
      // TODO: add uploading process
      // TODO: remove image after uploaded.
      if (this.currentFileUpload) {
        this.fileUploadService.pushImageToStorage(recipePath, this.currentFileUpload, newRecipeId).subscribe(
          percentage => {
            console.log(percentage);
            if (percentage)
              this.percentage = Math.round(percentage);
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  onAddIngredientsClick(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(this.createIngredientsForm('', '', 0));
  }

  onAddStepsClick(): void {
    (this.recipeForm.get('steps') as FormArray).push(this.createStepsForm(''));
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
    if (!this.selectedFiles || this.selectedFiles.length !== 1)
      return;
    const file = this.selectedFiles[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles[0]);
    reader.onload = (_event) => {
        this.tempImgUrl = reader.result;
    }

    this.currentFileUpload = new FileUpload(file);
  }

  onRemoveImgClick() {
    this.removeImage();
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

  private removeImage(): void {
    this.selectedFiles = undefined;
    this.tempImgUrl = '';
    this.currentFileUpload = undefined;
  }

}
