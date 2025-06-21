<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Validation\ValidationException;

use App\Models\Curso;

class CursoController extends Controller
{
    public function index(Request $request):LengthAwarePaginator
    {
        $itensPerPage = $request->query('itensPerPage', 5);
        $codigoCurso = $request->query('codigo');
        $nome = $request->query('nome');

        $cursos = Curso::when($codigoCurso, function($query, $codigoCurso) {
            return $query->where('codigo_curso', 'like', '%'.$codigoCurso.'%');
        })
        ->when($nome, function($query, $nome) {
            return $query->where('nome', 'like', '%'.$nome.'%');
        })
        ->orderBy('nome', 'asc')
        ->paginate($itensPerPage);

        return $cursos;
    }

    public function allCursos(Request $request): Collection
    {
        $nome = $request->query('nome');
        
        $cursos = Curso::when($nome, function($query, $nome) {
            return $query->where('nome', 'like','%'.$nome.'%');
        })
        ->orderBy('nome', 'asc')
        ->get();

        return $cursos;
    }

    public function store(Request $request):JsonResponse
    {
        $validated = $request->validate([
            'nome' => 'required|unique:cursos,nome',
        ]);

        Curso::create($validated);

        return response()->json([
            'message' => 'Curso cadastrado com sucesso!'
        ], 201);
    }

    public function show($codigo):Curso
    {
        $curso = Curso::findOrFail($codigo);
        return $curso;
    }

    public function update($codigo, Request $request): JsonResponse
    {

        $curso = Curso::findOrFail($codigo);
        
        $validated = $request->validate([
            'nome' => 'required|unique:cursos,nome,' . $codigo . ',codigo_curso',
        ]);

        $curso->update($validated);
        
        return response()->json([
            'message' => 'Curso editado com sucesso!'
        ],200);
    }

    public function destroy($codigo): JsonResponse
    {
        $curso = Curso::withCount('alunos')->findOrFail($codigo);

        if($curso->alunos_count > 0) {
            return response()->json([
                'message'=> 'Não foi possível excluir o curso, pois possui alunos vinculados a ele'
            ], 400);
        }
        
        $curso->delete();

        return response()->json([
            'message'=> 'Curso deletado com sucesso!'
        ], 200);
    }
}
