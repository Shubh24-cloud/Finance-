import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-frontpage',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './frontpage.component.html',
  styleUrl: './frontpage.component.css'
})
export class FrontpageComponent {

  constructor(private router: Router) { }

  switchTologin(): void {
    this.router.navigate(['/login']);
  }
  switchToRegister(): void {
    this.router.navigate(['/register']);
  }

}
