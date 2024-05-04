import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/core/services/menu.service';
import { MenuViewModel } from 'src/app/core/ViewModels/menu.viewmodel';

@Component({
  selector: 'app-asidenav',
  templateUrl: './asidenav.component.html',
  styleUrls: ['./asidenav.component.css']
})
export class AsidenavComponent implements OnInit, OnDestroy  {

  menuData: MenuViewModel[] = [
    // Populate menuData with actual data
  ];
  menuSubscription: Subscription | undefined;
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuSubscription = this.menuService.getAllMenus()
      .subscribe(
         (data: any) => {
           this.menuData = data;
           console.log('Data from Api :- ',data)
        },
        (error) => {
          console.error('Error fetching menus:', error);
          // Handle error gracefully, e.g., display a message to the user
        }
      );
  }

  ngOnDestroy(): void {
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
    }
  }
  
}
