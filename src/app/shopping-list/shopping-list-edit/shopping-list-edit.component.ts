import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('nameInput', { 'static': false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { 'static': false }) amountInputRef: ElementRef;

  @Output() newIngredientAdded = new EventEmitter<Ingredient>();
  @Output() removeIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  addItem() {
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    this.newIngredientAdded.emit(newIngredient);
  }

  clearInputs() {
    this.nameInputRef.nativeElement.value = this.amountInputRef.nativeElement.value = '';
  }

  onRemoveIngredient() {
    // this.removeIngredient.emit();
  }



}
