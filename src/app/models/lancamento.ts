import { Pessoa } from './pessoa';
import { Categoria } from './categoria';

export class Lancamento {
    id?: number;
    tipo?: string = 'RECEITA';
    descricao?: string;
    dataVencimento?: Date;
    dataPagamento?: Date;
    valor?: number;
    observacao?: string;
    pessoa = new Pessoa();
    categoria = new Categoria();
    anexo?:string;
    urlAnexo?:string;

}