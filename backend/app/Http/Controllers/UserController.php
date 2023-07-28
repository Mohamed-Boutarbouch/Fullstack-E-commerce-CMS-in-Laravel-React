<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    // return UserResource::collection(Store::all());
    // return new StoreCollection(Store::all());
    // }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(StoreStoreRequest $request)
    // {
    //     // TODO: Needs testing
    //     $validatedData = $request->validated();

    //     $store = Store::create($validatedData);

    //     return new StoreResource($store);
    // }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user->load('stores'));
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(UpdateStoreRequest $request, Store $store)
    // {
    //     // TODO: Needs testing
    //     $validatedData = $request->validated();

    //     $storeToUpdate = Store::findOrFail($store->id);

    //     $storeToUpdate->update($validatedData);

    //     return response()->json([
    //         'message' => 'The store ' . $store->name . ' updated successfully',
    //         'data' => new StoreResource($storeToUpdate)
    //     ]);
    // }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Store $store)
    // {
    //     $store->delete();
    //     return response()->json(['message' => 'Store ' . $store->name . ' deleted successfully']);
    // }
}
