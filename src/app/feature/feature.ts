import { Component } from '@angular/core';
import { TechStack } from '../tech-stack/tech-stack';
import { MissionStatement } from '../mission-statement/mission-statement';
import { Team } from '../team/team';

@Component({
  selector: 'app-feature',
  imports: [TechStack,MissionStatement,Team],
  templateUrl: './feature.html',
  styleUrl: './feature.scss'
})
export class Feature {

}
