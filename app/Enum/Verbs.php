<?php

namespace App\Enum;

enum Verbs: string
{
    case IN = 'in';
    case NOT_IN = 'not in';
    case LIKE = 'like';
    case NOT_LIKE = 'not like';
    case BETWEEN = 'between';
    case MORE = '>';
    case LESS = '<';

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
