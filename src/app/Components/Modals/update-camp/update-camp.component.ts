import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CampaignService } from 'src/app/Services/campaign.service';
import { PitchService } from 'src/app/Services/pitch.service';
import { UserService } from 'src/app/Services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-update-camp',
  templateUrl: './update-camp.component.html',
  styleUrls: ['./update-camp.component.css']
})
export class UpdateCampComponent {

  campObj: { [key: string]: FormControl } = {
    camp_id: new FormControl(''),
    camp_title: new FormControl('', [Validators.required]),
    pitch_id: new FormControl(''),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
    min_raise: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
    max_raise: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
    target_raise: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
    raised_amt: new FormControl('')
  }

  pitches: any = [];
  today: Date = new Date();
  someDate: Date;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateCampComponent>,
    private userService: UserService,
    private campaignService: CampaignService,
    private pitchService: PitchService,
    private snack: MatSnackBar) {
    this.someDate = new Date();
    this.someDate.setDate(this.today.getDate() + 30);
  }

  ngOnInit() {
    this.getCampaignById();
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById(localStorage.getItem("email")).subscribe((data: any) => {
      if (data.length != 0)
        this.pitchService.getAllPitchByCmpId(data.id).subscribe((data: any) => {
          this.pitches = data;
        })
    })
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('pattern')) {
      return 'Not a valid name';
    }
    return '';
  }

  hasFormErrors() {
    return Object.values(this.campObj).some(control => control.invalid || control.pending);
  }

  getCampaignById() {
    this.campaignService.getCmpCampById(this.data.id).subscribe((data: any) => {
      console.log(data);
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          this.campObj[key].setValue(value);
        }
      }
    })
  }

  updateCamp() {
    const thatDate = new Date(this.campObj['start_date'].value);
    const nextDate = new Date(thatDate);
    nextDate.setDate(thatDate.getDate() + 1);
    const updateCampObj = {
      camp_id: this.campObj['camp_id'].value,
      camp_title: this.campObj['camp_title'].value,
      pitch_id: this.campObj['pitch_id'].value,
      start_date: nextDate,
      end_date: this.campObj['end_date'].value,
      min_raise: this.campObj['min_raise'].value,
      max_raise: this.campObj['max_raise'].value,
      target_raise: this.campObj['target_raise'].value,
    }

    this.campaignService.updateCamp(updateCampObj).subscribe((data: any) => {
      this.snack.open("Campaign has been updated", 'OK', { duration: 4000 });
      this.dialogRef.close();
    })
  }

}
