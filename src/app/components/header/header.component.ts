import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HOME_PATH } from '../../app.routes';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly HOME_PATH = HOME_PATH;
}
