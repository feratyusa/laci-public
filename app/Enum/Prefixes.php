<?php

namespace App\Enum;

enum Prefixes: string
{
    case AND = 'and';
    case OR = 'or';
    case NULL = 'null';

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