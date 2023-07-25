<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new ProductCollection(Product::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        // TODO: Needs testing
        $validatedData = $request->validated();

        $product = Product::create([
            'name' => $validatedData['name'],
            'price' => $validatedData['price'],
            'is_featured' => $validatedData['is_featured'],
            'is_archived' => $validatedData['is_archived'],
            'store_id' => $validatedData['store_id'],
            'category_id' => $validatedData['category_id'],
            'size_id' => $validatedData['size_id'],
            'color_id' => $validatedData['color_id'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('/images/resource', ['disk' => 'my_files']);

                $product->images()->create([
                    'url' => url()->to('/') . '/' . $path,
                ]);
            }
        }

        return response()->json([
            'message' => 'The product ' . $product->name . ' created successfully',
            'data' => new ProductResource($product->loadMissing('images'))
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        // TODO: Needs testing
        $validatedData = $request->validated();

        $productToUpdate = Product::findOrFail($product->id);

        $productToUpdate->update($validatedData);

        return response()->json([
            'message' => 'The product ' . $product->name . ' updated successfully',
            'data' => new ProductResource($productToUpdate)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'The product ' . $product->delete . ' deleted successfully']);
    }
}
