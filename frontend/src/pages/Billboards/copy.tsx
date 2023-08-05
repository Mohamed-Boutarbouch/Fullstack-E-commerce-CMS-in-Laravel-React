import fileClient from '@/services/fileClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

const createBillboardSchema = z.object({
  label: z.string().min(1, { message: 'Label is required' }),
  image: z.custom<File>((v) => v instanceof File, { message: 'Image is required' }),
});

const updateBillboardSchema = createBillboardSchema.extend({
  image: createBillboardSchema.shape.image.optional(),
});

export type BillboardForm2Values =
  | z.infer<typeof createBillboardSchema>
  | z.infer<typeof updateBillboardSchema>;

interface BillboardForm2Props {
  billboard?: {
    id: string;
    storeId: string;
    label: string;
    imgUrl: string;
  };
}

export default function NewBillboard({ billboard }: BillboardForm2Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    billboard ? billboard.imgUrl : null,
  );
  const { storeId } = useParams();
  const isAddMode = !billboard;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<BillboardForm2Values>({
    resolver: zodResolver(isAddMode ? createBillboardSchema : updateBillboardSchema),
    defaultValues: { label: billboard?.label ?? '', image: undefined },
  });

  // revoke object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const onSubmitHandler = async (data: BillboardForm2Values) => {
    console.log(data);

    let imageUrl: string | undefined;

    if (data.image) {
      // build FormData for uploading image
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('label', data.label);
      // mock upload image to server to get image url
      imageUrl = await new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('https://via.placeholder.com/150');
        }, 1000);
      });
    }

    if (isAddMode) {
      // create billboard
      try {
        const response: AxiosResponse<BillboardForm2Props> = await fileClient.post('/billboards', {
          ...data,
          storeId,
        });
        return response;
      } catch (error) {
        throw error;
      }
    } else {
      // update billboard
      console.log({ id: billboard!.id, ...data, image: imageUrl });
    }
    reset();

    setImagePreview(billboard?.imgUrl ?? null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <label htmlFor="label">Label</label>
      <br />
      <input type="text" id="label" {...register('label')} />
      <br />
      <br />
      {errors.label && <span>{errors.label.message}</span>}
      <Controller
        name="image"
        control={control}
        render={({ field: { ref, name, onBlur, onChange } }) => (
          <input
            type="file"
            accept="image/*"
            ref={ref}
            name={name}
            onBlur={onBlur}
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(e.target.files?.[0]);
              setImagePreview(file ? URL.createObjectURL(file) : null);
            }}
          />
        )}
      />
      {imagePreview && <img src={imagePreview} alt="preview" width="100" height="100" />}
      {errors.image && <span>{errors.image.message}</span>}
      <br />
      <button type="submit" disabled={(!isAddMode && !isDirty) || isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
