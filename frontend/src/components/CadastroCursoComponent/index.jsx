import React, { useEffect, useRef } from 'react'
import api from '../../services/api';

function CadastroCursoComponent({
    getCursos,
    updateCurso,
    clearUpdateCurso,
    getAllCursos,
    quantidadeItensPorPagina,
    dataFiltroCurso
 }) {
    const inputName = useRef();

    async function createCurso() {
        if(!inputName.current.value) {
            alert('O nome do curso é obrigatório.')
            return false;
        }
        try {
            if(updateCurso) {
                const resp = await api.put(`/curso/${updateCurso.codigo_curso}`, {
                    nome: inputName.current.value
                });
                
                alert(resp.data.message || 'Curso editado com sucesso!');
            } else {
                await api.post('/curso', {
                    nome: inputName.current.value
                });
                
                alert('Curso cadastrado com sucesso!');
            }

            inputName.current.value = '';

            getCursos(1, quantidadeItensPorPagina, dataFiltroCurso.codigoCurso, dataFiltroCurso.nomeCurso);
            getAllCursos();
            return true;
        } catch (error) {
            let msg = 'Ocorreu um erro inesperado.';
            if (error.response?.data?.errors?.nome?.length) {
                msg = "O nome escolhido já existe";
            }

            alert(msg);
            return false;
        }
    }

    useEffect(() => {
        if(updateCurso) {
        inputName.current.value = updateCurso.nome;
        } else {
        inputName.current.value = '';
        }
    }, [updateCurso]);
    

    return (
        <div className="modal fade" id="modalCadastroCurso" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalLabel">{updateCurso ? 'Atualizar Curso' : 'Cadastrar Curso'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar" />
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            name="nome"
                            className="form-control"
                            id="nomeCurso"
                            placeholder="Nome do Curso"
                            ref={inputName}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={clearUpdateCurso}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={async () => {
                                const sucesso = await createCurso();
                                if(sucesso) {
                                    document.getElementById('modalCadastroCurso').querySelector('.btn-close').click();
                                    clearUpdateCurso();
                                }
                            }}
                        >
                            {updateCurso ? 'Atualizar' : 'Salvar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastroCursoComponent
