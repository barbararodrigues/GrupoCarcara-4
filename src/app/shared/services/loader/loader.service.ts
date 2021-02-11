import { Injectable, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { LoaderComponent } from '../../components/loader/loader.component';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {

  constructor(private modalService: NgbModal) { }

  modalReference: NgbModalRef | undefined;

  temModalLoader: boolean = false;

  open() {
    try {
      if (!this.temModalLoader) {
        this.temModalLoader = true;
        this.modalReference = this.modalService.open(LoaderComponent, { centered: true, keyboard: false, backdrop: 'static' });
      }
    }
    catch (error) {
      console.log(`Erro no método: open.Loader: ${error}`);
    }
  }

  close() {
    try {
      this.temModalLoader = false;
      this.modalReference!.close();
    }
    catch (error) {
      console.log(`Erro no método: close.Loader: ${error}`);
    }
  }

}
