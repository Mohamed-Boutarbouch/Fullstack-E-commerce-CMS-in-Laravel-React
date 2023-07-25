<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Image extends Model
{
    use HasFactory, HasUuids;

    protected $casts = [
        'id' => 'string',
    ];

    protected $fillable = [
        'product_id', 'url'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
