import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { HomepageComponent } from './homepage/homepage';
import { QuizPlayComponent } from './quiz-play/quiz-play';
import { ProfileComponent } from './profileComponent/profileComponent';
import { UserHistoryComponent } from './history/user-history.component';
import { QuizMakerComponent } from './quiz-maker/quiz-maker';
import { AuthGuard } from './auth-guard';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'register', component: RegisterComponent, },
    { path: 'homepage', component: HomepageComponent,  canActivate: [AuthGuard] },
    { path: 'quiz/:id', component: QuizPlayComponent,  canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard]}, 
    { path: 'historico', component: UserHistoryComponent,  canActivate: [AuthGuard] },
    { path: 'maker', component: QuizMakerComponent,  canActivate: [AuthGuard]},
    { path: '**', redirectTo: '' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }