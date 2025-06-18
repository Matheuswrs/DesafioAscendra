<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

use App\Models\Curso;

class CursoController extends Controller
{
    public function index(Request $request):LengthAwarePaginator {
        $itensPerPage = $request->query('itensPerPage', 5);
        $cursos = Curso::orderBy('codigo_curso')->paginate($itensPerPage);

        return $cursos;
    }

    public function store(Request $request):RedirectResponse {
        Curso::create($request->all());

        return redirect('/api/cursos');
    }

    public function show($codigo):Curso{
        $curso = Curso::findOrFail($codigo);
        return $curso;
    }

    public function update($codigo, Request $request): RedirectResponse {
        $curso = Curso::findOrFail($codigo);
        $curso->nome = $request->input('nome');
        $curso->save();
        
        return redirect('/api/cursos');
    }

    public function destroy($codigo): RedirectResponse {
        $curso = Curso::findOrFail($codigo);
        $curso->delete();
        
        return redirect('/api/cursos');
    }
}
