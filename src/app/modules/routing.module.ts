import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { ChatComponent } from '../components/chat/chat.component';
import { UsersComponent } from '../components/users/users.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard/auth-guard.service';

const appRoutes: Routes = [
    { path: 'sign-in', component: SignInComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    {
        path: 'chat/:email',
        component: ChatComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    },
    { path: '**', component: SignInComponent }
];

@NgModule({
    declarations: [

    ],
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class RoutingModule { }
