<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $primaryKey = 'codigo_curso';
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nome',
    ];

    public function alunos()
    {
        return $this->hasMany(Aluno::class, 'codigo_curso', 'codigo_curso');
    }
}
