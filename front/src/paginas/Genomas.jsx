import "./componentes.css";
import axios from "axios";
import Select from "react-select";
import { useState, useEffect } from "react";

function Genomas() {
  //Entidades e listas utilizadas na página
  const [genoma, setGenoma] = useState(null);
  const [genomas, setGenomas] = useState([]);

  //Funções de carregamento de dados do backend
  function getGenomas() {
    axios.get("http://localhost:5218/genomas").then((resposta) => {
      setGenomas(resposta.data);
    });
  }

  useEffect(() => {
    getGenomas();
  }, []);

  //Funções para manipulação da entidade principal
  function novoGenoma() {
    setGenoma({
      id: 0,
      individuo: "",
      sequencia: "",
    });
  }

  function reiniciarEstadoDosObjetos() {
    setGenoma(null);
    getGenomas();
  }

  function editarGenoma(genoma) {
    setGenoma(genoma);
  }

  function alterarGenoma(campo, valor, idp) {
    genoma[campo] = valor;
    setGenoma({
      ...genoma,
    });
  }

  function excluirGenoma(id) {
    axios.delete("http://localhost:5218/genomas/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarGenoma() {
    if (genoma.id) {
      axios
        .put("http://localhost:5218/genomas/" + genoma.id, genoma)
        .then(() => {
          reiniciarEstadoDosObjetos();
        });
    } else {
      console.log(genoma);
      axios.post("http://localhost:5218/genomas", genoma).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  //Função para geração do formulário
  function getFormulario() {
    return (
      <form>
        <label>Indivíduo</label>
        <input
          type="text"
          name="individuo"
          value={genoma.individuo}
          onChange={(e) => {
            alterarGenoma(e.target.name, e.target.value, genoma.id);
          }}
        />
        <label>Sequência</label>
        <input
          type="text"
          name="sequencia"
          value={genoma.sequencia}
          onChange={(e) => {
            alterarGenoma(e.target.name, e.target.value, genoma.id);
          }}
        />
        <button
          type="button"
          onClick={() => {
            salvarGenoma();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => {
            setGenoma(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  //Funções para geração da tabela
  function getLinhaDaTabela(genoma) {
    return (
      <tr key={genoma.id}>
        <td>{genoma.id}</td>
        <td>{genoma.individuo}</td>
        <td>{genoma.sequencia}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão de genoma do indivíduo " +
                    genoma.individuo +
                    "?"
                )
              ) {
                excluirGenoma(genoma.id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              editarGenoma(genoma);
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
    for (let i = 0; i < genomas.length; i++) {
      const genoma = genomas[i];
      linhasDaTabela[i] = getLinhaDaTabela(genoma);
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Indivíduo</th>
            <th>Sequência</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  //Função do conteúdo principal
  function getConteudo() {
    if (genoma == null) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novoGenoma();
            }}
          >
            Nova sequência
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

export default Genomas;
