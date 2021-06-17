import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewRoutingModule } from './overview-routing.module'

import { QuestionsComponent } from './questions/questions.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    QuestionsComponent, 
    QuestionComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule
  ]
})
export class OverviewModule { }
