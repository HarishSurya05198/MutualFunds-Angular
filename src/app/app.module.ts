import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { LoginComponent } from './login/login.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { RegisterComponent } from './register/register.component';
import { SchemeDetailsComponent } from './scheme-details/scheme-details.component';
import { SchemeBookComponent } from './scheme-details/scheme-book/scheme-book.component';
import { InvestmentDetailsComponent } from './investment-details/investment-details.component';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor.service';
import { OtpLoginComponent } from './login/otp-login/otp-login.component';
import { ProfileComponent } from './profile/profile.component';
import { MutualFundServiceService } from './mutual-fund-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SchemeDetailsComponent,
    SchemeBookComponent,
    InvestmentDetailsComponent,
    OtpLoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    NgOtpInputModule,
    MatDatepickerModule,
    MatInputModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe,
    HttpClient,
    AuthInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
