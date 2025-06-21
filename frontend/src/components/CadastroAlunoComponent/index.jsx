import React, { useEffect, useRef } from 'react'
import api from '../../services/api';

function CadastroAlunoComponent({
    getAlunos,
    updateAluno,
    clearUpdateAluno,
    allCursos,
    quantidadeItensPorPagina,
    dataFiltroAluno
}) {
    const inputName = useRef();
    const inputEndereco = useRef();
    const inputCurso = useRef();

    async function createAluno() {
        const nome = inputName.current.value;
        const endereco = inputEndereco.current.value;
        const curso = inputCurso.current.value;

        if(!nome || !endereco || !curso) {
            alert('Preencha todos os campos antes de salvar');
            return false;
        }

        try {
            if(updateAluno) {
                    const resp = await api.put(`/aluno/${updateAluno.matricula}`, {
                        nome: nome,
                        endereco: endereco,
                        codigo_curso: curso
                    });

                    alert(resp.data.message);
            
            } else {
                    await api.post('/aluno', {
                        nome: nome,
                        endereco: endereco,
                        codigo_curso: curso
                    });
                    alert('Aluno cadastrado com sucesso!');
            }
            
            inputName.current.value = '';
            inputEndereco.current.value = '';
            inputCurso.current.value = '';

            getAlunos(
                1,
                quantidadeItensPorPagina,
                dataFiltroAluno.matricula,
                dataFiltroAluno.nome,
                dataFiltroAluno.curso,
                dataFiltroAluno.endereco
            );
            return true
        } catch(error) {
            alert('Ocorreu um erro inesperado.');
            return false;
        }
    }

    useEffect(() => {
      if(updateAluno) {
        inputName.current.value = updateAluno.nome;
        inputEndereco.current.value = updateAluno.endereco;
        inputCurso.current.value = updateAluno.codigo_curso;
      } else {
        inputName.current.value = '';
        inputEndereco.current.value = '';
        inputCurso.current.value = '';
      }
    }, [updateAluno])
    

    return (
        <div className="modal fade" id="modalCadastroAluno" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalLabel">{updateAluno ? 'Atualizar Aluno' : 'Cadastrar Aluno'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar" />
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            name="nome"
                            className="form-control"
                            id="nomeAluno"
                            placeholder="Nome do Aluno"
                            ref={inputName}
                        />

                        <input
                            type="text"
                            name="endereco"
                            id="endereco"
                            className="form-control mt-3"
                            placeholder="Endereço"
                            ref={inputEndereco}
                        />

                        <select name="curso" id="selectCurso" className="form-select mt-3" defaultValue='' ref={inputCurso}>
                            <option disabled value=''>Selecione o curso</option>
                            {allCursos.map((curso, index) => (
                                <option key={index} value={curso.codigo_curso}>{curso.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={clearUpdateAluno}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={async () => {
                                const sucesso = await createAluno();
                                if(sucesso) {
                                    document.getElementById('modalCadastroAluno').querySelector('.btn-close').click();
                                    clearUpdateAluno();
                                }
                            }}
                        >
                            {updateAluno ? 'Atualizar' : 'Salvar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastroAlunoComponent
