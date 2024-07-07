<?php

namespace App\Models\Event;

use App\Models\File\File;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventFile extends Model
{
    use HasFactory;

    /**
     * Connection init
     */
    protected $connection = 'dev';

    /**
     * Table init
     */
    protected $table = 'event_files';

    /**
     * Fillable
     */
    protected $fillable = [
        'file_category',
    ];

    /**
     * Relationships
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id', 'id');
    }
    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class, 'file_id', 'id');
    }
}
