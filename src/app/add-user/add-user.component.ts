import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  name!: string;
  selectedDepartment!: string;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    const newUser = {
      name: this.name,
      department: this.selectedDepartment,
    };
    this.dialogRef.close(newUser);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
