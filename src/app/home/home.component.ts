import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderLayoutComponent } from '../shared/header-layout/header-layout.component';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../shared/pipes/UpperCasePipe.pipe';
import { NgFor, NgIf } from '@angular/common';
import { ProductItems } from '../shared/types/productItem';
import { ProductItemComponent } from "../shared/productItem/productItem.component";
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../service/BlogService';
import { map, Subscription } from 'rxjs';
import { get } from 'http';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, ProductItemComponent, FormsModule, CurrencyPipe, UpperCasePipe, NgFor, NgIf, HeaderLayoutComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  nameBtn = 'Click Me!';

  clickMessage = '';

  isVisible = true;

  handleClickMe(): void {
    this.clickMessage = "Ok Cam On!"
  }

  handleDelete = (id: number) => {
    this.blogService.deleteBlog(id).subscribe(({ data }: any) => {
      if (data == 1) {
        this.products = this.products.filter((item) => item.id !== id)

      }
    })
  }
  updateField(): void {
    console.log("Check input keyup")
  }

  products: ProductItems[] = [
    { id: 1, name: 'Nike', price: 400, image: 'assets/images/shoe.png' },
    { id: 2, name: 'MLB', price: 500, image: 'assets/images/shoe.png' },
    { id: 3, name: 'Adidas', price: 600, image: 'assets/images/shoe.png' },
    { id: 4, name: 'NBL', price: 700, image: 'assets/images/shoe.png' },
  ];


  constructor(private blogService: BlogService) {
    console.log('initialize component');
    this.getBlogApi = new Subscription();
  }
  ngOnInit(): void {
    console.log('initialize component');
    this.getBlogApi = this.blogService.getBlogs().pipe(
      map(({ data }) => {
        return data.map((item: any) => ({
          ...item,
          name: item.title,
          price: Number(item.body),
          image: 'assets/images/shoe.png',
        }));
      })
    )
      .subscribe((res) => {
        this.products = res;
      });
  }



  getBlogApi: Subscription;

  ngOnDestroy(): void {
    if (this.getBlogApi) {
      this.getBlogApi.unsubscribe();
      console.log('get blog api unsubcribed')
    }
  }

  // ngDoCheck(): void {
  //   console.log('check component')
  // }

  handleChangeVisible = () => {
    this.isVisible = false;
  }
}

