import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxsModule, Select, Store} from "@ngxs/store";
import {AppState} from "./state/app.state";
import {Observable} from "rxjs";
import {AppStateModel} from "./state/app.model";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DevelopersTodayTestTask';
}
