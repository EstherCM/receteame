import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private showDialogSubject = new Subject<void>();
  private confirmSubject = new Subject<void>();
  private cancelSubject = new Subject<void>();
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  showDialog() {
    this.showDialogSubject.next();
  }

  getDialogResponse(): Observable<void> {
    return this.showDialogSubject.asObservable();
  }

  confirm() {
    this.confirmSubject.next();
  }

  getConfirmResponse(): Observable<void> {
    return this.confirmSubject.asObservable();
  }

  cancel() {
    this.cancelSubject.next();
  }

  getCancelResponse(): Observable<void> {
    return this.cancelSubject.asObservable();
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
}
