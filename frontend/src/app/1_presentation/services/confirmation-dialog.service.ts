import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private showDialogSubject = new BehaviorSubject<boolean>(false);
  public showDialog$ = this.showDialogSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  private confirmActionSubject = new BehaviorSubject<boolean>(false);
  public confirmAction$ = this.confirmActionSubject.asObservable();

  constructor() {}

  showDialog() {
    this.showDialogSubject.next(true);
  }

  closeDialog() {
    this.showDialogSubject.next(false);
  }

  startLoading() {
    this.isLoadingSubject.next(true);
  }

  stopLoading() {
    this.isLoadingSubject.next(false);
  }

  getLoadingStatus(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  confirm() {
    this.confirmActionSubject.next(true);
  }

  closeConfirmation() {
    this.confirmActionSubject.next(false);
  }
}
