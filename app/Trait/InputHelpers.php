<?php

namespace App\Trait;

use Illuminate\Database\Eloquent\Model;

trait InputHelpers
{
    public function selectOptions(Model $model, string $id, string $name, bool $enableIdOnLabel=true)
    {
        $options = $model->all();
        $selectOptions = [];
        foreach ($options as $option) {
            if($enableIdOnLabel) $selectOptions[] = (object)['value' => $option[$id], 'label' => "({$option[$id]}) {$option[$name]}"];
            else $selectOptions[] = (object)['value' => $option[$id], 'label' => "{$option[$name]}"];
        }

        return $selectOptions;
    }
}
