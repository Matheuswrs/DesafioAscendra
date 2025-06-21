<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AlunoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cursos = DB::table('cursos')->pluck('codigo_curso');

        for ($i = 1; $i <= 30; $i++) {
            DB::table('alunos')->insert([
                'nome' => 'Aluno ' . $i,
                'endereco' => 'Rua Exemplo ' . $i,
                'codigo_curso' => $cursos->random()
            ]);
        }
    }
}
