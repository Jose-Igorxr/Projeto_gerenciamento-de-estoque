export interface IPost { 
  title: string
  content: string
  image: string
}

export interface IMarca {
  id: number;        
  nome: string;
  descricao: string;
}

export interface ICategoria {
  id: number;
  nome: string;
  descricao: string;
}
  
export interface IProduto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;             
  categoria: ICategoria;     
  marca: IMarca | null;      
  imagem: string;            
}
