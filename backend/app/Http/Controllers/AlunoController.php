<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

use App\Models\Aluno;

class AlunoController extends Controller
{
    public function index(Request $request):LengthAwarePaginator {
        $itensPerPage = $request->query('itensPerPage', 5);
        $alunos = Aluno::orderBy('matricula')->paginate($itensPerPage);

        return $alunos;
    }

    public function store(Request $request):RedirectResponse {
        Aluno::create($request->all());

        return redirect('/api/alunos');
    }

    public function show($matricula):Aluno{
        $aluno = Aluno::findOrFail($matricula);
        return $aluno;
    }

    public function update($matricula, Request $request): RedirectResponse {
        $aluno = Aluno::findOrFail($matricula);
        $aluno->nome = $request->input('nome');
        $aluno->endereco = $request->input('endereco');
        $aluno->codigo_curso = $request->input('codigo_curso');
        $aluno->save();
        
        return redirect('/api/alunos');
    }

    public function destroy($matricula): RedirectResponse {
        $aluno = Aluno::findOrFail($matricula);
        $aluno->delete();
        
        return redirect('/api/alunos');
    }
}
