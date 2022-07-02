import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'db-delete';

constructor(private databaseService: DatabaseService){}

  async ngOnInit() {
    await this.databaseService.initialize();
  }
  
  deleteDb = () => this.databaseService.deleteDb();

}
