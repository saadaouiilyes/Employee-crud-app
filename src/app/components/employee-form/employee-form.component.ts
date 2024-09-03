import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent  {
  

  @Input() employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    salary: 0
  };

  @Output() employeeUpdated = new EventEmitter<void>();

  constructor(private employeeService: EmployeeService) {}

  onSubmit(): void {
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee);
    } else {
      this.employeeService.addEmployee(this.employee);
    }
    this.employeeUpdated.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.employee = {
      firstName: '',
      lastName: '',
      email: '',
      salary: 0
    };
  }
}
