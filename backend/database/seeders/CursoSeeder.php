<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cursos')->insert([
            ['nome' => 'Administração'],
            ['nome'=> 'Ciências Econômicas'],
            ['nome'=> 'Design de Interiores'], 
            ['nome'=> 'Agronomia'],
            ['nome'=> 'Direito'],
            ['nome'=> 'Estatística'],
            ['nome'=> 'Música'],
            ['nome'=> 'Psicologia'],
            ['nome'=> 'Geologia'],
            ['nome'=> 'Jornalismo'],
            ['nome'=> 'Letras'],
            ['nome'=> 'Gastronomia'],
            ['nome'=> 'Fonoaudiologia'],
            ['nome'=> 'Física'],
            ['nome'=> 'História'],
            ['nome'=> 'Logística'],
            ['nome'=> 'Engenharia Química'],
            ['nome'=> 'Serviço Social']
        ]);
    }
}
