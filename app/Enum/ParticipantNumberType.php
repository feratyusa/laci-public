<?php

namespace App\Enum;

enum ParticipantNumberType: string
{
    case FIXED = 'FIXED';
    case DYNAMIC = 'DYNAMIC';

    public static function selection(): array
    {
        $categories = array_column(self::cases(), 'value');
        $selection = [];
        foreach ($categories as $category) {
            $selection[] = (object)['label' => $category, 'value' => $category];
        }
        return $selection;
    }
}
