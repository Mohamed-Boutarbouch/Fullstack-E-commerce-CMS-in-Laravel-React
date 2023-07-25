<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSizeRequest;
use App\Http\Requests\UpdateSizeRequest;
use App\Http\Resources\SizeCollection;
use App\Http\Resources\SizeResource;
use App\Models\Size;

class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new SizeCollection(Size::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSizeRequest $request)
    {
        // TODO: Needs testing
        $validatedData = $request->validated();

        $size = Size::create($validatedData);

        return response()->json([
            'message' => 'The size ' . $size->name . ' created successfully',
            'data' => new SizeResource($size)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Size $size)
    {
        return new SizeResource($size);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSizeRequest $request, Size $size)
    {
        // TODO: Needs testing
        $validatedData = $request->validated();

        $sizeToUpdate = Size::findOrFail($size->id);

        $sizeToUpdate->update($validatedData);

        return response()->json([
            'message' => 'The size ' . $size->name . ' updated successfully',
            'data' => new SizeResource($sizeToUpdate)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Size $size)
    {
        $size->delete();
        return response()->json(['message' => 'Size ' . $size->name . ' deleted successfully']);
    }
}
