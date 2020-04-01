import React, { useState } from 'react';

import api from '../../services/api';

import './styles.css';

export default function Home() {
  const [nuvem, setNuvem] = useState(10);
  const [aeroporto, setAeroporto] = useState(10);
  const [colunas, setColunas] = useState(10);
  const [linhas, setLinhas] = useState(10);
  const [response, setDados] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.get(
      `/?nuvens=${nuvem}&aeroportos=${aeroporto}&colunas=${colunas}&linhas=${linhas}`
    );

    setDados({ ...response.data });
  }

  console.log('ESTOU AQUI',response)

  return (
    <>

      <div className="page-header text-center">
        <h2>NUVEM DE CINZAS</h2>
      </div>
      <div className="col-xs-6 pd-right-0">
              <div className="panel panel-primary">
                  
                  <div className="panel-body text-center extra-padding">
                      <span className="fa fa-cloud text-muted"></span><span className="mg-right-1"> Nuvem de Cinzas</span>
                      <span className="fa fa-sun-o mg-right-1 text-yellow"></span><span className="mg-right-1"> Céu Aberto</span>
                      <span className="fa fa-plane mg-right-1 text-primary"></span><span className="mg-right-1"> Aeroporto</span>
                      
                  </div>
              </div>
        </div>
      <div className="d-flex justify-content-center">
      <form  className="form-inline" onSubmit={handleSubmit}>
      <div className="form-group mg-right-1">
        <input
          type="number"
          placeholder="Quantidade de nuvens"
          className="form-control"
          title="Quantidade de nuvens"
          value={nuvem}
          onChange={(e) => setNuvem(e.target.value)}
        />
      </div>
      <div className="form-group mg-right-1">
        <input
          type="number"
          placeholder="Quantidade de aeroportos"
          className="form-control"
          title="Quantidade de aeroportos"
          value={aeroporto}
          onChange={(e) => setAeroporto(e.target.value)}
        />
      </div>
        
      <div className="form-group mg-right-1 text-center">
      
        <input
          type="number"
          placeholder="Quantidade de colunas"
          className="form-control"
          title="Quantidade de colunas"
          value={colunas}
          onChange={(e) => setColunas(e.target.value)}
        />

        <input
          className="form-control"
          type="number"
          placeholder="Quantidade de linhas"
          title="Quantidade de linhas"
          value={linhas}
          onChange={(e) => setLinhas(e.target.value)}
        />
      <button className="btn btn-primary" type="submit">CRIAR</button>
      </div>

        
      </form>
      </div>
      {response.mapa ? (
        <>
        
          <hr />
          <div className="d-flex justify-content-center">
          <p>
            Dias para o primeiro aeroporto ser coberto:
            <strong>{response.diasPrimeiroAeroporto}</strong>
          </p>
          <p>
            Dias para todos os aeroportos serem cobertos:
            <strong>{response.diasTodosAeroportos}</strong>
          </p>
          </div>
        </>
      ) : (
        <></>
      )}

      <hr />
      <div className="d-flex justify-content-center">
      <table>
        <tbody>
          {response.mapa ? (
            response.mapa.map((linha, indexLinha) => {
              const numberColumns = Object.keys(linha);
              const key = numberColumns + indexLinha;
              return (
                <tr key={key}>
                  {numberColumns.map((indexColuna) => {
                    const Columns = numberColumns + indexColuna;
                    return (
                     
                      <td key={Columns} >
                        { 
                       
                          <div className={response.mapa[indexLinha][indexColuna].tipo}></div>
                       
                        }
                      
                      </td>
                      
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
      </div>
    </>
  );
}