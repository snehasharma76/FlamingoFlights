import { Component } from '@angular/core';
import { Register } from './models/register.model';
import { RegisterService } from './services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Flamingo';

  simpleAlert(){

    Swal.fire('Hello world!');

  }
}
