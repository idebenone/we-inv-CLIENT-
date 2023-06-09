import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { TopnavComponent } from '../Components/topnav/topnav.component';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';


import { CompanyComponent } from '../Components/company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../Guard/auth.interceptor';
import { AuthService } from '../Services/auth.service';
import { CompanyService } from '../Services/company.service';
import { CmpPitchessComponent } from '../Components/cmp-pitchess/cmp-pitchess.component';
import { CmpCampsComponent } from '../Components/cmp-camps/cmp-camps.component';
import { InsertCampComponent } from '../Components/Modals/insert-camp/insert-camp.component';
import { InsertPitchComponent } from '../Components/Modals/insert-pitch/insert-pitch.component';
import { UpdatePitchComponent } from '../Components/Modals/update-pitch/update-pitch.component';
import { UpdateCampComponent } from '../Components/Modals/update-camp/update-camp.component';
import { AllcampsComponent } from '../Components/allcamps/allcamps.component';
import { IndiCampComponent } from '../Components/indi-camp/indi-camp.component';
import { CallPaymentComponent } from '../Components/Modals/call-payment/call-payment.component';
import { PortfolioComponent } from '../Components/portfolio/portfolio.component';
import { TruncatePipe } from '../Pipes/truncate.pipe';
import { CompanyProfileComponent } from '../Components/Modals/company-profile/company-profile.component';
import { CreateCompProfileComponent } from '../Components/Modals/create-comp-profile/create-comp-profile.component';
import { ProfileComponent } from '../Components/Modals/profile/profile.component';



@NgModule({
  declarations: [
    SharedComponent,
    TopnavComponent,
    CompanyComponent,
    ProfileComponent,
    CmpPitchessComponent,
    CmpCampsComponent,
    InsertCampComponent,
    InsertPitchComponent,
    UpdatePitchComponent,
    UpdateCampComponent,
    AllcampsComponent,
    IndiCampComponent,
    CallPaymentComponent,
    PortfolioComponent,
    CompanyProfileComponent,
    CreateCompProfileComponent,
    ProfileComponent,
    TruncatePipe

  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    CompanyService
  ],
  exports: [
    SharedComponent
  ]
})
export class SharedModule { }
