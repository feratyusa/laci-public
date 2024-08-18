<?php

namespace App\Trait;

use Illuminate\Database\Eloquent\Model;

trait InputHelpers
{
    public function selectOptions(Array $options, string $id, string $name, bool $enableIdOnLabel=true, array $additional=[])
    {        
        $selectOptions = [];
        foreach ($options as $option) {            
            if($enableIdOnLabel){
                $temp['value'] = $option[$id];
                $temp['label'] = "({$option[$id]}) {$option[$name]}";
            }
            else{
                $temp['value'] = $option[$id];
                $temp['label'] = "{$option[$name]}";   
            }
            
            if(count($additional) > 0){
                foreach ($additional as $value) {
                    $temp[$value] = $option[$value];
                }
            }

            $selectOptions[] = (object) $temp;
        }

        return $selectOptions;
    }
}
