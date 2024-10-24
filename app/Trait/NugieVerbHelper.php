<?php

namespace App\Trait;

use App\Enum\Verbs;

trait NugieVerbHelper
{
    public function isVerbsValid(array $verbs){
        $validVerbs = array_column(Verbs::cases(), 'value');
        foreach($verbs as $verb){
            if(in_array($verb, $validVerbs) == false) return false;
        }
        return true;
    }

    public function generateParams(array $rule){
        $data = explode(";", $rule['parameter']);
        $param = '';

        if(strcmp(Verbs::IN->value, $rule['verb']) == 0 || strcmp(Verbs::NOT_IN->value, $rule['verb']) == 0){
            $bindParam = array_fill(0, count($data), "?");

            $param .= "(" . implode(",", $bindParam) . ")";               
        }
        else if(strcmp(Verbs::LIKE->value, $rule['verb']) == 0 
                || strcmp(Verbs::NOT_LIKE->value, $rule['verb']) == 0
                || strcmp(Verbs::MORE->value, $rule['verb']) == 0
                || strcmp(Verbs::LESS->value, $rule['verb']) == 0
            ){
            if(count($data) > 1) $data = [$data[0]];
            $param .= "?";
        }
        else if(strcmp(Verbs::BETWEEN->value, $rule['verb']) == 0){
            if(count($data) > 2) $data = [$data[0], $data[1]];
            else if(count($data) < 2) $data = [$data[0], '1949-09-09'];
            $param .= "? and ?";
        }
        else{
            return false;
        }

        return ['params' => $param, 'data' => $data];
    }
}