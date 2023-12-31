<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new CategoryCollection(Category::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        // TODO: Needs testing
        $validatedData = $request->validated();

        $category = Category::create($validatedData);

        return response()->json([
            'message' => 'The category ' . $category->name . ' created successfully',
            'data' => new CategoryResource($category)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        // TODO: Needs testing
        $validatedData = $request->validated();

        $categoryToUpdate = Category::findOrFail($category->id);

        $categoryToUpdate->update($validatedData);

        return response()->json([
            'message' => 'The category ' . $category->name . ' updated successfully',
            'data' => new CategoryResource($categoryToUpdate)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(['message' => 'The category ' . $category->name . '  deleted successfully']);
    }
}
