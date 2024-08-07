<?php

namespace Database\Seeders;

use App\Enum\FileCategory;
use App\Models\File\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fileCategories = FileCategory::selection();

        foreach ($fileCategories as $category) {
            Category::firstOrCreate(
                ['id' => $category->name],
                ['name' => $category->value],
            );
        }
    }
}
