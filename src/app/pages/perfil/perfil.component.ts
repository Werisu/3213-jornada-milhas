import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { TokenService } from 'src/app/core/services/token.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
  titulo = 'Olá, ';
  textoBotao = 'ATUALIZAR';
  perfilComponent = true;

  cadastro!: PessoaUsuaria;
  token: string = '';
  nome: string = '';
  form!: FormGroup<any> | null;

  constructor(
    private cadastroService: CadastroService,
    private tokenService: TokenService,
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

  deslogar() {
    console.log('Logout realizado com sucesso')
  }

  atualizar() {
    console.log('Cadastro atualizado com sucesso')
  }

}
