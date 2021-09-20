/* eslint-disable class-methods-use-this */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import GuestStoreService from '../../services/stores/guest-store.service';
import GuestApiModel from '../../models/guest-api.model';

@Component({
  selector: 'app-guest-overview',
  templateUrl: './guest-overview.component.html',
  styleUrls: ['./guest-overview.component.scss'],
})
export default class GuestOverviewComponent implements OnInit {
  @ViewChild(MatSort, { static: true })
  public sort: MatSort;

  public dataSource: any = [];

  public displayedColumns: string[] = [
    'firstName',
    'lastName',
    'arriving',
    'leaving',
    'email',
    'location',
    'status',
    'edit',
  ];

  public constructor(private readonly guestStoreService: GuestStoreService) {}

  public ngOnInit(): void {
    try {
      this.guestStoreService.getGuests().subscribe((guests: GuestApiModel[]) => {
        this.dataSource = new MatTableDataSource(guests);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public editGuest(id: string): void {
    console.log(id);
  }

  public deleteGuest(id: string): void {
    console.log(id);
  }

  public downloadEmail(id: string): void {
    this.dynamicDownloadJson(id);
  }

  public dynamicDownloadJson(id) {
    this.guestStoreService.downloadEmail(id).subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'email-invitation.html',
        text: JSON.stringify(res.invitationEmail).replace(/\\/g, ''),
      });
    });
  }

  private dyanmicDownloadByHtmlTag(arg: { fileName: string; text: string }) {
    const link = document.createElement('a');
    const element = link;

    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }
}
