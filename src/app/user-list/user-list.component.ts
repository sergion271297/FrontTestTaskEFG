import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [NgFor],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getAllUsers().subscribe(      
      (data) => {
        this.users = data;
        
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
      
    );
  }

  viewUserProfile(userId: string): void {
    this.router.navigate(['/user', userId]);
  }

}
