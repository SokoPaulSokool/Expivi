<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class InfoModel
 * @package App\Models
 *
 * @mixin Builder
 *
 * @property-read integer $id
 * @property-read User $user
 * @property string $slug
 * @property string $name
 * @property string $category
 * @property string $license
 * @property string $avatar
 * @property integer $vertices
 * @property integer $downloads
 * @property string $description
 */
class InfoModel extends Model
{
    use HasFactory;

    protected $table = 'info';

    protected $fillable = [
        'name',
        'slug',
        'avatar',
        'category',
        'vertices',
        'license',
        'downloads',
        'description',
    ];

    public $timestamps = false;

    /**
     * @return BelongsTo&User
     */
    public function user(): BelongsTo|User
    {
        return $this->belongsTo(User::class);
    }
}
