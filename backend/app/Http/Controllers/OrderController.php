<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderCollection;
use App\Http\Resources\OrderResource;
use App\Models\Order;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new OrderCollection(Order::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        // TODO: Needs testing
        $validatedData = $request->validated();

        $order = Order::create($validatedData);

        return response()->json([
            'message' => 'The order created successfully',
            'data' => new OrderResource($order)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        // TODO: Needs testing
        $validatedData = $request->validated();

        $orderToUpdate = Order::findOrFail($order->id);

        $orderToUpdate->update($validatedData);

        return response()->json([
            'message' => 'The order updated successfully',
            'data' => new OrderResource($orderToUpdate)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }
}
