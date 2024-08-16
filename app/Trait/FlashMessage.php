<?php

namespace App\Trait;

trait FlashMessage
{
    /**
     * Flash message handler
     * 
     * @param string $message
     * @param string $status
     * @return string[]
     */
    public function flashmessage(String $message, String $status)
    {
        return ['message' => $message, 'status' => $status];
    }
}
