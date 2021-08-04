<?php

namespace App\Http\Responses\Api;

use App\Models\InfoModel;

class InfoShowAllResponse extends \Illuminate\Http\JsonResponse
{
    /**
     * InfoShowAllResponse constructor.
     * @param InfoModel[] $data
     * @param int $status
     * @param array $headers
     * @param int $options
     */
    public function __construct($data, $status = 200, $headers = [], $options = 0)
    {
        $responseInfo = [];

        $dataCount = count($data);
        for($i = 0; $i < $dataCount; $i++) {
            $responseInfo[] = InfoShowSingleResponse::infoToResponseBody($data[$i]);
        }

        parent::__construct($responseInfo, $status, $headers, $options);
    }
}
