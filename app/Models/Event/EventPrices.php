<?php

namespace App\Models\Event;

use App\Models\Master\BudgetType;
use Database\Factories\EventPricesFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventPrices extends Model
{
    use HasFactory;
    protected $table = 'event_prices';
    protected $fillable = [
        'event_id',
        'budget_type_id',
        'price',
        'participantNum',
        'defaultParticipants',
    ];

    protected $with = ['budgetType'];

    protected $touches = ['event'];
    
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id', 'id');
    }

    public function budgetType(): BelongsTo
    {
        return $this->belongsTo(BudgetType::class, 'budget_type_id', 'id');
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): Factory
    {
        return EventPricesFactory::new();
    }
}
