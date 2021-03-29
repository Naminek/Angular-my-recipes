import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.less']
})
export class AddRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  ingredients!: FormArray;
  steps!: FormArray;

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get stepsControls() {
    return (this.recipeForm.get('steps') as FormArray).controls;
  }

  constructor(private formBuilder: FormBuilder) { }

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

  changeStepsTableRowColor(index: number) {
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

  deleteIngredientsRow(index: number) {
    console.log(this.ingredientsControls)
    this.ingredientsControls.splice(index, 1);
  }

  deleteStepsRow(index: number) {
    this.stepsControls.splice(index, 1);
  }

  onAddIngredientsClick() {
    this.ingredientsControls.push(this.createIngredientsForm());
  }

  onAddStepsClick() {
    this.stepsControls.push(this.createStepsForm());
  }

  onDownStep(index: number) {
    if (index == this.stepsControls.length - 1)
      return;
    const item = this.stepsControls[index];
    this.stepsControls.splice(index, 1);
    this.stepsControls.splice(index + 1, 0, item);
    this.changeStepsTableRowColor(index);
  }

  onUpStep(index: number) {
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
