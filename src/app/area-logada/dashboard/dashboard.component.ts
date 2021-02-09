import { Component, OnInit, TemplateRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { usuario } from 'src/app/shared/interfaces/usuario.interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { DatePipe } from '@angular/common';


import { DashboardResponse } from './interfaces/dashboard.interfaces';
import { DashboardService } from './dashboard.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { Lancamento } from 'src/app/shared/interfaces/lancamento.interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LancamentoBody } from './interfaces/lancamento-body.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{  
  
  usuario: usuario | undefined;
  dashboard: DashboardResponse | undefined;
  modalReference: NgbModalRef | undefined;
  idContaDebito: number | undefined;
  idContaCredito: number | undefined;
  
  mostrarErroData: boolean = false;
  
  dataInicio: string | null = '';
  dataFim: string | null = '';
  tipoMovimentacao: string | null = "3";
  textoMovimentacao: string = 'Todas';
  
  
  //Modais
  
  inpDataInicio: string | null = "";
  inputDataFim: string | null = "";
  seltipoConta: string | null = "3";
  
  inpDescricaoOperacao: string = "";
  inpValorOperacao: string = "0";
  inpDataOperacao: string = "";
  selTipoOperacao: string = "";
  selTipoContaOperacao: string = "";
  
  inpDescricaoTransferencia: string = "";
  inpValorTransferencia: string = "0";
  inpDataTransferencia: string = "";
  inpLoginTransferencia: string = "";
  
  //FimModais
  
  constructor(private authService: AuthService, 
    private dashboardService: DashboardService, 
    private datePipe: DatePipe, 
    private loaderService: LoaderService,
    private modalService: NgbModal) { }
    
    ngOnInit() {
      
      this.usuario = this.authService.getUsuario();
      
      let dataAtual = new Date(),
      dataFormatada = this.datePipe.transform(dataAtual, "yyyy-MM-dd");
      this.dataInicio = dataFormatada;
      this.dataFim = dataFormatada;
      
      this.inpDataInicio = dataFormatada;
      this.inputDataFim = dataFormatada;    
      
      this.atualizarDados();                
    }
    
    atualizarDados() {
      this.loaderService.open();
      this.dashboardService.getDashboard(this.dataInicio as string, this.dataFim as string)
      .pipe(
        finalize(() => {          
          this.loaderService.close();
        })
        )
        .subscribe(
          response => this.tratarDados(response),
          error =>{                       
            alert(error.error.message);
          }
          )      
    }
      
    tratarDados(data: DashboardResponse){
          //Preparar as movimentações
          
          this.idContaDebito = data.contaBanco.id;
          this.idContaCredito = data.contaCredito.id;
          
          data = this.prepararMovimentacoes(data);
          let aMovimentacao: Lancamento[];    
          
          if(this.tipoMovimentacao == "3"){
            aMovimentacao = data.contaBanco.lancamentos.concat(data.contaCredito.lancamentos);
          }
          else if(this.tipoMovimentacao == "2"){
            aMovimentacao = data.contaBanco.lancamentos;
          }
          else{
            aMovimentacao = data.contaCredito.lancamentos
          }    
          
          //Ordenando os lançamentos em ordem decrescente, do mais novo para o mais antigo
          aMovimentacao = aMovimentacao.sort((a,b) => {
            let dataAAux = new Date(a.data + "T00:00:00"),
            dataBAux = new Date(a.data + "T00:00:00");
            if(dataAAux < dataBAux){
              return 1;
            }    
            else if(dataAAux == dataBAux){
              if(a.id < b.id ){
                return 1;
              }
              else if(a.id == b.id){
                return 0;
              }
              else{
                return -1;
              }
            }
            else{
              return -1;
            }
          })
          
          data.lancamentosExibidos = aMovimentacao;
          
          this.dashboard = data;      
        }
        
    prepararMovimentacoes(data: DashboardResponse){
      for (let movimentacao of data.contaBanco.lancamentos) {
        movimentacao.tipoConta = "Débito";
      }
      for (let movimentacao of data.contaCredito.lancamentos) {
        movimentacao.tipoConta = "Crédito";
      }
      return data;
    }
      
    abrirModal(content: TemplateRef<NgbModalRef>){
      this.modalReference = this.modalService.open(content, {centered:true, size:"sm", backdrop:"static"});
    }
    
    fecharModal(){
      this.mostrarErroData = false;
      this.modalReference?.close();
    }
    
    salvarFiltro() {      
      let dataInicioAux = new Date(this.inpDataInicio + "T00:00:00"),
      dataFimAux = new Date(this.inputDataFim + "T00:00:00");
      if(dataInicioAux <= dataFimAux){
        //Aqui está certo
        this.mostrarErroData = false;
        this.dataInicio = this.inpDataInicio;
        this.dataFim = this.inputDataFim;
        this.tipoMovimentacao = this.seltipoConta;          
        this.fecharModal();
        this.atualizarDados();
      }
      else{
        //Aqui devemos informar que há um erro
        this.mostrarErroData = true;
        this.inputDataFim = "";
      }
    }
    
    changeTipoOperacao(){
      if(this.selTipoOperacao == "27"){
        this.selTipoContaOperacao = "Debito";
      }
    }
    
    realizarOperacao() {        
      if(!this.inpDescricaoOperacao){
        alert("Descrição não pode ficar vazia");
      }
      else if(!this.inpValorOperacao){
        alert("Valor não pode ficar vazio");
      }
      else if(!this.inpDataOperacao){
        alert("Data não pode ficar vazia");
      }else if(!this.selTipoOperacao){
        alert("Tipo da Operação não pode ficar vazio");
      }
      else if(!this.selTipoContaOperacao && this.selTipoOperacao != "27"){
        alert("Tipo de conta não pode ficar vazio");
      }
      else{
        this.loaderService.open();
        //Aqui podemos continuar com a operação  
        let login = this.authService.getUsuario()!.login;      
        let idConta = 0;
        if(this.selTipoContaOperacao == "Credito"){
          idConta = this.idContaCredito as number;
        }
        else{
          idConta = this.idContaDebito as number;
        }
        
        let body: LancamentoBody = {
          "conta": idConta,
          "contaDestino": "",
          "data": this.inpDataOperacao as string,
          "descricao": this.inpDescricaoOperacao as string,
          "login": login,
          "planoConta": Number(this.selTipoOperacao),
          "valor": Number(this.inpValorOperacao)
        };
        
        this.dashboardService.realizarLancamento(body)            
          .subscribe(
            response => {
              this.atualizarDados();
              this.fecharModal();
              this.inpDescricaoOperacao = "";
              this.inpValorOperacao = "0";
              this.inpDataOperacao = "";
              this.selTipoOperacao = "";
              this.selTipoContaOperacao = "";
            },
            error =>{                       
              alert(error.error.message);
            }
            )            
        }              
      }
      
      realizarTransferencia() {    
        if(!this.inpDescricaoTransferencia){
          alert("Descrição não pode ficar vazia");
        }
        else if(!this.inpValorTransferencia){
          alert("Valor não pode ficar vazio");
        }
        else if(!this.inpValorTransferencia){
          alert("Data não pode ficar vazia");
        }else if(!this.inpLoginTransferencia){
          alert("Login da conta para transferir não pode ficar vazio");
        }    
        else{      
          this.loaderService.open();
          //Aqui podemos continuar com a operação
          let login = this.authService.getUsuario()!.login;      
          let idConta = this.idContaCredito as number;          
          
          let body: LancamentoBody = {
            "conta": idConta,
            "contaDestino": this.inpLoginTransferencia,
            "data": this.inpDataTransferencia as string,
            "descricao": this.inpDescricaoTransferencia as string,
            "login": login,
            "planoConta": 28,
            "valor": Number(this.inpValorTransferencia)
          };
          
          this.dashboardService.realizarLancamento(body)
          .subscribe(
            response => {
              this.atualizarDados();
              this.fecharModal();
              this.inpDescricaoTransferencia = "";
              this.inpValorTransferencia = "0";
              this.inpDataTransferencia = "";
              this.inpLoginTransferencia = "";
            },
            error =>{                       
              alert(error.error.message);
            }
            )   
        }
        
      }             
    }