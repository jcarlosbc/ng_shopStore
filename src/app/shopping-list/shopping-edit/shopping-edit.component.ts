import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	//@ViewChild('nameInput') nameInputRef: ElementRef;
	//@ViewChild('amountInput') amauntInputRef: ElementRef;
  @ViewChild('editForm') editForm: NgForm;
  subscription: Subscription;
	editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  	constructor(private slService: ShoppingListService) { }

  	ngOnInit() {
  		this.subscription = this.slService.editingSubject.
      subscribe((index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index)
        this.editForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  	}

  	onSubmit(form: NgForm){
      //const ingName = this.nameInputRef.nativeElement.value;
      //const ingAmaunt = this.amauntInputRef.nativeElement.value;

      const formValue = form.value;
      const newIngredient = new Ingredient(formValue.name,formValue.amount);

      if(this.editMode){
        this.slService.updateIngredient(this.editItemIndex, newIngredient);
      }else{
        this.slService.addIngredient(newIngredient);
      }
      this.editMode = false;
      form.reset();
  	}

    onClear(){
      this.editMode = false;
      this.editForm.reset();
    }

    onDelete(){
      console.log(">>>index "+this.editItemIndex);
      this.slService.deleteIngredient(this.editItemIndex);
      this.onClear();
    }


    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}
