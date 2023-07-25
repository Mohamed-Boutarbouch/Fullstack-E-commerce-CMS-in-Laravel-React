<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'is_featured' => ['required', 'boolean'],
            'is_archived' => ['required', 'boolean'],
            'store_id' => ['required', 'uuid', 'exists:stores,id'],
            'category_id' => ['required', 'uuid', 'exists:categories,id'],
            'size_id' => ['required', 'uuid', 'exists:sizes,id'],
            'color_id' => ['required', 'uuid', 'exists:colors,id'],
            'images' => ['required', 'array'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'is_archived' => $this->isArchived,
            'is_featured' => $this->isFeatured,
            'category_id' => $this->categoryId,
            'size_id' => $this->sizeId,
            'color_id' => $this->colorId,
            'store_id' => $this->storeId,
        ]);
    }
}
