<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
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
            'billboard_id' => ['sometimes', 'uuid', 'exists:billboards,id'],
            'store_id' => ['required', 'uuid', 'exists:stores,id'],
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->billboardId) {
            $this->merge([
                'store_id' => $this->storeId,
                'billboard_id' => $this->billboardId,
            ]);
        } else {
            $this->merge([
                'store_id' => $this->storeId,
            ]);
        }
    }
}
