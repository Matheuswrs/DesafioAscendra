import React, { useEffect, useState, useRef } from 'react'
import TableComponent from '../../components/TableComponent'
import CadastroCursoComponent from '../../components/CadastroCursoComponent'
import CadastroAlunoComponent from '../../components/CadastroAlunoComponent'
import api from '../../services/api'

const Home = () => {
  const selectQuantidadeItensPorPaginaCursos = useRef();
  const selectQuantidadeItensPorPaginaAlunos = useRef();
  const filtroCodigoCursoRef = useRef();
  const filtroNomeCursoRef = useRef();
  const filtroMatriculaAlunoRef = useRef();
  const filtroNomeAlunoRef = useRef();
  const filtroCursoAlunoRef = useRef();
  const filtroEnderecoAlunoRef = useRef();


  const [cursos, setCursos] = useState([]);
  const [currentPageCursos, setCurrentPageCursos] = useState(1);

  const [allCursos, setAllCursos] = useState([]);

  const [alunos, setAlunos] = useState([]);
  const [currentPageAlunos, setCurrentPageAlunos] = useState(1);

  const [quantidadeItensListaCurso, setQuantidadeItensListaCurso] = useState(5);
  const [codigoCursoFiltro, setCodigoCursoFiltro] = useState('');
  const [nomeCursoFiltro, setNomeCursoFiltro] = useState('');

  const [quantidadeItensListaAlunos, setQuantidadeItensListaAlunos] = useState(5);
  const [matriculaAlunoFiltro, setMatriculaAlunoFiltro] = useState('');
  const [nomeAlunoFiltro, setNomeAlunoFiltro] = useState('');
  const [cursoAlunoFiltro, setCursoAlunoFiltro] = useState('');
  const [enderecoAlunoFiltro, setEnderecoAlunoFiltro] = useState('');

  const listaQuantidadeItensPorPagina = [5, 10, 15];

  const [updateCurso, setUpdateCurso] = useState(null);
  const clearUpdateCurso = () => {
    setUpdateCurso(null);
  }

  const [updateAluno, setUpdateAluno] = useState(null);
  const clearUpdateAluno = () => {
    setUpdateAluno(null);
  }

  async function getCursos(page = 1, itensPorPagina = 5, codigoCurso = '', nomeCurso = '') {
    const resp = await api.get(
      `/cursos?page=${page}&itensPerPage=${itensPorPagina}&codigo=${codigoCurso}&nome=${nomeCurso}`
    );

    setCursos(resp.data);
    setCurrentPageCursos(page);
  };

  async function getAllCursos() {
    const resp = await api.get('/cursos/all');
    setAllCursos(resp.data);
  };

  async function getAlunos(
    page = 1,
    itensPorPagina = 5,
    matriculaAluno = '',
    nomeAluno = '',
    cursoAluno = '',
    enderecoAluno = ''
  ) {
    const resp = await api.get(
      `/alunos?page=${page}&itensPerPage=${itensPorPagina}&matricula=${matriculaAluno}&nome=${nomeAluno}&curso=${cursoAluno}&endereco=${enderecoAluno}`
    );

    setAlunos(resp.data);
    setCurrentPageAlunos(page);
  };

  async function handleDeleteCurso(codigoCurso) {
    try {
      const resp = await api.delete(`/curso/${codigoCurso}`);
      alert(resp.data.message);

      getCursos(
        Object.keys(cursos.data).length == 1 ? currentPageCursos - 1 : currentPageCursos,
        quantidadeItensListaCurso,
        codigoCursoFiltro,
        nomeCursoFiltro
      );

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Ocorreu um erro inesperado ao tentar excluir o curso.");
      }

    }
  }

  async function handleDeleteAluno(matricula) {
    try {
      const resp = await api.delete(`/aluno/${matricula}`);
      alert(resp.data.message);

      getAlunos(
        Object.keys(alunos.data).length == 1 ? currentPageAlunos - 1 : currentPageAlunos,
        quantidadeItensListaAlunos,
        matriculaAlunoFiltro,
        nomeAlunoFiltro,
        cursoAlunoFiltro,
        enderecoAlunoFiltro
      );
    } catch (error) {
      alert("Ocorreu um erro inesperado ao tentar excluir o aluno.");
    }

  }

  useEffect(() => {
    getCursos();
    getAllCursos();
    getAlunos();
  }, []);

  const handlePageChangeCursos = (page) => {
    if (page !== currentPageCursos) {
      getCursos(page, quantidadeItensListaCurso, codigoCursoFiltro, nomeCursoFiltro);
    }
  }

  const handlePageChangeAlunos = (page) => {
    if (page !== currentPageAlunos) {
      getAlunos(
        page,
        quantidadeItensListaAlunos,
        matriculaAlunoFiltro,
        nomeAlunoFiltro,
        cursoAlunoFiltro,
        enderecoAlunoFiltro
      );
    }
  }

  const handleChangePageSizeCursos = () => {
    const quantidade = selectQuantidadeItensPorPaginaCursos.current.value;
    setQuantidadeItensListaCurso(quantidade);
    setCurrentPageCursos(1);

    getCursos(1, quantidade, codigoCursoFiltro, nomeCursoFiltro);
  }

  const handleChangePageSizeAlunos = () => {
    const quantidade = selectQuantidadeItensPorPaginaAlunos.current.value;
    setQuantidadeItensListaAlunos(quantidade);
    setCurrentPageAlunos(1);

    getAlunos(
      1,
      quantidade,
      matriculaAlunoFiltro,
      nomeAlunoFiltro,
      cursoAlunoFiltro,
      enderecoAlunoFiltro
    );
  }

  const handleChangeFiltroCurso = () => {
    const codigoCurso = filtroCodigoCursoRef.current.value;
    const nomeCurso = filtroNomeCursoRef.current.value;

    setCodigoCursoFiltro(codigoCurso);
    setNomeCursoFiltro(nomeCurso);
    setCurrentPageCursos(1);

    getCursos(1, quantidadeItensListaCurso, codigoCurso, nomeCurso);
  }

  const handleChangeFiltroAlunos = () => {
    const matricula = filtroMatriculaAlunoRef.current.value;
    const nomeAluno = filtroNomeAlunoRef.current.value;
    const cursoAluno = filtroCursoAlunoRef.current.value;
    const enderecoAluno = filtroEnderecoAlunoRef.current.value;

    setMatriculaAlunoFiltro(matricula);
    setNomeAlunoFiltro(nomeAluno);
    setCursoAlunoFiltro(cursoAluno);
    setEnderecoAlunoFiltro(enderecoAluno);
    setCurrentPageAlunos(1);

    getAlunos(
      1,
      quantidadeItensListaAlunos,
      matricula,
      nomeAluno,
      cursoAluno,
      enderecoAluno
    );
  }

  const handleChangeLimpaFiltrosCurso = () => {
    setCodigoCursoFiltro('');
    setNomeCursoFiltro('');
    filtroCodigoCursoRef.current.value = '';
    filtroNomeCursoRef.current.value = '';

    getCursos(
      1,
      quantidadeItensListaCurso
    );
  }

  const handleChangeLimpaFiltrosAlunos = () => {
    setMatriculaAlunoFiltro('');
    setNomeAlunoFiltro('');
    setCursoAlunoFiltro('');
    setEnderecoAlunoFiltro('');

    filtroMatriculaAlunoRef.current.value = '';
    filtroNomeAlunoRef.current.value = '';
    filtroCursoAlunoRef.current.value = '';
    filtroEnderecoAlunoRef.current.value = '';

    getAlunos(
      1,
      quantidadeItensListaAlunos
    );

  }

  const dataFiltroCurso = {
    'codigoCurso': codigoCursoFiltro,
    'nomeCurso': nomeCursoFiltro
  }

  const dataFiltroAluno = {
    'matricula': matriculaAlunoFiltro,
    'nome': nomeAlunoFiltro,
    'curso': cursoAlunoFiltro,
    'endereco': enderecoAlunoFiltro
  }

  return (
    <>
      <div>
        <h1>Lista de Cursos</h1>
        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
          <button
            type='button'
            className='btn btn-success'
            data-bs-toggle='modal'
            data-bs-target='#modalCadastroCurso'
          >
            <i className='bi bi-plus-lg'/> Curso
          </button>
        </div>
        <div className="row mt-3 align-items-end">
          <div className="col-md-10">
            <div className="row g-2">
              <div className="col-sm-6 col-md-2">
                <select
                  name="itensPorPaginaCursos"
                  id="itensPorPaginaCursos"
                  className="form-select"
                  value={quantidadeItensListaCurso}
                  onChange={handleChangePageSizeCursos}
                  ref={selectQuantidadeItensPorPaginaCursos}
                >
                  {listaQuantidadeItensPorPagina.map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6 col-md-4">
                <input
                  type="number"
                  name="codigoCursoFiltro"
                  id="codigoCursoFiltro"
                  value={codigoCursoFiltro}
                  ref={filtroCodigoCursoRef}
                  onChange={handleChangeFiltroCurso}
                  placeholder='Código do Curso'
                  className='form-control'
                />
              </div>
              <div className="col-sm-6 col-md-6">
                <input
                  type="text"
                  name="nomeCursoFiltro"
                  id="nomeCursoFiltro"
                  value={nomeCursoFiltro}
                  ref={filtroNomeCursoRef}
                  onChange={handleChangeFiltroCurso}
                  placeholder='Nome do Curso'
                  className='form-control'
                />
              </div>
            </div>
          </div>
          <div className="col-md-2 mt-2 mt-md-0">
            <button
              type="button"
              className='btn btn-outline-secondary w-100'
              onClick={handleChangeLimpaFiltrosCurso}
            >
              Limpar Filtros
            </button>
          </div>
        </div>
        <CadastroCursoComponent
          getCursos={getCursos}
          updateCurso={updateCurso}
          clearUpdateCurso={clearUpdateCurso}
          getAllCursos={getAllCursos}
          quantidadeItensPorPagina={quantidadeItensListaCurso}
          dataFiltroCurso={dataFiltroCurso}
        />
        <TableComponent
          data={cursos}
          columns={['codigo_curso', 'nome', 'acoes']}
          columnsLabel={{
            'codigo_curso': 'Código do Curso',
            'nome': 'Nome',
            'acoes': 'Ações'
          }}
          customRender={{
            acoes: (curso) => (
              <div className='d-flex gap-2'>
                <button
                  className="btn btn-sm btn-primary bi bi-pencil-square"
                  data-bs-toggle='modal'
                  data-bs-target='#modalCadastroCurso'
                  onClick={() => setUpdateCurso(curso)
                  }
                />
                <button
                  className="btn btn-sm btn-danger bi bi-trash"
                  onClick={() => handleDeleteCurso(curso.codigo_curso)}
                />
              </div>
            )
          }}
          onPageChange={handlePageChangeCursos}
        />
        <hr />
        <h1>Lista de Alunos</h1>
        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
          <button
            type='button'
            className='btn btn-success'
            data-bs-toggle='modal'
            data-bs-target='#modalCadastroAluno'
          >
            <i className='bi bi-plus-lg' /> Aluno
          </button>
        </div>
        <div className="row mt-3 align-items-end">
          <div className="col-md-10">
            <div className="row g-2">
              <div className="col-sm-6 col-md-2">
                <select
                  name="itensPorPaginaAlunos"
                  id="itensPorPaginaAlunos"
                  className="form-select"
                  value={quantidadeItensListaAlunos}
                  onChange={handleChangePageSizeAlunos}
                  ref={selectQuantidadeItensPorPaginaAlunos}
                >
                  {listaQuantidadeItensPorPagina.map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6 col-md-2">
                <input
                  type="number"
                  name="matriculaAlunoFiltro"
                  id="matriculaAlunoFiltro"
                  value={matriculaAlunoFiltro}
                  ref={filtroMatriculaAlunoRef}
                  onChange={handleChangeFiltroAlunos}
                  placeholder='Matrícula'
                  className='form-control'
                />
              </div>
              <div className="col-sm-6 col-md-2">
                <input
                  type="text"
                  name="nomeAlunoFiltro"
                  id="nomeAlunoFiltro"
                  value={nomeAlunoFiltro}
                  ref={filtroNomeAlunoRef}
                  onChange={handleChangeFiltroAlunos}
                  placeholder='Nome'
                  className='form-control'
                />
              </div>
              <div className="col-sm-6 col-md-2">
                <input
                  type="text"
                  name="cursoAlunoFiltro"
                  id="cursoAlunoFiltro"
                  value={cursoAlunoFiltro}
                  ref={filtroCursoAlunoRef}
                  onChange={handleChangeFiltroAlunos}
                  placeholder='Curso'
                  className='form-control'
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <input
                  type="text"
                  name="enderecoAlunoFiltro"
                  id="enderecoAlunoFiltro"
                  value={enderecoAlunoFiltro}
                  ref={filtroEnderecoAlunoRef}
                  onChange={handleChangeFiltroAlunos}
                  placeholder='Endereço'
                  className='form-control'
                />
              </div>
            </div>
          </div>
          <div className="col-md-2 mt-2 mt-md-0">
            <button
              type="button"
              className='btn btn-outline-secondary w-100'
              onClick={handleChangeLimpaFiltrosAlunos}
            >
              Limpar Filtros
            </button>
          </div>
        </div>
        <CadastroAlunoComponent
          getAlunos={getAlunos}
          updateAluno={updateAluno}
          clearUpdateAluno={clearUpdateAluno}
          allCursos={allCursos}
          quantidadeItensPorPagina={quantidadeItensListaAlunos}
          dataFiltroAluno={dataFiltroAluno}
        />
        <TableComponent
          data={alunos}
          columns={['matricula', 'nome', 'curso', 'endereco', 'acoes']}
          columnsLabel={{
            'matricula': 'Matrícula',
            'nome': 'Nome',
            'curso': 'Curso',
            'endereco': 'Endereço',
            'acoes': 'Ações'
          }}
          customRender={{
            curso: (aluno) => aluno.curso?.nome ?? '-',
            acoes: (aluno) => (
              <div className='d-flex gap-2'>
                <button
                  className="btn btn-sm btn-primary bi bi-pencil-square"
                  data-bs-toggle='modal'
                  data-bs-target='#modalCadastroAluno'
                  onClick={() => setUpdateAluno(aluno)}
                />
                <button
                  className="btn btn-sm btn-danger bi bi-trash"
                  onClick={() => handleDeleteAluno(aluno.matricula)}
                />
              </div>
            )
          }}
          onPageChange={handlePageChangeAlunos}
        />
      </div>
    </>
  )
}

export default Home
