import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [NgIf,  NgFor, FormsModule, RouterLink, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  standalone: true,
})

export class UserProfileComponent implements OnInit {
  user: any = {};
  userId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUser(this.userId);
    })  
  }

  getUser(userId: string): void {
    this.apiService.getUser(userId).subscribe(      
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
      
    );
  }

  updateUser(userForm: any): void {
    console.log(userForm);
    this.apiService.updateUser(this.userId, this.user).subscribe(
      (data) => {
        console.log('User updated successfully:', data);

        this.router.navigate(['/users', this.userId]);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  deleteUser(): void {
    this.apiService.deleteUser(this.userId).subscribe(
      () => {
        console.log('User deleted successfully');
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

}
