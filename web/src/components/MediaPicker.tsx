// Como apenas essa parte do código precisa de interatividade, separamos ele do seu da página principal
"use client";

import { ChangeEvent, useState } from "react";

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previewURL = URL.createObjectURL(files[0]);

    setPreview(previewURL);
  }
  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        id="media"
        name="coverUrl"
        accept="image/*"
        className="invisible h-0 w-0"
      />

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="aspect-video w-full object-cover"
        />
      )}
    </>
  );
}
