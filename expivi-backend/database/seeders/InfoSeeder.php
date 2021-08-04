<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = config('xpv.info-lines');

        /** @var User[] $users */
        $users = User::all();
        $userCount = count($users);
        for ($i = 0; $i < $userCount; $i++) {
            if ($users[$i]->infoEntries()->count() > 0) continue;

            $line = reset($items);
            do {
                $key = key($items);
                DB::table('info')->insert([
                    'user_id' => $users[$i]->id,
                    'slug' => $key,
                    'name' => $line[0],
                    'category' => $line[1],
                    'license' => $line[2],
                    'avatar' => $line[3],
                    'vertices' => $line[4],
                    'downloads' => $line[5],
                    'description' => $line[6],
                ]);
            } while ($line = next($items));
        }
    }
}
