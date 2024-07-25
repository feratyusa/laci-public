<?php

namespace App\Enum;

enum EventCategory: string
{
    case IHT = "In House Training";
    case PT = "Public Training";

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
