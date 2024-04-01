import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['../styles/header.scss', '../styles/main.scss']
})
export class AppComponent {
  title = 'Receteame';
}
