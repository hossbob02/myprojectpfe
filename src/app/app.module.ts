import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { AllSkillsComponent } from './all-skills/all-skills.component';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { ItemComponent } from './item/item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { OrdersComponent } from './orders/orders.component';
import { FavorisComponent } from './favoris/favoris.component';
import { ChatComponent } from './chat/chat.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SkillsManagerComponent } from './skills-manager/skills-manager.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfilComponent,
    MySkillsComponent,
    AllSkillsComponent,
    AddSkillsComponent,
    LoginComponent,
    RegisterComponent,
    ItemComponent,
    ItemDetailComponent,
    PurchasesComponent,
    OrdersComponent,
    FavorisComponent,
    ChatComponent,
    AdminloginComponent,
    DashboardComponent,
    UsersComponent,
    SkillsManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp({
      production: false,
      firebase: {
          apiKey: "AIzaSyBzXze3C2dsAC-OdPYldJ1JMD6n7GnUNc0",
          authDomain: "myproject-5b4a8.firebaseapp.com",
          databaseURL: "https://myproject-5b4a8.firebaseio.com",
          projectId: "myproject-5b4a8",
          storageBucket: "myproject-5b4a8.appspot.com",
          messagingSenderId: "768547282087",
          appId: "1:768547282087:web:28f5c0ec76160ac4c38f82",
          measurementId: "G-4DKK1V3D9D"
        } 
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
