<?php

namespace App\Trait;

use App\Models\File\MandatoryFileCategory;
use App\Models\Proposal\Proposal;

trait MissingCategory
{
    /**
     * Summary of getMissingCategory
     * @param \App\Models\Proposal\Proposal $proposal
     * @param mixed $files
     * @return object[]
     */
    public function getMissingCategory(Proposal $proposal, $files)
    {
        $categories = [];
        foreach ($files as $file) {
            $categories[] = $file->category->id;
        }

        $mandatories = MandatoryFileCategory::where('event_category', '=', $proposal->event_category)->get();
        $missing = [];
        foreach ($mandatories as $mandatory) {
            if(! in_array($mandatory->category->id, $categories)) $missing[] = (object)['id' => $mandatory->category->id, 'name' => $mandatory->category->name];
        }
        
        return $missing;
    }
}
