import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header'; // <-- Mudou aqui no final!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html', // <-- Se aqui estiver dando erro, tire o .component também
  styleUrls: ['./app.css']   // <-- E tire o .component daqui também
})
export class AppComponent {
  title = 'audiostore';
}
