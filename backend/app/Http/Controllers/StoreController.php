<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Http\Resources\StoreCollection;
use App\Http\Resources\StoreResource;
use App\Models\Store;
use App\Models\User;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new StoreCollection(Store::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStoreRequest $request)
    {
        // TODO: Needs testing
        $validatedData = $request->validated();

        $store = Store::create($validatedData);

        return response()->json([
            'message' => 'The store ' . $store->name . ' created successfully',
            'data' => new StoreResource($store)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Store $store)
    {
        return new StoreResource($store);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStoreRequest $request, Store $store)
    {
        // TODO: Needs testing
        $validatedData = $request->validated();

        $storeToUpdate = Store::findOrFail($store->id);

        $storeToUpdate->update($validatedData);

        return response()->json([
            'message' => 'The store ' . $store->name . ' updated successfully',
            'data' => new StoreResource($storeToUpdate)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Store $store)
    {
        $store->delete();
        return response()->json(['message' => 'Store ' . $store->name . ' deleted successfully']);
    }
}
