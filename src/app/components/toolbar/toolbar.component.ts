import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToolbarItem } from './../../models/ToolbarItem';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  items:ToolbarItem[] = [];
  
  ngOnInit(): void {
    this.items = [
      {
        name: 'HCP',
        linkName: 'hcp',
        active: false
      },
      {
        name: 'My Courses',
        linkName: 'courses',
        active: false
      },
    ]
  }

  togglePage (name:string) {
    for (let item of this.items) {
      if (item.name == name) item.active = true
      else item.active = false
    }
  }

}
