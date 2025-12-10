import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from '../shared/header-layout/header-layout.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../shared/pipes/UpperCasePipe.pipe';
import { NgFor, NgIf } from '@angular/common';
import { BlogItem, ProductItems } from '../shared/types/productItem';
import { BlogService } from '../../service/BlogService';

@Component({
  selector: 'app-create',
  imports: [RouterOutlet, HeaderLayoutComponent, ReactiveFormsModule, NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  product = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });

  get name() {
    return this.product.get('name');
  }
  get price() {
    return this.product.get('price');
  }

  constructor(private blogService: BlogService, private router: Router) { }

  handleAddCart() {

    if (this.name?.hasError('required') || this.price?.hasError('required')) return;
    const blogItem: BlogItem = {
      id: Math.random(),
      title: String(this.name?.value),
      body: String(this.price?.value),
      author: 'mario'
    }
    this.blogService.postBlog(blogItem).subscribe(({ data }: any) => {
      if (data.id) {
        this.router.navigate(['/']);
      }
    });
    console.log(this.name?.value);
    console.log(this.price?.value);
  }

}
