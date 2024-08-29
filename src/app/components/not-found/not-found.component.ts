import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME_PATH } from '../../app.routes';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  protected readonly HOME_PATH = HOME_PATH;
}
