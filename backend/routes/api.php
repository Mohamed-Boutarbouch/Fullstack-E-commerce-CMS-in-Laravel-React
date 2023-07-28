<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\BillboardController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\StoreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
  return $request->user()->load('stores');
});

Route::apiResource('users', UserController::class);
Route::apiResource('stores', StoreController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('billboards', BillboardController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('images', ImageController::class);
Route::apiResource('sizes', SizeController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('colors', ColorController::class);
