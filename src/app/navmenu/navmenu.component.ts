import { Component, computed, signal, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet, Router} from '@angular/router';


@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    RouterOutlet,
    RouterLink

],
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  // Toggle collapse state
  toggleCollapse() {
    this.collapsed.set(!this.collapsed());
  }
  constructor(private router: Router ) { }

  switchtofrontpage(): void {
    localStorage.removeItem('authToken'); 

    this.router.navigate(['/frontpage']);
  }
}
