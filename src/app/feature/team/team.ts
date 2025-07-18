import { Component, OnInit } from '@angular/core';
import { TeamService } from './team-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-team',
  imports: [CommonModule],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team implements OnInit{
 employees: any[] = []; 

      constructor(private teamService: TeamService, private configService: ConfigService){
      }

  ngOnInit(): void {
    this.configService.employees$.subscribe(employees => {
      this.employees = employees;
    });

  }

}
