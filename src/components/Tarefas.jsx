import { useState, useEffect } from "react"

const Tarefas = () => {

    //Hook - useState: manipula o estado da variável e armazena os dados
        //variavel, função que altera a variavel
    const [tarefas, setTarefas] = useState(() => {
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });
    //useState para manipular os dados que passar nos campos
    const [campo, setCampo] = useState("");

    //Hook - useEffect: realiza um efeito colateral, no exemplo, vai carregar automaticamente as tarefas cadastradas

    useEffect(() => {
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas))
    }, [tarefas]);

    //função adicionar tarefa
                           //e = event
    const AdicionarTarefa = (e) => {
        e.preventDefault();
        if(!campo.trim()) return;

        const novaTarefa = {
            id: Date.now(),
            text: campo,
        };
                   //spread
        setTarefas([...tarefas, novaTarefa]);
        setCampo(""); //limpa o campo para começar um novo cadastro
    }

     const RemoverTarefa=(id)=>{
        const apagarTarefa=tarefas.filter((tarefa)=>tarefa.id !== id);
        setTarefas(apagarTarefa)
    };

  return (
    <>
          <div className="max-w-md mx-auto mt-10 p-6 bg-indigo-200 rounded-2xl shadow-xl border-2 border-indigo-300">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Minha Lista de Tarefas</h2>

              <form onSubmit={AdicionarTarefa} className="flex gap-2 mb-6 justify-center">
                  <input
                      type="text"
                      value={campo}
                      onChange={(e) => setCampo(e.target.value)}
                      placeholder="Digite uma nova tarefa..."
                      className="flex-1 px-4 border border-gray-400 rounded-lg focus:outline-indigo-400 focus:border-transparent text-gray-950"
                  />
                  <button type="submit" className="bg-indigo-400 text-white hover:bg-indigo-700 font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer">
                      Adicionar
                  </button>
              </form>

              <ul className="space-y-3">
                  {tarefas.map((tarefa) => (
                      <li key={tarefa.id} className="flex items-center justify-between px-3 py-2 bg-indigo-300 rounded-lg border border-indigo-400 hover:bg-indigo-400">
                          <span className="">{tarefa.text}</span>                          
                          {/* arrow function (função seta) que encapsula a execução de outra função. 
            Ela garante que removerTarefa só seja executada quando o evento acontecer (como um clique de botão), 
            e não assim que a página carregar.
            */}
                          <button onClick={() => RemoverTarefa(tarefa.id)}
                              className="bg-indigo-300 text-white hover:bg-indigo-700 font-medium px-4 py-1 rounded-xl transition-colors cursor-pointer"
                          >
                              Excluir
                          </button>
                      </li>
                  ))}
              </ul>
              {tarefas.length === 0 && <p className="text-center italic mt-4">Nenhuma tarefa salva.</p>}
        </div>
    </>
  )
}

export default Tarefas
