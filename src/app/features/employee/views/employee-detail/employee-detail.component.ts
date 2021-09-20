import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EmployeeViewModel from 'features/employee/models/employee-view.model';
import EmployeeDetailStoreService from 'features/employee/services/stores/employee-detail.store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
})
export default class EmployeeDetailComponent implements OnInit {
  viewData$!: Observable<EmployeeViewModel>;

  public constructor(private readonly store: EmployeeDetailStoreService, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscribe();
    this.init();
  }

  private subscribe(): void {
    this.viewData$ = this.store.connect();
  }

  private init() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.init(id);
  }
}
