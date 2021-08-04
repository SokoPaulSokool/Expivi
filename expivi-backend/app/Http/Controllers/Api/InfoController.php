<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Responses\Api\InfoShowAllResponse;
use App\Http\Responses\Api\InfoShowSingleResponse;
use App\Models\InfoModel;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class InfoController extends Controller
{
    public function showAll(): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        return new InfoShowAllResponse($user->infoEntries);
    }

    public function createOne(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'slug' => ['required', 'max:255'],
                'name' => ['required'],
                'avatar' => ['required', 'image', 'mimes:png,gif,svg', 'max:8192'],
                'category' => ['required', 'max:16'],
                'license' => ['required', 'max:16'],
                'vertices' => ['required', 'integer', 'min:3'],
                'downloads' => ['integer'],
                'description' => ['required'],
            ]);

            $filename = time() . '.' . $request->avatar->extension();
            $request->avatar->move(public_path('images'), $filename);

            /** @var User $user */
            $user = Auth::user();
            /** @var InfoModel $info */
            $info = $user->infoEntries()->create([
                'name' => $request->get('name'),
                'slug' => $request->get('slug'),
                'avatar' => './images/' . $filename,
                'category' => $request->get('category'),
                'license' => $request->get('license'),
                'vertices' => $request->get('vertices'),
                'downloads' => $request->get('downloads') ?? 0,
                'description' => $request->get('description'),
            ]);
            if (!$user->save()) throw new BadRequestHttpException('ERROR.SLUG_ALREADY_TAKEN_BY_THIS_USER');

            dump('whaat');

            return new InfoShowSingleResponse($info, Response::HTTP_CREATED);
        } catch(ValidationException $e) {
            return response()->json($e->errors());
        }
    }

    public function updateOne(Request $request, string $itemSlug): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();

        /** @var InfoModel $info */
        $info = InfoModel::where([ 'slug' => $itemSlug, 'user_id' => $user->id ])->first();
        if (!$info) throw new NotFoundHttpException();

        $propertiesToUpdate = [];
        $body = $request->json();
        if ($body->has('description')) $propertiesToUpdate['description'] = $body->get('description');
        if ($body->has('name')) $propertiesToUpdate['name'] = $body->get('name');
        if ($body->has('category')) $propertiesToUpdate['category'] = $body->get('category');
        if ($body->has('downloads')) $propertiesToUpdate['downloads'] = $body->get('downloads');
        if ($body->has('license')) $propertiesToUpdate['license'] = $body->get('license');

        foreach ($propertiesToUpdate as $key => $value) {
            $info->$key = $value;
        }
        $info->save();

        return new InfoShowSingleResponse($info, Response::HTTP_ACCEPTED);
    }

    public function deleteOne(string $itemSlug): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();

        /** @var InfoModel $info */
        $info = InfoModel::where([ 'slug' => $itemSlug, 'user_id' => $user->id ])->first();
        if (!$info) throw new NotFoundHttpException();

        $info->delete();
        return response()->json('success');
    }
}
