import React, { useState, useEffect, useRef } from 'react'
import api from '../../services/api'
import TableComponent from '../../components/TableComponent'

function Relatorio() {
    const selectCursoRelatorio = useRef();
    const selectQuantidadeItensCount = useRef();
    const selectQuantidadeItensRelatorioLista = useRef();

    const [listaCountAlunosPorCurso, setListaCountAlunosPorCurso] = useState([]);
    const [currentPageListaCount, setCurrentPageListaCount] = useState([]);

    const [listaAlunosPorCurso, setListaAlunosPorCurso] = useState([]);
    const [currentPageListaAlunosPorCurso, setCurrentPageListaAlunosPorCurso] = useState([]);

    const [allCursos, setAllCursos] = useState([]);

    const [cursoSelecionado, setCursoSelecionado] = useState('');
    const [quantidadeItensCount, setQuantidadeItensCount] = useState(5);
    const [quantidadeItensLista, setQuantidadeItensLista] = useState(5);
    
    const listaItensPorPagina = [5, 10, 15];

    async function getAllCursos() {
        const resp = await api.get('/cursos/all');
        setAllCursos(resp.data);

        if(resp.data.length > 0) {
            const codigoPrimeiroCurso = resp.data[0].codigo_curso;
            setCursoSelecionado(codigoPrimeiroCurso);

            getListaAlunosPorCurso(1, codigoPrimeiroCurso, 5);
        }
    }

    async function getListaCountAlunosPorCurso(page = 1, itensPorPagina = 5) {
        const resp = await api.get(`/contaAlunosPorCurso?page=${page}&itensPerPage=${itensPorPagina}`);

        setListaCountAlunosPorCurso(resp.data);
        setCurrentPageListaCount(page);
    }

    async function getListaAlunosPorCurso(page = 1, codigo, itensPorPagina) {
        const resp = await api.get(`/listaAlunosPorCurso?page=${page}&codigo=${codigo}&itensPerPage=${itensPorPagina}`);

        setListaAlunosPorCurso(resp.data);
        setCurrentPageListaAlunosPorCurso(page);
    }

    useEffect(() => {
        getAllCursos();
        getListaCountAlunosPorCurso();
        getListaAlunosPorCurso();
    }, []);

    const handlePageChangeCountAlunosPorCurso = (page) => {
        if(page !== currentPageListaCount) {
            getListaCountAlunosPorCurso(page);
        }
    }

    const handlePageChangeListaAlunosPorCurso = (page) => {
        if(page !== currentPageListaAlunosPorCurso) {
            getListaAlunosPorCurso(page);
        }
    }

    const handleFilterListaAlunosPorCurso = () => {
        const codigoCurso = selectCursoRelatorio.current.value;
        setCursoSelecionado(codigoCurso);

        setCurrentPageListaAlunosPorCurso(1);
        getListaAlunosPorCurso(currentPageListaAlunosPorCurso, codigoCurso, quantidadeItensLista);
    }

    const handleChangePageSizeListaCountAlunos = () => {
        const quantidade = selectQuantidadeItensCount.current.value;
        setQuantidadeItensCount(quantidade);
        setCurrentPageListaCount(1);

        getListaCountAlunosPorCurso(currentPageListaCount, quantidade);
    }

    const handleChangePageSizeListaAlunos = () => {
        const quantidade = selectQuantidadeItensRelatorioLista.current.value;
        setQuantidadeItensLista(quantidade);
        setCurrentPageListaAlunosPorCurso(1);

        getListaAlunosPorCurso(currentPageListaAlunosPorCurso, cursoSelecionado, quantidade);
    }
    
  return (
    <div>
        <div>
            <h1>Lista quantidade de alunos por curso</h1>
            <div className='d-flex gap-2 mt-3'>
                <select
                    name="itensPorPaginaQuantidade"
                    id="itensPorPaginaQuantidade"
                    className="form-select mt-3 w-auto"
                    value={quantidadeItensCount}
                    ref={selectQuantidadeItensCount}
                    onChange={handleChangePageSizeListaCountAlunos}
                >
                    {listaItensPorPagina.map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            <TableComponent 
                data={listaCountAlunosPorCurso}
                columns={['codigo_curso','curso', 'total']}
                columnsLabel={{
                    'codigo_curso': 'Código do Curso',
                    'curso': 'Curso',
                    'total': 'Total de Alunos'
                }}
                onPageChange={handlePageChangeCountAlunosPorCurso}
            />
        </div>
        <hr />
        <div>
            <h1>Lista de alunos por curso</h1>
            <div className='d-flex gap-2 mt-3'>
                <select
                    name="itensPorPaginaLista"
                    id="itensPorPaginaLista"
                    className="form-select mt-3 w-auto"
                    value={quantidadeItensLista}
                    ref={selectQuantidadeItensRelatorioLista}
                    onChange={handleChangePageSizeListaAlunos}
                >
                    {listaItensPorPagina.map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
                <select
                    name="cursoRelatorio"
                    id="selectCursoRelatorio"
                    className="form-select mt-3 w-auto"
                    value={cursoSelecionado}
                    ref={selectCursoRelatorio}
                    onChange={handleFilterListaAlunosPorCurso}
                >
                    {allCursos.map((curso, index) => (
                        <option key={index} value={curso.codigo_curso}>{curso.nome}</option>
                    ))}
                </select>
            </div>
            <div className='mt-3'>
                <TableComponent 
                    data={listaAlunosPorCurso}
                    columns={['matricula', 'nome', 'curso', 'endereco']}
                    columnsLabel={{
                        'matricula': 'Matrícula',
                        'nome': 'Nome',
                        'curso': 'Curso',
                        'endereco': 'Endereço'
                    }}
                    customRender={{
                        curso: (aluno) => aluno.curso?.nome ?? '-',
                    }}
                    onPageChange={handlePageChangeListaAlunosPorCurso}
                />
            </div>
        </div>
    </div>
  )
}

export default Relatorio
