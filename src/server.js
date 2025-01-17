import express from 'express'
import 'express-async-errors'
//Esse pacote captura automaticamente erros em funções async, eliminando a necessidade de usar blocos try/catch em todas as rotas.
import { router} from './routes.js'

const app = express()
app.use(express.json()) /*falar pro express que vamos utilizar json */
app.use(router)
//Conecta todas as rotas definidas no arquivo routes ao servidor. Isso diz ao Express que, sempre que receber uma requisição, ele deve verificar se existe uma rota correspondente no router.

app.use((err,req,res,next)=>{
    /*
    O Express chama esta função automaticamente sempre que detecta um erro em alguma parte do código.
    err: Representa o erro ocorrido.
    req: A requisição feita pelo cliente.
    res: A resposta que será enviada de volta ao cliente.
    next: Uma função para chamar o próximo middleware (se necessário).
    */
   if(err instanceof Error){
    //Aqui verificamos se o erro é uma instância de Error (um erro conhecido e esperado).
    return res.status(400).json({
        error: err.message
    })
    //Enviamos uma resposta com código de status 400 (erro de cliente) e uma mensagem de erro para o cliente.
   }

   //erros desconhecidos ou genéricos
   return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
    // Mensagem genérica de erro
   })
})

//Inicializando o servidor
const PORT = process.env.PORT || 3333
app.listen(PORT,()=>{
    console.log(`Servidor online na porta ${PORT}!`);
}  );