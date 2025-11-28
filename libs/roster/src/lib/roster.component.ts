import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface User {
  username: string;
  email: string;
  articleCount: number;
  favoritesReceived: number;
  firstArticleDate: string;
}

@Component({
  selector: 'realworld-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
  providers: [],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class RosterComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>('/api/users').subscribe((data) => {
      this.users = data.map(user => ({
        ...user,
        firstArticleDate: user.firstArticleDate ? new Date(user.firstArticleDate).toLocaleDateString() : '-'
      }));
    });
  }
}
