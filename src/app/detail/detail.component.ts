import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from '../shared/header-layout/header-layout.component';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../shared/pipes/UpperCasePipe.pipe';
import { NgFor, NgIf } from '@angular/common';
import { ProductItems } from '../shared/types/productItem';
import { BlogService } from '../../service/BlogService';

@Component({
  selector: 'app-detail',
  imports: [RouterOutlet, HeaderLayoutComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  id = '';

  productItem: ProductItems = {
    id: 0,
    image: '',
    name: '',
    price: 0,
  };
  constructor(private route: ActivatedRoute, private blogService: BlogService) {
    this.id = String(route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.blogService.detailBlog(+this.id).subscribe(({ data }: any) => {
      this.productItem.id = data.id;
      this.productItem.image = 'assets/images/shoe.png';
      this.productItem.name = data.title;
      this.productItem.price = data.body;
    })
  }

}
