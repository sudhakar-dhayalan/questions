import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { QuestionComponent } from "./question/question.component";
import { QuestionsComponent } from "./questions/questions.component";

const routes: Routes = [
    {
        path: '',
        component: QuestionsComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: QuestionComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OverviewRoutingModule {

}