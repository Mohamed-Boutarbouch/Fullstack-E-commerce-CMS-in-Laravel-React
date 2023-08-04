<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Http\Resources\StoreCollection;
use App\Http\Resources\StoreResource;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->query('userId');
        $user = User::findOrFail($userId);
        return new StoreCollection($user->stores);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStoreRequest $request)
    {
        // TODO: Needs testing
        $validatedData = $request->validated();

        $store = Store::create($validatedData);

        return new StoreResource($store);
    }

    /**
     * Display the specified resource.
     */
    public function show(Store $store)
    {
        return $store->load('products', 'sizes', 'colors', 'billboards', 'orders');
        // return new StoreResource($store);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStoreRequest $request, Store $store)
    {
        $validatedData = $request->validated();

        $storeToUpdate = Store::findOrFail($store->id);

        $storeToUpdate->update($validatedData);

        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Store $store)
    {
        $store->delete();
        return response()->noContent();
    }
}
