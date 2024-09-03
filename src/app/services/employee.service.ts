import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    private employees: Employee[] = [];
    private employeesSubject = new BehaviorSubject<Employee[]>([]);
  constructor() { }

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  addEmployee(employee: Employee): void {
    employee.id = this.employees.length + 1;
    this.employees.push(employee);
    this.employeesSubject.next([...this.employees]);
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
      this.employeesSubject.next([...this.employees]);
    }
  }
    deleteEmployee(id: number): void {
      this.employees = this.employees.filter(e => e.id !== id);
      this.employeesSubject.next([...this.employees]);
    }
  }

