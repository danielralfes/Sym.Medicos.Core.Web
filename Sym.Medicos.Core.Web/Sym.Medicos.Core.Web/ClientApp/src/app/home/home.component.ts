import { Component } from '@angular/core';
import { VinculoMedicoConsultorio } from "../model/VinculoMedicoConsultorio";
import { Router } from "@angular/router";
import { VinculoServico } from "../services/vinculo/vinculo.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public vinculos: VinculoMedicoConsultorio[];

  ngOnInit(): void {

  }

  constructor(private vinculoServico: VinculoServico, private router: Router) {
    this.vinculoServico.obterTodosVinculos()
      .subscribe(
        vinculo => {
          this.vinculos = vinculo
        },
        e => {
          console.log(e.error);
        });
  }

  public adicionarVinculo() {
    sessionStorage.setItem('vinculoSession', '');
    this.router.navigate(['/Vinculo']);
  }

  public deletarVinculo(vinculo: VinculoMedicoConsultorio) {
    var retorno = confirm("Deseja realmente deletar o médico selecionado?");

    if (retorno == true)
      this.vinculoServico.deletar(vinculo)
        .subscribe(
          vinculo => {
            this.vinculos = vinculo;
          },
          e => {
            console.log(e.error);
          });
  }

  public editarVinculo(vinculo: VinculoMedicoConsultorio) {
    sessionStorage.setItem('vinculoSession', JSON.stringify(vinculo));
    this.router.navigate(['/Vinculo']);
  }
}
