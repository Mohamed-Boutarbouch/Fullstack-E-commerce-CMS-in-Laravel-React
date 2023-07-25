<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBillboardRequest;
use App\Http\Requests\UpdateBillboardRequest;
use App\Http\Resources\BillboardCollection;
use App\Http\Resources\BillboardResource;
use App\Models\Billboard;

class BillboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new BillboardCollection(Billboard::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBillboardRequest $request)
    {
        $validatedData = $request->validated();

        $billboard = null;

        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $path = $imageFile->store('/images/resource', ['disk' => 'my_files']);

            $billboard = Billboard::create([
                'label' => $validatedData['label'],
                'store_id' => $validatedData['store_id'],
                'img_url' => url()->to('/') . '/' . $path,
            ]);
        }

        return response()->json(['data' => new BillboardResource($billboard)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Billboard $billboard)
    {
        return new BillboardResource($billboard);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBillboardRequest $request, Billboard $billboard)
    {
        $validatedData = $request->validated();

        $billboard->update([
            'label' => $validatedData['label'],
            'store_id' => $validatedData['store_id'],
        ]);

        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $path = $imageFile->store('/images/resource', ['disk' => 'my_files']);

            $billboard->update(['img_url' => url()->to('/') . '/' . $path]);
        }

        return response()->json(['data' => new BillboardResource($billboard)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Billboard $billboard)
    {
        $billboard->delete();
        return response()->json(['message' => 'Billboard deleted successfully']);
    }
}
