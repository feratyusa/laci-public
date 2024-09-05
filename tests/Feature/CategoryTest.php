<?php

namespace Tests\Feature;

use App\Enum\EventCategory;
use App\Models\File\Category;
use App\Models\File\MandatoryFileCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Feature\Helpers\BaseData;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_user_can_create_category(): void
    {
        $base = new BaseData();

        $response = $this->actingAs($base->user)->post('/master/categories', [
            'id' => 'SK',
            'name' => 'SURAT KEPUTUSAN'
        ]);

        $response->assertRedirect(route('category.index'));

        $this->assertDatabaseCount('categories', 1);
    }

    public function test_user_can_edit_category(): void
    {
        $base = new BaseData();
        
        Category::create([
            'id' => 'BAN',
            'name' => 'BERITA ACARA NEGOSIASI'
        ]);

        $response = $this->actingAs($base->user)->put("/master/categories/SK", [
            'id' => 'SKK',
            'name' => 'SURAT KELUARAN KERJA'
        ]);

        $response->assertRedirect(route('category.index'));

        $this->assertDatabaseCount('categories', 2)
            ->assertDatabaseMissing('categories', ['id' => 'SK']);

        $response = $this->actingAs($base->user)->put("/master/categories/SKK", [
            'id' => 'BAN',
            'name' => 'SURAT KERJA'
        ]);

        $this->assertDatabaseHas('categories', ['id' => 'BAN', 'name' => 'BERITA ACARA NEGOSIASI'])
            ->assertDatabaseCount('categories', 2);
    }

    public function test_user_can_delete_category(): void
    {
        $base = new BaseData();

        $response = $this->actingAs($base->user)->delete("/master/categories/BAN");

        $response->assertRedirect(route('category.index'));

        $this->assertDatabaseCount('categories', 1);
    }

    public function test_user_can_add_mandatory_category(): void
    {
        $base = new BaseData();

        Category::create([
            'id' => 'BAN',
            'name' => 'BERITA ACARA NEGOSIASI'
        ]);
        Category::create([
            'id' => 'SU',
            'name' => 'SURAT UNDANGAN'
        ]);

        $response = $this->actingAs($base->user)->post("/master/mandatory-categories/", [
            'mandatory_type' => 'Public Training',
            'categories' => ['BAN', 'SKK']
        ]);

        $response->assertRedirect(route('mandatory-category.index'));

        $this->assertDatabaseCount('mandatory_file_category', 2);

        $response = $this->actingAs($base->user)->post("/master/mandatory-categories/", [
            'mandatory_type' => 'Public Training',
            'categories' => ['BAN']
        ]);

        $this->assertDatabaseCount('mandatory_file_category', 2);
    }

    public function test_user_can_delete_mandatory_category(): void
    {
        $base = new BaseData();

        $mandatory = MandatoryFileCategory::where(['mandatory_type' => 'Public Training', 'category_id' => 'BAN'])->first();
        
        $response = $this->actingAs($base->user)->delete("/master/mandatory-categories/{$mandatory->id}");

        $response->assertRedirect(route('mandatory-category.index'));

        $this->assertDatabaseCount('mandatory_file_category', 1);
    }
}
