import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { AllSkillsComponent } from './all-skills/all-skills.component';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ItemComponent } from './item/item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { OrdersComponent } from './orders/orders.component';
import { ChatComponent } from './chat/chat.component';
import { FavorisComponent } from './favoris/favoris.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SkillsManagerComponent } from './skills-manager/skills-manager.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'profil/:nameprenom/:id',component:ProfilComponent},
  {path:'myskills',component:MySkillsComponent},
  {path:'allskills',component:AllSkillsComponent},
  {path:'addskills',component:AddSkillsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'item/:id',component:ItemComponent},
  {path:'item-detail/:id',component:ItemDetailComponent},
  {path:'purchases', component:PurchasesComponent},
  {path:'orders', component:OrdersComponent},
  {path:'chat/:id',component:ChatComponent},
  {path:'favoris',component:FavorisComponent},
  {path:'admin/login',component:AdminloginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'users',component:UsersComponent},
  {path:'skillsmanager',component:SkillsManagerComponent}






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
