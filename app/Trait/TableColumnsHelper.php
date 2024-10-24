<?php

namespace App\Trait;

use App\Models\EHC\Diklat;
use App\Models\EHC\Employee;

trait TableColumnsHelper
{
    public function getTableDiklatColumns(): array
    {
        $columns = collect(Diklat::first())->keys();
        $except = ['id', 'nip', 'nama', 'jabatan', 'cabang', 'created_at', 'updated_at'];
        $options = [];
        foreach ($columns as $value) {
            if(in_array($value, $except)) continue;
            $options[] = ['value' => $value];
        }
        return $options;
    }

    public function getTableEmployeeColumns(): array
    {
        $columns = collect(Employee::first())->keys();
        $except = ['created_at', 'updated_at'];
        $options = [];
        foreach ($columns as $value) {
            if(in_array($value, $except)) continue;
            $options[] = ['value' => $value];
        }
        return $options;
    }

    public function isDiklatColumnsValid(array $columns)
    {
        $validColumns = array_column($this->getTableDiklatColumns(), 'value');
        foreach($columns as $column){
            if(in_array($column, $validColumns) == false) return false;
        }
        return true;
    }

    public function isEmployeeColumnsValid(array $columns): bool
    {
        $validColumns = array_column($this->getTableEmployeeColumns(), 'value');
        foreach($columns as $column){
            if(in_array($column, $validColumns) == false) return false;
        }
        return true;
    }
}
