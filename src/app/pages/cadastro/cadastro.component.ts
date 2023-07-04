import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  titulo = 'Crie sua conta';
  textoBotao = 'CRIAR MINHA CONTA';

  constructor(
    private formularioService: FormularioService,
    private cadastroService: CadastroService,
    private router: Router
  ) { }

  cadastrar() {
    const cadastroForm = this.formularioService.getCadastroForm();

    if (cadastroForm?.valid) {
      const novoCadastro = cadastroForm.getRawValue() as PessoaUsuaria;
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: () => {
          console.log('Cadastro realizado com sucesso', novoCadastro);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('Erro ao realizar cadastro', err);
        }
      });
    }
  }
}
