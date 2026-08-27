import { use } from "react";
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

  return (
    <>
      <h1>Teste</h1>
    </>
  )
}

export default Tarefas
