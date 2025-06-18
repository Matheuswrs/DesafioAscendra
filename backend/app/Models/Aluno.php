<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Aluno extends Model
{
    protected $primaryKey = 'matricula';
    
    protected $fillable = [
        'nome',
        'endereco',
        'codigo_curso',
    ];
    /**
     * Get the post that owns the comment.
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Curso::class, 'codigo_curso');
    }
}
