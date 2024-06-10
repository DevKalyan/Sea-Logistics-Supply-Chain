import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/core/services/menu.service';
import { MenuViewModel } from 'src/app/core/ViewModels/menu.viewmodel';
import { UserViewModel } from 'src/app/core/ViewModels/user.model';

@Component({
  selector: 'app-asidenav',
  templateUrl: './asidenav.component.html',
  styleUrls: ['./asidenav.component.css']
})
export class AsidenavComponent implements OnInit, OnDestroy {

  menuData: MenuViewModel[] = [
    // Populate menuData with actual data
  ];
  menuSubscription: Subscription | undefined;
  constructor(private menuService: MenuService, private sessionService: SessionStorageService) {
    const userDetailsString = this.sessionService.retrieve("_userDetails");

    if (userDetailsString) {
        const userviewModel: UserViewModel = JSON.parse(userDetailsString);
        console.log("Session value from side menu", userviewModel);

        if (userviewModel && userviewModel.UserId) {
            this.loadMenus(userviewModel.UserId);
        } else {
            console.error("User details retrieved from session storage are invalid:", userDetailsString);
            // Handle invalid user details gracefully, e.g., redirect to login page
        }
    } else {
        console.warn("User details not found in session storage.");
        // Handle scenario where user details are not found in session storage, e.g., redirect to login page
    }
}

  ngOnInit(): void {
  }

  loadMenus(userid: string){
    this.menuSubscription = this.menuService.getMenusForLoggedInUser(userid)
    .subscribe(
      (data: any) => {
        this.menuData = data;
        //console.log('Data from Api :- ', data)
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
