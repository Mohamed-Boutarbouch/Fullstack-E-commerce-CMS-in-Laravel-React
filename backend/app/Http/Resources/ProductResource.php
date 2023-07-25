<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => (float) $this->price,
            'isFeatured' => (bool) $this->is_featured,
            'isArchived' => (bool) $this->is_archived,
            'storeId' => $this->store_id,
            'categoryId' => $this->category_id,
            'sizeId' => $this->size_id,
            'colorId' => $this->color_id,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'images' => ImageResource::collection($this->whenLoaded('images'))
        ];
    }
}
