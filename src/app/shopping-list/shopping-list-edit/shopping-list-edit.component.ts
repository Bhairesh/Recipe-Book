import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) editForm: NgForm;
  subsciptions: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subsciptions = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
          this.editForm.setValue({
            'name': this.editedItem.name,
            'amount': this.editedItem.amount,
          });
        }
      );
  }

  ngOnDestroy() {
    this.subsciptions.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const formValue = form.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.editMode = false;
    this.editForm.reset();
  }

  clearInputs() {
    this.editMode = false;
    this.editForm.reset();
  }

  onDeleteItem() {
    this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.clearInputs();
  }

}
