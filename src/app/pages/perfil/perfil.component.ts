import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  titulo = 'Olá, ';
  textoBotao = 'ATUALIZAR';
  cadastro!: PessoaUsuaria;
  token: string = '';
  nome: string = '';
  form!: FormGroup<any> | null;

  constructor(
    private cadastroService: CadastroService,
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
    private formularioService: FormularioService
  ) { }

  ngOnInit() {
    this.token = this.tokenService.retornarToken();
    this.cadastroService.buscarCadastro(this.token).subscribe(cadastro => {
      this.cadastro = cadastro;
      this.nome = cadastro.nome;

      this.carregarFormulario();
    })
  }

  carregarFormulario() {
    this.form = this.formularioService.getCadastro();

    this.form?.patchValue({
      nome: this.cadastro.nome,
      nascimento: this.cadastro.nascimento,
      cpf: this.cadastro.cpf,
      cidade: this.cadastro.cidade,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      genero: this.cadastro.genero,
      telefone: this.cadastro.telefone,
      estado: this.cadastro.estado,
    });
  }

  atualizarPerfil() {
    this.cadastroService.editarCadastro(this.cadastro, this.token).subscribe({
      next: () => {
        console.log('Cadastro editado com sucesso', this.cadastro);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
        console.log(this.cadastro);
      }
    })
  }

  deslogar() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}

