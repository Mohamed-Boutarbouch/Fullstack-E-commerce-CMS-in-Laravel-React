<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'phone' => ['required', 'string', 'max:20'],
            'address' => ['required', 'string', 'max:255'],
            'is_paid' => ['required', 'boolean'],
            'store_id' => ['required', 'uuid', 'exists:stores,id'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'is_paid' => $this->isPaid,
            'store_id' => $this->storeId,
        ]);
    }
}
