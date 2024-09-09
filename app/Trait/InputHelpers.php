<?php

namespace App\Trait;

use App\Models\File\MandatoryFileCategory;
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

    public function mandatoriesOptions(Array $mandatories){
        $mandatoriesArray = [];
        foreach($mandatories as $m){
            $mandatoriesArray[] = (object)['id' => $m['category']['id'], 'name' => $m['category']['name']];
        }

        return $mandatoriesArray;
    }
}
