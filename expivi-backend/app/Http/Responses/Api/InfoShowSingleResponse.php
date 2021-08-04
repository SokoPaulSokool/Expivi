<?php

namespace App\Http\Responses\Api;

use App\Models\InfoModel;
use JetBrains\PhpStorm\ArrayShape;

class InfoShowSingleResponse extends \Illuminate\Http\JsonResponse
{
    /**
     * InfoShowAllResponse constructor.
     * @param InfoModel $data
     * @param int $status
     * @param array $headers
     * @param int $options
     */
    public function __construct(InfoModel $data, $status = 200, $headers = [], $options = 0)
    {
        parent::__construct(self::infoToResponseBody($data), $status, $headers, $options);
    }

    #[ArrayShape([
        'slug' => "string",
        'name' => "string",
        'category' => "string",
        'license' => "string",
        'avatar' => "string",
        'vertices' => "int",
        'downloads' => "int",
        'description' => "string"
    ])]
    public static function infoToResponseBody(InfoModel $data): array
    {
        return [
            'slug' => $data->slug,
            'name' => $data->name,
            'category' => $data->category,
            'license' => $data->license,
            'avatar' => $data->avatar,
            'vertices' => $data->vertices,
            'downloads' => $data->downloads,
            'description' => $data->description,
        ];
    }
}
