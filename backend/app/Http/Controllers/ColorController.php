<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreColorRequest;
use App\Http\Requests\UpdateColorRequest;
use App\Http\Resources\ColorCollection;
use App\Http\Resources\ColorResource;
use App\Models\Color;

class ColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new ColorCollection(Color::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreColorRequest $request)
    {
        $validatedData = $request->validated();

        $color = Color::create($validatedData);

        return response()->json([
            'message' => 'The color ' . $color->name . ' created successfully',
            'data' => new ColorResource($color)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Color $color)
    {
        return new ColorResource($color);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateColorRequest $request, Color $color)
    {
        $validatedData = $request->validated();

        $colorToUpdate = Color::findOrFail($color->id);

        $colorToUpdate->update($validatedData);

        return response()->json([
            'message' => 'The color ' . $color->name . ' updated successfully',
            'data' => new ColorResource($colorToUpdate)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Color $color)
    {
        $color->delete();
        return response()->json(['message' => 'The color ' . $color->name . ' deleted successfully']);
    }
}
