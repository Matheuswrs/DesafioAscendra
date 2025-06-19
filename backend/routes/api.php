<?php

use App\Http\Controllers\RelatorioController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CursoController;
use App\Http\Controllers\AlunoController;

Route::controller(CursoController::class)->group(function () {

    Route::get('/cursos', 'index')->name('cursos.index');
    Route::post('/curso', 'store')->name('cursos.store');
    Route::get('/curso/{codigo}','show')->name('cursos.show');
    Route::put('/curso/{codigo}','update')->name('cursos.update');
    Route::delete('/curso/{codigo}','destroy')->name('cursos.destroy');
});

Route::controller(AlunoController::class)->group(function () {
    Route::get('/alunos','index')->name('alunos.index');
    Route::post('/aluno','store')->name('aluno.store');
    Route::get('/aluno/{matricula}','show')->name('aluno.show');
    Route::put('/aluno/{matricula}','update')->name('aluno.update');
    Route::delete('/aluno/{matricula}','destroy')->name('aluno.destroy');
});

Route::controller(RelatorioController::class)->group(function () {
    Route::get('/contaAlunosPorCurso','contaAlunosPorCurso')->name('relatorios.contaAlunosPorCurso');
    Route::get('/listaAlunosPorCurso', 'listaAlunosPorCurso')->name('relatorios.listaAlunosPorCurso');
});
