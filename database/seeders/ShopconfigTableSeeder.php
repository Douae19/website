<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShopconfigTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('shopconfig')->insert([
            'shopconfig_name' => 'Douae',
            'shopconfig_address' => '',
            'shopconfig_phone' => '',
            'shopconfig_email' => '',
            'shopconfig_shippingcost' => 0,
            'currency_id' => 1
        ]);
    }
}
