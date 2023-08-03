import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// import ImageUploadButton from '@/components/ImageUploadButton';
import { Button } from '@/components/ui/button';
import { BillboardSchema } from '@/lib/validations/billboard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { createBillboardApi } from '@/services/billboardServices';
import { useParams } from 'react-router-dom';

type Inputs = z.infer<typeof BillboardSchema>;

interface BillboardResponseData {
  id: string;
  label: string;
  imgUrl: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export default function NewBillboard() {
  const { storeId } = useParams();
  const [image, setImage] = useState<File | null>(null);

  const { register, handleSubmit, setValue, reset } = useForm<Inputs>({
    resolver: zodResolver(BillboardSchema),
    defaultValues: {
      image: null,
      label: '',
    },
  });

  function previewImageHandler(event: ChangeEvent<HTMLInputElement>) {
    const selectedImage = event.target.files && event.target.files[0];

    if (selectedImage) {
      // const imageUrl = URL.createObjectURL(selectedImage);
      setImage(selectedImage);
    }
  }

  function deleteImage() {
    setImage(null);
    setValue('image', null);
  }

  const createBillboard = useMutation<BillboardResponseData, unknown, Inputs>({
    mutationFn: async (values) => {
      return await createBillboardApi({ ...values, storeId });
    },
    // onSuccess: () => queryClient.invalidateQueries({ queryKey: ['billboards'] }),
  });

  async function onSubmit(data: Inputs) {
    console.log(data);
    const formData = new FormData();
    formData.append('image', data.image);
    data = { ...data, image: data.image.name };

    console.log(data);

    await createBillboard.mutateAsync(data);
    reset();
    setImage(null);
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      {/* <ImageUploadButton {...register('image')} /> */}
      <div className="form-group preview">
        {image && (
          <div key={image.name}>
            <img src={URL.createObjectURL(image)} alt="" className="w-48 h-48 object-fill" />
            <button type="button" onClick={deleteImage}>
              delete
            </button>
          </div>
        )}
      </div>

      <Input
        type="file"
        id="image"
        accept="image/*"
        {...register('image')}
        onChange={previewImageHandler}
      />
      <Label htmlFor="label">Label</Label>
      <Input type="text" id="label" placeholder="This is a label" {...register('label')} />
      <Button
        type="submit"
        className="w-24"
        // disabled={login.isLoading}
      >
        {/* {login.isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )} */}
        Create
        <span className="sr-only">Create</span>
      </Button>
    </form>
  );
}

// import React, { useState } from "react";

// const Test2 = () => {
//   const [file, setFile] = useState([]);

//   function uploadSingleFile(e) {
//     let ImagesArray = Object.entries(e.target.files).map((e) =>
//       URL.createObjectURL(e[1])
//     );
//     console.log(ImagesArray);
//     setFile([...file, ...ImagesArray]);
//     console.log("file", file);
//   }

//   function upload(e) {
//     e.preventDefault();
//     console.log(file);
//   }

//   function deleteFile(e) {
//     const s = file.filter((item, index) => index !== e);
//     setFile(s);
//     console.log(s);
//   }

//   return (
//     <form>
//       <div className="form-group preview">
//         {file.length > 0 &&
//           file.map((item, index) => {
//             return (
//               <div key={item}>
//                 <img src={item} alt="" />
//                 <button type="button" onClick={() => deleteFile(index)}>
//                   delete
//                 </button>
//               </div>
//             );
//           })}
//       </div>

//       <div className="form-group">
//         <input
//           type="file"
//           disabled={file.length === 5}
//           className="form-control"
//           onChange={uploadSingleFile}
//           multiple
//         />
//       </div>
//       <button
//         type="button"
//         className="btn btn-primary btn-block"
//         onClick={upload}
//       >
//         Upload
//       </button>
//     </form>
//   );
// };

// export default Test2;
