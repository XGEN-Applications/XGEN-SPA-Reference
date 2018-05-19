import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { SettingsComponent } from './components/settings/settings.component';

// ADD CHILDREN ROUTES

const HomepageChildren = [
  { path: 'projects', component: ProjectsComponent, outlet: 'home-router' },
  {
    path: 'project-form',
    component: ProjectFormComponent,
    outlet: 'home-router'
  },
  {
    path: 'settings',
    component: SettingsComponent,
    outlet: 'home-router'
  },
  { path: '', component: ProjectsComponent, outlet: 'home-router' }
];

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomepageComponent,
    children: HomepageChildren
  },
  { path: '**', component: LoginComponent }
];

// export const appRoutingProviders: any[] = [AuthGuard];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  useHash: true
});
