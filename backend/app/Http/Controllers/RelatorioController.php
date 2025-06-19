<?php

namespace App\Http\Controllers;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use App\Models\Aluno;
use App\Models\Curso;

class RelatorioController extends Controller
{
    public function contaAlunosPorCurso(Request $request):LengthAwarePaginator {
        $itensPerPage = $request->query('itensPerPage', 5);

        $quantidadeAlunosPorCurso = Aluno::join('cursos', 'alunos.codigo_curso', '=', 'cursos.codigo_curso')
        ->select('cursos.nome as curso', DB::raw('count(*) as total'))
        ->groupBy('cursos.nome')
        ->paginate($itensPerPage);

        return $quantidadeAlunosPorCurso;
    }

    public function listaAlunosPorCurso(Request $request):LengthAwarePaginator {
        $cursoDefault = Curso::orderBy('nome', 'asc')->first();

        $itensPerPage = $request->query('itensPerPage',5);
        $codigoCurso = $request->query('codigo', $cursoDefault->codigo_curso);

        $alunosPorCurso = Aluno::where('codigo_curso', $codigoCurso)
        ->with('curso')
        ->orderBy('nome', 'asc')
        ->paginate($itensPerPage);

        return $alunosPorCurso;
    }
}
