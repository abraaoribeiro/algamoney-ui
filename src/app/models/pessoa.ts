import { Endereco } from './endereco';

export class Pessoa {
    id:number;
    nome?:String;
    ativo?: boolean = false;
    endereco:Endereco = new Endereco();
    
}