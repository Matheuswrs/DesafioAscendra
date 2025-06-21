<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

use App\Models\Aluno;

class AlunoController extends Controller
{
    public function index(Request $request): LengthAwarePaginator
    {
        $itensPerPage = $request->query('itensPerPage', 5);
        $matricula = $request->query('matricula');
        $nome = $request->query('nome');
        $endereco = $request->query('endereco');
        $curso = $request->query('curso');

        $alunos = Aluno::when($matricula, function($query, $matricula) {
            return $query->where('matricula', 'like', '%'.$matricula.'%');
        })
        ->when($nome, function($query, $nome){
            return $query->where('nome','like','%'.$nome.'%');
        })
        ->when($endereco, function($query, $endereco){
            return $query->where('endereco','like','%'.$endereco.'%');
        })
        ->when($curso, function($query, $curso) {
            if(is_numeric($curso)) {
                return $query->where('codigo_curso', 'like', '%'.$curso.'%');
            } else {
                return $query->whereHas('curso',function($q) use ($curso) {
                    $q->where('nome','like', '%'.$curso.'%');
                });
            }
        })
        ->with('curso')
        ->orderBy('nome', 'asc')
        ->paginate($itensPerPage);

        return $alunos;
    }

    public function store(Request $request): RedirectResponse
    {
        Aluno::create($request->all());

        return redirect('/api/alunos');
    }

    public function show($matricula): Aluno
    {
        $aluno = Aluno::findOrFail($matricula);
        return $aluno;
    }

    public function update($matricula, Request $request): JsonResponse
    {
        $aluno = Aluno::findOrFail($matricula);
        $aluno->nome = $request->input('nome');
        $aluno->endereco = $request->input('endereco');
        $aluno->codigo_curso = $request->input('codigo_curso');
        $aluno->save();

        return response()->json([
            'message' => 'Aluno editado com sucesso!'
        ],200);
    }

    public function destroy($matricula): JsonResponse
    {
        $aluno = Aluno::findOrFail($matricula);
        $aluno->delete();

        return response()->json([
            'message'=> 'Aluno deletado com sucesso!'
        ],200);
    }
}
