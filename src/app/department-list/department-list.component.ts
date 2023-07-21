import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { AddDepartmentComponent } from '../add-department/add-department.component';

export interface Department {
  userCount?: number;
  name: string;
  users: string[];
}

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  columnsToDisplay = ['name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Department | null;

  removeData() {
    throw new Error('Method not implemented.');
  }
  departments: Department[] = [
    { name: 'Department 1', users: ['User 1', 'User 2', 'User 3'] },
    { name: 'Department 2', users: ['User 4', 'User 5'] },
    { name: 'Department 3', users: ['User 6'] },
  ];

  selectedDepartment: string = 'all';
  filteredDepartments: Department[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.departments.forEach((department) => {
      department.userCount = this.getUserCount(department);
    });
  }

  onAddDepartment(departmentName: string): void {
    const newDepartment: Department = {
      name: departmentName,
      users: [], // Add an empty users array for the new department
    };
    this.departments.push(newDepartment);
  }

  onAddUserToDepartment(user: string, departmentName: string) {
    const department = this.departments.find(
      (dep) => dep.name === departmentName
    );
    if (department) {
      department.users.push(user);
    }
  }

  filterDepartments() {
    if (this.selectedDepartment === 'all') {
      this.filteredDepartments = this.departments;
    } else {
      this.filteredDepartments = this.departments.filter(
        (department) => department.name === this.selectedDepartment
      );
    }
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
      data: { departments: this.departments },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { name, department } = result;
        this.onAddUserToDepartment(name, department);
      }
    });
  }

  getUserCount(department: Department): number {
    return department.users.length;
  }

  AddDepartment(): void {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '400px',
      data: {
        departmentsData: this.departments,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const { departmentName } = res;
        this.onAddDepartment(departmentName);
      }
    });
  }
}
