<?php

namespace App;

enum EventStatus: string
{
    const PENDING = "PENDING";
    const ACCEPTED = "ACCEPTED";
    const REJECTED = "REJECTED";
}
