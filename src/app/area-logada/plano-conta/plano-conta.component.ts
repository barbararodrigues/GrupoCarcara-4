import { Component, OnInit, TemplateRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs/internal/operators/finalize";
import { toArray } from "rxjs/internal/operators/toArray";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import { PlanoConta, PlanoContaResponse } from "./interfaces/plano-conta.interfaces";
import { PlanoContaService } from "./plano-conta.service";


@Component({
  selector: 'app-plano-conta',
  templateUrl: './plano-conta.component.html',
  styleUrls: ['./plano-conta.component.scss']
})
export class PlanoContaComponent implements OnInit {
  modalReference: NgbModalRef | undefined;
  mostrarErroData: boolean = false;

  id: number = 0;
  selTipoContaOperacao: string = "";
  inpDescricao: String = "";
  inpLogin: String = "";

  planoContas: PlanoContaResponse[] = [];

  constructor(
    private modalService: NgbModal,
    private planoContaService: PlanoContaService,
    private authService: AuthService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    try {
      this.atualizarDados();
    }
    catch (error) {
      console.log(`Erro no método: ngOnInit.PlanoConta: ${error}`);
    }
  }

  atualizarDados() {
    try {
    this.loaderService.open();
      
    this.planoContaService.getPlanoConta()
    .pipe(
      finalize(() => {
        this.loaderService.close();
      })
    )
    .subscribe( 
      response => {this.planoContas = response.filter(f=> f.ativo === true);

      
      
      error => {
        alert(error.error.message);
      }
    );
    }
    catch (error) {
      console.log(`Erro no método: atualizarDados.PlanoConta: ${error}`);
    }
  }

  abrirModal(content: TemplateRef<NgbModalRef>, id: number ) {
    try {
      if (id > 0)
        this.getPlanoContaId(id);  
     
      this.modalReference = this.modalService.open(content, { centered: true, size: "sm", backdrop: "static" });
    }
    catch (error) {
      console.log(`Erro no método: abrirModal.PlanoConta: ${error}`);
    }
  }

  getPlanoContaId(id: number){
    try {
      this.id = id;
       let planoconta = this.planoContas.filter(f=> f.id === id);
       this.inpDescricao = planoconta[0]?.descricao;
       this.selTipoContaOperacao = planoconta[0]?.tipo_Lancamento === "RECEITA" ? "R" : "D";

    }
    catch (error) {
      console.log(`Erro no método: getPlanoContaId.PlanoConta: ${error}`);
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
      let body;
      if(this.id > 0) {
        body = {
          id: this.id,
          descricao: this.inpDescricao,
          login: 'barbara', // this.authService.getUsuario()!.login,
          tipoLancamento: this.selTipoContaOperacao,
          ativo: true
        }
        this.planoContaService.put(body, this.id)
        .subscribe(
          response => {
            this.atualizarDados();
            this.fecharModal();
            this.inpDescricao = "";
            this.selTipoContaOperacao = "";
            this.id = 0;
          },
          error => {
            alert(error.error.message);
          }
        )
      } else {
        body = {
          descricao: this.inpDescricao,
          login: 'barbara', // this.authService.getUsuario()!.login,
          tipoLancamento: this.selTipoContaOperacao,
          ativo: true
        }

        this.planoContaService.save(body)
        .subscribe(
          response => {
            this.atualizarDados();
            this.fecharModal();
            this.inpDescricao = "";
            this.selTipoContaOperacao = "";
            this.id = 0;
          },
          error => {
            alert(error.error.message);
          }
        )
      }
      
    
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