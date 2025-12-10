import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from './shared/header-layout/header-layout.component';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from './shared/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from './shared/pipes/UpperCasePipe.pipe';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}

