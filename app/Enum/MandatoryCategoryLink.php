<?php

namespace App\Enum;

enum MandatoryCategoryLink: string
{
    case PT = 'Public Training';
    case IHT = 'In House Training';
    case USULAN = 'Usulan';

    /**
     * Get enum value by passing enum name
     * 
     * @param string $name
     * @return string
     */
    public static function fromName(string $name): string
    {
        foreach (self::cases() as $status) {
            if( $name === $status->name ){
                return $status->value;
            }
        }
        return null;
    }
}
