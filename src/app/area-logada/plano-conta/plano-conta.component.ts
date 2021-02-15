import { Component, OnInit, TemplateRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-plano-conta',
  templateUrl: './plano-conta.component.html',
  styleUrls: ['./plano-conta.component.scss']
})
export class PlanoContaComponent implements OnInit {
  modalReference: NgbModalRef | undefined;
  mostrarErroData: boolean = false;

  selTipoContaOperacao: string = "";
  inpDescricao: string = "";
  inpLogin: string = "";

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    try {

    }
    catch (error) {
      console.log(`Erro no método: ngOnInit.PlanoConta: ${error}`);
    }
  }

  abrirModal(content: TemplateRef<NgbModalRef>) {
    try {
      this.modalReference = this.modalService.open(content, { centered: true, size: "sm", backdrop: "static" });
    }
    catch (error) {
      console.log(`Erro no método: abrirModal.PlanoConta: ${error}`);
    }
  }


  fecharModal() {
    try {
      this.mostrarErroData = false;
      this.modalReference?.close();
    }
    catch (error) {
      console.log(`Erro no método: fecharModal.PlanoConta: ${error}`);
    }
  }

  save() {
    try {
    }
    catch (error) {
      console.log(`Erro no método: save.PlanoConta: ${error}`);
    }
  }

  exibeErro(nomeControle: string, form: NgForm) {
    try {
      if (!form.controls[nomeControle]) {
        return false;
      }
      return form.controls[nomeControle].invalid && form.controls[nomeControle].touched;
    }
    catch (error) {
      console.log(`Erro no método: exibeErro.PlanoConta: ${error}`);
    }
    return false;
  }




}