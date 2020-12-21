import { Cidade } from './cidade';
export class Endereco {
    id:number;
    logradouro?:string;
    numero?:string;
    complemento?:string;
    cep?:string;
    bairro?:string;
    cidade?:Cidade;
}
