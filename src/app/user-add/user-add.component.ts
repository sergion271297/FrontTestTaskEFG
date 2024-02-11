import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent {
  user: any = {};

  constructor(
    private router: Router,
    private apiService: ApiService
    ) { }


    createUser(userForm: any): void {
      console.log(userForm);

      this.apiService.createUser(this.user).subscribe(
        (data) => {
          console.log('User created successfully:', data);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }



}

