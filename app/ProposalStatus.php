<?php

namespace App;

enum ProposalStatus: string
{
    const PENDING = 'PENDING';
    const ACCEPTED = 'ACCEPTED';
    const REJECTED = 'REJECTED';
}
