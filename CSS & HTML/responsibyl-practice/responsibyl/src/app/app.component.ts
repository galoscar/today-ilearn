import {Component, ViewEncapsulation} from '@angular/core';
import {SearchComponent} from '@rodeapps/search'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'responsibyl';
}
