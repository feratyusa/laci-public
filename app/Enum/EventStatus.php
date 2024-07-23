<?php

namespace App\Enum;

enum EventStatus: string
{
    case PENDING = "PENDING";
    case ACCEPTED = "ACCEPTED";
    case REJECTED = "REJECTED";
}
