import { Component, EventEmitter, Input, input, numberAttribute, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '../pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../pipes/UpperCasePipe.pipe';
import { NgFor, NgIf } from '@angular/common';
import { ProductItems } from '../types/productItem';

@Component({
  selector: 'app-product-item',
  imports: [RouterOutlet, FormsModule, CurrencyPipe, UpperCasePipe, NgFor, NgIf, RouterLink],
  templateUrl: './productItem.component.html',
  styleUrl: './productItem.component.css'
})
export class ProductItemComponent implements OnChanges, OnDestroy {
  @Input() products: ProductItems[] = [];

  @Output() dataEvent = new EventEmitter<number>();

  handleDelete = (id: number) => {
    console.log(id);
    this.dataEvent.emit(id);
  }

  get totalPrice(): number {
    const sum = this.products.reduce((total, item) => {
      return total + item.price;
    }, 0);

    return sum;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['products'].currentValue);
    console.log(changes['products'].previousValue);
  }

  ngOnDestroy(): void {
    console.log('Component is removed!')
  }
}
