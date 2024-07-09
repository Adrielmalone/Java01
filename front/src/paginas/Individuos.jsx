import "./componentes.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Individuos() {
  //Entidades e listas utilizadas na página
  const [individuo, setIndividuo] = useState(null);
  const [individuos, setIndividuos] = useState([]);
  const [isEditar, setIsEditar] = useState(false);

  //Funções de carregamento de dados do backend
  function getIndividuos() {
    axios.get("http://localhost:5218/individuos").then((resposta) => {
      setIndividuos(resposta.data);
    });
  }

  function getIndividuo(id) {
    axios.get("http://localhost:5218/individuos/" + id).then((resposta) => {
      setIsEditar(true);
      setIndividuo(resposta.data);
    });
  }

  async function postIndividuos(id, nome) {
    console.log(id);
    console.log(nome);
    await axios.post("http://localhost:5218/individuos", {
      id: id,
      nome: nome,
    });
    getIndividuos();
  }

  async function putIndividuos(id, nome) {
    await axios.put("http://localhost:5218/individuos/" + id, {
      id: id,
      nome: nome,
    });
    getIndividuos();
  }

  function excluirIndividuo(id) {
    axios.delete("http://localhost:5218/individuos/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  useEffect(() => {
    getIndividuos();
  }, []);

  //Funções para manipulação da entidade principal
  function novoIndividuo() {
    setIndividuo({
      id: 0,
      nome: "",
    });
  }

  function reiniciarEstadoDosObjetos() {
    setIndividuo(null);
    getIndividuos();
  }

  function editarIndividuo(campo, valor, id) {
    individuo[campo] = valor;
    setIndividuo({
      id: id,
      nome: individuo.nome,
    });
  }

  //Função para geração do formulário
  function getFormulario() {
    return (
      <form>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={individuo.nome}
          onChange={(e) => {
            editarIndividuo(e.target.name, e.target.value, individuo.id);
          }}
        />
        <button
          type="button"
          onClick={() => {
            if (isEditar) {
              putIndividuos(individuo.id, individuo.nome).then(() => {
                setIsEditar(null);
                setIndividuo(null);
              });
            } else {
              postIndividuos(individuo.id, individuo.nome).then(() =>
                setIndividuo(null)
              );
            }
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => {
            setIndividuo(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  //Funções para geração da tabela
  function getLinhaDaTabela(individuo) {
    return (
      <tr key={individuo.id}>
        <td>{individuo.id}</td>
        <td>{individuo.nome}</td>
        <td>
          <button type="button" onClick={() => excluirIndividuo(individuo.id)}>
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              getIndividuo(individuo.id);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function getLinhasDaTabela() {
    const linhasDaTabela = [];
    for (let i = 0; i < individuos.length; i++) {
      const individuo = individuos[i];
      linhasDaTabela[i] = getLinhaDaTabela(individuo);
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  //Função do conteúdo principal
  function getConteudo() {
    if (individuo == null) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novoIndividuo();
            }}
          >
            Novo indivíduo
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  return (
    <div className="cadastros">
      <div className="conteudo">{getConteudo()}</div>
    </div>
  );
}

export default Individuos;
