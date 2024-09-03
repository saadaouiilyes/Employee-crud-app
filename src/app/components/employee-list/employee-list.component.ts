import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeFormComponent } from "../employee-form/employee-form.component";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, EmployeeFormComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  employees: Employee[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'position', 'actions'];
  selectedEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }
  editEmployee(employee: Employee): void {
    this.selectedEmployee = { ...employee };
  }
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id);
  }

  onEmployeeUpdated(): void {
    this.selectedEmployee = null;
  }
}
